# -*- coding: utf-8 -*-
"""住建政策每日简报 · 汇总索引页生成器（时间分层版 · **云端/仓库内运行版**）

分层规则（相对"今天"滚动计算）：
  1) 近一周（含今日共 7 天）  → 每日一条，逐日列出，默认展开
  2) 本月内其余日期           → 按自然周（周一~周日）合并，一周一个分组
  3) 更早月份                 → 按月合并，一月一个分组

用法：
  python build_brief_list.py                        # 由 issues_index.json 重新生成列表页
  python build_brief_list.py --today 2026-09-22     # 指定"今天"（回归测试用）
  python build_brief_list.py --extract              # 从现有列表页反抽元数据（迁移/修复用）
  python build_brief_list.py --add '{...json...}'   # 追加/更新一期元数据后再生成

数据文件：output/history/issues_index.json （每期：date/weekday/issue/count/first/multi/cont/file/abs/tags/search）
样式文件：output/history/list_style.css
"""
import argparse
import datetime as dt
import io
import json
import os
import re
import sys

# --- 云端版路径（本文件位于仓库的 history/ 目录下，仓库根即站点根）---
BASE = os.path.dirname(os.path.abspath(__file__))   # <repo>/history
OUT = os.path.dirname(BASE)                          # <repo>  （GitHub Pages 站点根）
HIST = BASE
IDX = os.path.join(HIST, "issues_index.json")
CSS_PATH = os.path.join(HIST, "list_style.css")
LIST_HTML = os.path.join(OUT, "住建简报列表.html")

WEEK_CN = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
RECENT_DAYS = 7


def read_text(p):
    return io.open(p, encoding="utf-8").read()


def write_text(p, s):
    io.open(p, "w", encoding="utf-8", newline="\n").write(s)


def esc_attr(s):
    return (s or "").replace("&", "&amp;").replace('"', "&quot;").replace("<", "&lt;").replace(">", "&gt;")


def esc_text(s):
    return (s or "").replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def strip_tags(s):
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", s or "")).strip()


# --------------------------------------------------------------------------- #
# 抽取（迁移/修复用）
# --------------------------------------------------------------------------- #
def extract_from_html(path=LIST_HTML):
    s = read_text(path)
    blocks = re.findall(r'<details class="day-group"[^>]*>(.*?)</details>', s, re.S)
    issues = []
    for b in blocks:
        pos = [m.start() for m in re.finditer(r'<div class="entry"', b)]
        for k, p in enumerate(pos):
            end = pos[k + 1] if k + 1 < len(pos) else len(b)
            c = b[p:end]
            m_search = re.search(r'data-search="(.*?)">', c, re.S)
            m_href = re.search(r'<a href="([^"]+)"', c)
            m_meta = re.search(r'<div class="meta">(.*?)</div>', c, re.S)
            m_abs = re.search(r'<div class="abs">(.*?)</div>', c, re.S)
            tags = re.findall(r'<span class="tag [fml]">(.*?)</span>', c)
            plain = strip_tags(m_meta.group(1)) if m_meta else ""
            d = re.search(r"(\d{4}-\d{2}-\d{2})", plain)
            it = re.search(r"第\s*(\d+)\s*期", plain)
            ct = re.search(r"收录\s*(\d+)\s*条", plain)
            fml = re.search(r"首次\s*(\d+)\s*/\s*多次\s*(\d+)\s*/\s*延续\s*(\d+)", plain)
            date_s = d.group(1) if d else ""
            wd = ""
            if date_s:
                wd = WEEK_CN[dt.date.fromisoformat(date_s).weekday()]
            issues.append({
                "date": date_s,
                "weekday": wd,
                "issue": int(it.group(1)) if it else 0,
                "count": int(ct.group(1)) if ct else 0,
                "first": int(fml.group(1)) if fml else 0,
                "multi": int(fml.group(2)) if fml else 0,
                "cont": int(fml.group(3)) if fml else 0,
                "file": m_href.group(1) if m_href else "",
                "abs": (m_abs.group(1).strip() if m_abs else ""),
                "tags": tags,
                "search": (m_search.group(1) if m_search else ""),
            })
    issues.sort(key=lambda x: x["date"])
    return issues


# --------------------------------------------------------------------------- #
# 数据读写
# --------------------------------------------------------------------------- #
def load_issues():
    data = json.loads(read_text(IDX))
    return data.get("issues", data if isinstance(data, list) else [])


def save_issues(issues, today):
    issues = sorted(issues, key=lambda x: x["date"])
    write_text(IDX, json.dumps({"updated": today.isoformat(), "issues": issues},
                               ensure_ascii=False, indent=1))
    return issues


def upsert_issue(rec, today=None):
    today = today or dt.date.today()
    issues = load_issues()
    hit = False
    for i, it in enumerate(issues):
        if it["date"] == rec["date"]:
            issues[i] = dict(it, **rec)
            hit = True
            break
    if not hit:
        issues.append(rec)
    return save_issues(issues, today)


def normalize(rec):
    d = dt.date.fromisoformat(rec["date"])
    rec.setdefault("weekday", WEEK_CN[d.weekday()])
    for k in ("issue", "count", "first", "multi", "cont"):
        rec[k] = int(rec.get(k) or 0)
    rec.setdefault("abs", "")
    rec.setdefault("tags", [])
    if not rec.get("search"):
        rec["search"] = " ".join([
            rec["date"], rec["weekday"], "住建动态简报", "第%d期" % rec["issue"],
            "首次出现 %d" % rec["first"], "多次出现 %d" % rec["multi"], "延续跟进 %d" % rec["cont"],
            strip_tags(rec["abs"]),
        ])
    return rec


# --------------------------------------------------------------------------- #
# 分层
# --------------------------------------------------------------------------- #
def monday_of(d):
    return d - dt.timedelta(days=d.weekday())


def build_groups(issues, today):
    issues = [normalize(dict(x)) for x in issues]
    issues.sort(key=lambda x: x["date"], reverse=True)
    recent_start = today - dt.timedelta(days=RECENT_DAYS - 1)

    groups = []
    recent = [x for x in issues if dt.date.fromisoformat(x["date"]) >= recent_start]
    if recent:
        groups.append({
            "tier": "近一周", "tcls": "", "body_cls": "tierRecent",
            "label": "%s ~ %s" % (recent_start.strftime("%m-%d"), today.strftime("%m-%d")),
            "note": "含今日，逐日列出", "open": True, "entries": recent,
        })

    rest = [x for x in issues if dt.date.fromisoformat(x["date"]) < recent_start]
    by_month = {}
    for x in rest:
        d = dt.date.fromisoformat(x["date"])
        by_month.setdefault((d.year, d.month), []).append(x)

    for (y, m) in sorted(by_month.keys(), reverse=True):
        items = by_month[(y, m)]
        if (y, m) == (today.year, today.month):
            buckets = {}
            for x in items:
                buckets.setdefault(monday_of(dt.date.fromisoformat(x["date"])), []).append(x)
            first_monday = monday_of(dt.date(y, m, 1))
            for mon in sorted(buckets.keys(), reverse=True):
                ents = buckets[mon]
                wkno = (mon - first_monday).days // 7 + 1
                ds = sorted(dt.date.fromisoformat(x["date"]) for x in ents)
                rng = "%s ~ %s" % (ds[0].strftime("%m-%d"), ds[-1].strftime("%m-%d"))
                overlaps = (mon + dt.timedelta(days=6)) >= recent_start
                note = "其余日期见「近一周」" if overlaps else ""
                groups.append({
                    "tier": "周", "tcls": "wk", "body_cls": "",
                    "label": "%d月第%d周 · %s" % (m, wkno, rng),
                    "note": note, "open": False, "entries": ents,
                })
        else:
            groups.append({
                "tier": "月", "tcls": "mo", "body_cls": "",
                "label": "%d年%d月" % (y, m),
                "note": "", "open": False, "entries": items,
            })
    return groups


# --------------------------------------------------------------------------- #
# 渲染
# --------------------------------------------------------------------------- #
def render_entry(x):
    tags = "".join([
        '\n          <span class="tag f">首次出现 %d 条</span>' % x["first"],
        '\n          <span class="tag m">多次出现 %d 条</span>' % x["multi"],
        '\n          <span class="tag l">延续跟进 %d 条</span>' % x["cont"],
    ])
    return (
        '      <div class="entry" data-search="%s">\n'
        '        <div class="t"><a href="%s" target="_blank">%s</a></div>\n'
        '        <div class="meta">%s（%s）· <b>第 %d 期</b> · 收录 <b>%d</b> 条'
        '（首次 %d / 多次 %d / 延续 %d）</div>\n'
        '        <div class="abs">%s</div>\n'
        '        <div class="tags">%s\n        </div>\n'
        '      </div>\n'
    ) % (
        esc_attr(x["search"]), esc_attr(x["file"]), esc_text(x["file"]),
        x["date"], x["weekday"], x["issue"], x["count"], x["first"], x["multi"], x["cont"],
        x["abs"], tags,
    )


def render_group(g):
    ents = g["entries"]
    tot = sum(x["count"] for x in ents)
    f = sum(x["first"] for x in ents)
    mm = sum(x["multi"] for x in ents)
    cc = sum(x["cont"] for x in ents)
    label_txt = "%s %s %s" % (g["tier"], g["label"], g["note"])
    gsearch = esc_attr(label_txt + " " + " ".join(x["date"] for x in ents))
    note = ('<span class="note">%s</span>' % esc_text(g["note"])) if g["note"] else ""
    body = "".join(render_entry(x) for x in ents)
    dcls = "day-group" + ((" " + g["body_cls"]) if g["body_cls"] else "")
    tcls = "tier" + ((" " + g["tcls"]) if g["tcls"] else "")
    return (
        '<details class="%s"%s data-gsearch="%s">\n'
        '  <summary>\n'
        '    <span class="arrow">▶</span>\n'
        '    <span class="%s">%s</span>\n'
        '    <span class="d">%s</span>\n'
        '    <span class="m">%d 期</span>%s\n'
        '    <span class="cnt">共收录 %d 条 · 首次 %d · 多次 %d · 延续 %d</span>\n'
        '  </summary>\n'
        '  <div class="group-body">\n'
        '%s'
        '  </div>\n'
        '</details>\n'
    ) % (dcls, " open" if g["open"] else "", gsearch,
         tcls, esc_text(g["tier"]), esc_text(g["label"]), len(ents),
         ("\n    " + note) if note else "",
         tot, f, mm, cc, body)


def build_html(issues, today):
    groups = build_groups(issues, today)
    total = sum(len(g["entries"]) for g in groups)
    dates = sorted(x["date"] for x in issues)
    span = ("%s ~ %s" % (dates[0], dates[-1])) if dates else "-"
    tot_items = sum(int(x.get("count") or 0) for x in issues)

    body = "\n".join(render_group(g) for g in groups)
    css = read_text(CSS_PATH).replace("</style>", "")

    tpl = """<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>住建政策每日简报 · 汇总索引</title>
<style>__CSS__</style>
</head>
<body>

<div class="header">
  <div class="container">
    <span class="badge">住建政策动态追踪 · 简报汇总</span>
    <h1>住建政策每日简报 · 汇总索引</h1>
    <div class="date">共收录 <span id="totalIssue">__TOTAL__</span> 期简报 · 累计 __ITEMS__ 条政策动态 · 覆盖 __SPAN__ · 更新于 __TODAY__</div>
    <div class="sub">时间分层：<b>近一周按日列出</b> · <b>本月按周归并</b> · <b>更早按月归并</b> · 点击条目打开对应简报 · 支持关键字搜索</div>
  </div>
</div>

<div class="container">

  <div class="toolbar">
    <div class="search-box">
      <span class="icon">🔍</span>
      <input id="q" type="text" placeholder="搜索：日期 / 政策主题 / 领域 / 标签 / 周次月份…" autocomplete="off">
    </div>
    <button class="btn" onclick="setAll(true)">全部展开</button>
    <button class="btn" onclick="setAll(false)">全部折叠</button>
  </div>
  <div class="hint" id="hint">共 <span id="visibleCount">__TOTAL__</span> 期 · 近一周按日 / 本月按周 / 历史按月 · 输入关键字实时过滤，搜索时自动展开命中分组</div>

  <!-- 时间分层分组（新期在上；近一周默认展开） -->

__BODY__
  <div class="no-result" id="noResult">未找到匹配的简报，请尝试其他关键字。</div>

  <div class="footer">
    住建政策每日简报 · 汇总索引 · 本页自动维护，每次生成当日简报后同步更新<br>
    数据来源：住房和城乡建设部及各省市住建部门官网公开发布（gov.cn）
  </div>

</div>

<script>
  var groups = Array.prototype.slice.call(document.querySelectorAll('details.day-group'));

  function setAll(open){
    groups.forEach(function(g){ g.open = open; });
  }

  function doSearch(){
    var kw = document.getElementById('q').value.trim().toLowerCase();
    var visible = 0, any = false;
    groups.forEach(function(g){
      var glabel = (g.getAttribute('data-gsearch') || '').toLowerCase();
      var groupHit = kw !== '' && glabel.indexOf(kw) !== -1;
      var entries = g.querySelectorAll('.entry');
      var shown = 0;
      entries.forEach(function(e){
        var hit = kw === '' || groupHit ||
                  (e.getAttribute('data-search') || '').toLowerCase().indexOf(kw) !== -1;
        e.style.display = hit ? '' : 'none';
        if(hit){ shown++; }
      });
      g.style.display = shown ? '' : 'none';
      if(kw !== '' && shown){ g.open = true; }   // 搜索时自动展开命中分组
      visible += shown;
      if(shown){ any = true; }
    });
    document.getElementById('visibleCount').textContent = visible;
    document.getElementById('noResult').style.display = any ? 'none' : 'block';
  }

  document.getElementById('q').addEventListener('input', doSearch);
</script>
</body>
</html>
"""
    html = (tpl.replace("__CSS__", css)
               .replace("__TOTAL__", str(total))
               .replace("__ITEMS__", str(tot_items))
               .replace("__SPAN__", span)
               .replace("__TODAY__", today.isoformat())
               .replace("__BODY__", body))
    return html, groups


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--today", default="")
    ap.add_argument("--extract", action="store_true")
    ap.add_argument("--add", default="")
    ap.add_argument("--dry", action="store_true")
    a = ap.parse_args()
    today = dt.date.fromisoformat(a.today) if a.today else dt.date.today()

    if a.extract:
        issues = extract_from_html()
        save_issues(issues, today)
        print("extracted %d issues -> %s" % (len(issues), IDX))

    if a.add:
        rec = json.loads(a.add)
        normalize(rec)
        issues = upsert_issue(rec, today)
        print("upserted %s (total %d)" % (rec["date"], len(issues)))

    issues = load_issues()
    html, groups = build_html(issues, today)
    if not a.dry:
        write_text(LIST_HTML, html)
    print("groups=%d" % len(groups))
    for g in groups:
        print("  [%-4s] %-28s %d 期  %s" % (g["tier"], g["label"], len(g["entries"]),
                                            "OPEN" if g["open"] else ""))
    print("total issues=%d | html=%d chars | today=%s" % (
        sum(len(g["entries"]) for g in groups), len(html), today))


if __name__ == "__main__":
    main()
