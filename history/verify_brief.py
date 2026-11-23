#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
发布前门禁：简报自检（防重复收录 / 统计错位 / 结构破损 / 追踪库重复建档）

用法：
    python3 history/verify_brief.py --file 住建动态简报_2026-11-23.html
    python3 history/verify_brief.py --file xxx.html --strict

退出码：
    0 = 全部通过，可提交发布
    1 = 存在阻断级问题（重复收录、统计不符、结构破损、重复建档），禁止发布
    2 = 文件或参数错误

设计原则：
    1) 与生成脚本解耦——只解析最终 HTML，任何期次、任何写法都能校验；
    2) 判重「文号（细键→粗键+标题相似度）／标题指纹」双通道，比对全部历史期次；
    3) 阻断项一律硬失败，不留「建议忽略」的模糊地带。

背景：第 87 期（2026-11-23）曾把已在第 85 期收录的北京 京建发〔2026〕555号
再次作为【首次出现】收录，原因是判重靠人工记忆与整体推断。本脚本把该判重
固化为发布前必经门禁。
"""

import argparse
import glob
import json
import os
import re
import sys
from collections import Counter
from datetime import date
from difflib import SequenceMatcher

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# ---------- 正则与提取 ----------

RE_ITITLE = re.compile(r'<div class="ititle">(.*?)</div>', re.S)
RE_ANCHOR = re.compile(r'<a[^>]*href="([^"]*)"[^>]*>(.*?)</a>', re.S)
RE_NUM = re.compile(r'<span class="num">\s*(\d+)[.、]')
RE_NUM_ALT = re.compile(r'(?:class="(?:num|idx|no)"[^>]*>|>)\s*(\d{1,2})[.、]\s')
RE_TAG = re.compile(r'class="tag (tag-(?:first|multi|cont))"')
# 文号：机关代字 + 〔年份〕 + 序号 + 号（兼容全半角括号）
RE_DOCNO = re.compile(r'([\u4e00-\u9fa5]{2,9})\s*[〔\[（(]\s*(\d{4})\s*[〕\]）)]\s*(\d+)\s*号')
RE_DATE_IN_NAME = re.compile(r'(\d{4})-(\d{2})-(\d{2})')


def strip_tags(s):
    s = re.sub(r'<[^>]+>', '', s)
    s = (s.replace('&nbsp;', ' ').replace('&amp;', '&')
          .replace('&lt;', '<').replace('&gt;', '>').replace('&quot;', '"'))
    return re.sub(r'\s+', ' ', s).strip()


def norm_title(t):
    """标题指纹：去空白、标点后的稳定串。"""
    t = strip_tags(t)
    t = re.sub(r'[\s\u3000]', '', t)
    t = re.sub(r'[《》「」『』【】（）()〔〕\[\]、，,。．.:：;；\-—－_"\'“”‘’]', '', t)
    return t


def docno_keys(title):
    """两级文号键。
    细键 = 代字后4字-年-序号（不同机关同序号不碰撞）；粗键 = 年-序号（防代字写法差异漏判）。
    """
    m = RE_DOCNO.search(strip_tags(title))
    if not m:
        return (None, None)
    org, year, seq = m.group(1), m.group(2), int(m.group(3))
    fine = f'{org[-4:]}-{year}-{seq}'
    return (f'{year}-{seq}', fine)


def docno_key(title):
    return docno_keys(title)[1]


def sim(a, b):
    return SequenceMatcher(None, a or '', b or '').ratio()


def parse_items(html):
    """返回 [{num,title,url,tag,docno,docno_coarse,ntitle}]"""
    out = []
    _seq = 0
    blocks = re.split(r'<div class="item">', html)[1:]
    for b in blocks:
        mi = RE_ITITLE.search(b)
        if not mi:
            continue
        inner = mi.group(1)
        ma = RE_ANCHOR.search(inner)
        title = strip_tags(ma.group(2)) if ma else strip_tags(inner)
        url = ma.group(1) if ma else ''
        _seq += 1
        mn = RE_NUM.search(inner) or RE_NUM_ALT.search(inner)
        mt = RE_TAG.search(b)
        coarse, fine = docno_keys(title)
        out.append({
            'num': int(mn.group(1)) if mn else _seq,
            'title': title,
            'url': url,
            'tag': {'tag-first': 'first', 'tag-multi': 'multi', 'tag-cont': 'cont'}.get(mt.group(1)) if mt else '?',
            'docno': fine,
            'docno_coarse': coarse,
            'ntitle': norm_title(title),
        })
    return out


def file_date(path):
    m = RE_DATE_IN_NAME.search(os.path.basename(path))
    return f'{m.group(1)}-{m.group(2)}-{m.group(3)}' if m else '9999-99-99'


def header_stats(html):
    txt = strip_tags(html)
    got = {}
    for key, pat in [
        ('count', r'今日收录\s*(\d+)\s*条'),
        ('first', r'首次出现\s*(\d+)\s*条'),
        ('multi', r'多次出现\s*(\d+)\s*条'),
        ('cont', r'延续跟进\s*(\d+)\s*条'),
    ]:
        m = re.search(pat, txt)
        got[key] = int(m.group(1)) if m else None
    # 「（另 N 条…备查）」：收录数不含备查条目，用于校正 count 比对
    m = re.search(r'另\s*(\d+)\s*条[^）)]{0,12}备查', txt)
    got['annex'] = int(m.group(1)) if m else 0
    return got


# ---------- 主流程 ----------

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--file', required=True, help='待校验的简报 HTML 路径')
    ap.add_argument('--strict', action='store_true', help='把警告也视为失败')
    ap.add_argument('--quiet', action='store_true')
    ap.add_argument('--allow-parse-fail', action='store_true',
                    help='旧格式期次解析不到条目时跳过（仅作历史回归用，当期发布禁止使用）')
    args = ap.parse_args()

    path = args.file if os.path.isabs(args.file) else os.path.join(ROOT, args.file)
    if not os.path.exists(path):
        print(f'[FATAL] 文件不存在：{path}')
        return 2

    html = open(path, encoding='utf-8', errors='ignore').read()
    today = file_date(path)
    items = parse_items(html)
    errors, warns, notes = [], [], []

    if not items:
        if args.allow_parse_fail:
            if not args.quiet:
                print(f'[SKIP] {os.path.basename(path)}：旧格式，未解析到 ititle 条目')
            return 0
        print('[FATAL] 未解析到任何条目（ititle 结构可能已变更）')
        return 2

    # --- 1. 结构完整性 ---
    if html.count('<div') != html.count('</div>'):
        errors.append(f'div 不平衡：<div> {html.count("<div")} / </div> {html.count("</div>")}')
    nums = [i['num'] for i in items]
    if nums != list(range(1, len(items) + 1)):
        errors.append(f'条目编号不连续：{nums}（应为 1..{len(items)}）')
    bad_tag = [i['title'][:30] for i in items if i['tag'] == '?']
    if bad_tag:
        errors.append(f'存在无法识别标签的条目：{bad_tag}')

    # --- 2. 页头统计一致性 ---
    actual = Counter(i['tag'] for i in items)
    hs = header_stats(html)
    annex_n = hs.get('annex', 0)
    # 两种体例：备查条目进正文（11-21 型）／未进正文、仅页头声明（11-22 型）
    annex_in_body = 0
    if annex_n:
        if hs.get('count') is not None and len(items) == hs['count'] + annex_n:
            annex_in_body = annex_n
            notes.append(f'页头声明「另 {annex_n} 条备查」，末 {annex_n} 条为正文备查条目（不计入收录数、不参与判重阻断）')
        else:
            notes.append(f'页头声明「另 {annex_n} 条备查」，该备查条目未进入正文（仅文字说明）')
    expect = {'count': len(items) - annex_in_body, 'first': actual.get('first', 0),
              'multi': actual.get('multi', 0), 'cont': actual.get('cont', 0)}
    for k in ('count', 'first', 'multi', 'cont'):
        if hs[k] is not None and hs[k] != expect[k]:
            errors.append(f'页头「{k}」={hs[k]}，与实际 {expect[k]} 不符')
    if hs['count'] is None:
        warns.append('页头未识别到「今日收录 N 条」，请人工确认统计栏')

    # --- 3. ★ 重复收录检测（核心） ---
    history = []
    self_abs = os.path.abspath(path)
    for f in glob.glob(os.path.join(ROOT, '住建动态简报_*.html')):
        if os.path.abspath(f) == self_abs:
            continue
        d = file_date(f)
        if d == '9999-99-99':
            warns.append(f'跳过无日期文件：{os.path.basename(f)}')
            continue
        if d > today:
            continue
        history.append((d, f))
    history.sort()

    cur_titles = {i['ntitle'] for i in items if i['ntitle']}
    fine_index, coarse_index, title_index = {}, {}, {}
    for d, f in history:
        h = open(f, encoding='utf-8', errors='ignore').read()
        h_items = parse_items(h)
        # 同期副本（备份、重复生成）标题集合高度重合 → 跳过，避免自我比对
        ht = {i['ntitle'] for i in h_items if i['ntitle']}
        if cur_titles and ht:
            jac = len(cur_titles & ht) / len(cur_titles | ht)
            if jac >= 0.7:
                warns.append(f'跳过同期副本：{os.path.basename(f)}（标题重合度 {jac:.2f}）')
                continue
        for it in h_items:
            rec = (d, it['title'], it['tag'], it['ntitle'])
            if it['docno']:
                fine_index.setdefault(it['docno'], []).append(rec)
            if it['docno_coarse']:
                coarse_index.setdefault(it['docno_coarse'], []).append(rec)
            title_index.setdefault(it['ntitle'], []).append(rec)

    for it in items:
        hit, kind = None, ''
        if it['docno'] and it['docno'] in fine_index:
            hit, kind = fine_index[it['docno']][0], '文号（含机关代字）'
        elif it['ntitle'] and it['ntitle'] in title_index:
            hit, kind = title_index[it['ntitle']][0], '标题指纹'
        elif it['docno_coarse'] and it['docno_coarse'] in coarse_index:
            cands = coarse_index[it['docno_coarse']]
            best = max(cands, key=lambda r: sim(it['ntitle'], r[3]))
            s_ = sim(it['ntitle'], best[3])
            if s_ >= 0.55:
                hit, kind = best, f'文号（代字写法差异，标题相似度 {s_:.2f}）'
            else:
                warns.append(f'文号疑似碰撞：{it["title"][:38]} ↔ {best[0]}「{best[1][:28]}」'
                             f'同为 {it["docno_coarse"]} 号，标题差异大，请人工确认')
        if not hit:
            continue
        d, _t, tag, _n = hit
        if it['tag'] == 'cont':
            notes.append(f'【延续跟进·放行】{it["title"][:38]}｜{kind}命中 {d}')
            continue
        if annex_in_body and it['num'] and it['num'] > len(items) - annex_in_body:
            notes.append(f'【备查条目·放行】{it["title"][:38]}｜{kind}命中 {d}（页头已声明为重复备查）')
            continue
        # 口径：同一文件第 2 次及以后收录＝【多次出现】，属合规；
        # 但若标【首次出现】则该文件必然未出现过 → 逻辑矛盾，阻断。
        if it['tag'] == 'multi':
            try:
                gap = (date.fromisoformat(today) - date.fromisoformat(d)).days
            except Exception:
                gap = 999
            if gap <= 7:
                warns.append(f'短期重复收录：{it["title"][:40]}｜{d} 已收录（{gap} 天前），本期再收标【多次出现】'
                            f'——符合口径，请确认摘要补充了新进展、而非照搬前档')
            else:
                notes.append(f'【多次出现·放行】{it["title"][:38]}｜上次 {d}（{gap} 天前）')
            continue
        errors.append(
            f'重复收录（标【首次出现】但此前已收录）：{it["title"][:52]}\n'
            f'          {d} 简报（当时标 {tag}）已收录同一文件（{kind}命中）\n'
            f'          → 同一文件第 2 次收录应标【多次出现】；若本期无新增进展，应删除该条'
        )

    # --- 4. 追踪库重复建档 ---
    tj = os.path.join(ROOT, 'history', 'tracking.json')
    n_topics = 0
    if os.path.exists(tj):
        try:
            topics = json.load(open(tj, encoding='utf-8')).get('topics', [])
        except Exception as e:
            warns.append(f'tracking.json 解析失败：{e}')
            topics = []
        n_topics = len(topics)
        seen = {}
        for i, x in enumerate(topics):
            if not isinstance(x, dict):
                continue
            # 只取 first_region 首个分句，避免把「上位依据」引用的文号当作建档文号
            head = re.split(r'[；;]', str(x.get('first_region', '')))[0]
            if re.search(r'上位|依据|参照|落实|贯彻', head):
                head = ''
            key = docno_key(head) if head else None
            if not key:
                continue
            if key not in seen:
                seen[key] = i
                continue
            j = seen[key]
            a = norm_title(str(topics[j].get('topic', '')))
            b = norm_title(str(x.get('topic', '')))
            if a == b or sim(a, b) >= 0.6:
                errors.append(
                    f'追踪库重复建档：{key} 同时出现在 主题#{j} 与 主题#{i}\n'
                    f'          「{topics[j].get("topic", "")[:36]}」/「{x.get("topic", "")[:36]}」\n'
                    f'          → 保留建档较早者，并入补充信息后删除后者'
                )
        notes.append(f'tracking.json 主题数 {n_topics}')

    # --- 5. 链接格式 ---
    for it in items:
        if not it['url'].startswith('http'):
            errors.append(f'条目链接异常：{it["title"][:40]} → {it["url"][:40]}')

    # ---------- 报告 ----------
    if not args.quiet:
        print(f'校验对象：{os.path.basename(path)}（{today}）')
        print(f'条目数：{len(items)} ｜ 首次 {actual.get("first", 0)} / 多次 {actual.get("multi", 0)} / 延续 {actual.get("cont", 0)}')
        print(f'历史期次：{len(history)} 期参与判重比对')
        for n in notes:
            print(f'  [i] {n}')
        for w in warns:
            print(f'  [!] {w}')
        for e in errors:
            print(f'  [X] {e}')
        print('-' * 64)

    if errors:
        print(f'结论：未通过（{len(errors)} 项阻断）—— 禁止提交发布')
        return 1
    if warns and args.strict:
        print(f'结论：未通过（strict 模式下 {len(warns)} 项警告视为失败）')
        return 1
    print('结论：通过（无重复收录、统计一致、结构完整、追踪库无重复建档）')
    return 0


if __name__ == '__main__':
    sys.exit(main())
