# -*- coding: utf-8 -*-
"""更新汇总索引页「住建简报列表.html」——第 48 期（2026-10-12）。
基于 HEAD 原版（totalIssue=47）执行；幂等：只应在本期未更新的原版上运行一次。
"""
import io, re

P = '/workspace/住建简报列表.html'
h = io.open(P, encoding='utf-8').read()
orig = h

# ---- 1) 页头统计 ----
h = h.replace('共收录 <span id="totalIssue">47</span> 期简报 · 累计 500 条政策动态 · 覆盖 2026-08-25 ~ 2026-10-11 · 更新于 2026-10-11',
              '共收录 <span id="totalIssue">48</span> 期简报 · 累计 505 条政策动态 · 覆盖 2026-08-25 ~ 2026-10-12 · 更新于 2026-10-12', 1)
h = h.replace('共 <span id="visibleCount">47</span> 期', '共 <span id="visibleCount">48</span> 期', 1)

# ---- 2) 近一周分组：更新 data-gsearch / 日期范围 / 期数 ----
h = h.replace('近一周 10-05 ~ 10-11 含今日，逐日列出 2026-10-11 2026-10-10 2026-10-09 2026-10-07 2026-10-06 2026-10-05',
              '近一周 10-06 ~ 10-12 含今日，逐日列出 2026-10-12 2026-10-11 2026-10-10 2026-10-09 2026-10-07 2026-10-06', 1)
h = h.replace('    <span class="d">10-05 ~ 10-11</span>\n    <span class="m">7 期</span>',
              '    <span class="d">10-06 ~ 10-12</span>\n    <span class="m">6 期</span>', 1)

# ---- 3) 周分组：更新 data-gsearch / 日期范围 / 期数 ----
h = h.replace('周 10月第1周 · 10-01 ~ 10-03 其余日期见「近一周」 2026-10-03 2026-10-02 2026-10-01',
              '周 10月第1周 · 10-01 ~ 10-05 2026-10-05 2026-10-04 2026-10-03 2026-10-02 2026-10-01', 1)
h = h.replace('    <span class="d">10月第1周 · 10-01 ~ 10-03</span>\n    <span class="m">3 期</span>',
              '    <span class="d">10月第1周 · 10-01 ~ 10-05</span>\n    <span class="m">5 期</span>', 1)

# ---- 4) 抽出 10-05、10-04 条目（声明窗口 10-06~10-12 已不含二者），先全部移出，再统一插入 ----
m05 = re.search(r'      <div class="entry" data-search="2026-10-05 .*?\n        </div>\n      </div>\n', h, re.S)
assert m05, '10-05 entry not found'
entry05 = m05.group(0)
h = h.replace(entry05, '', 1)

m04 = re.search(r'      <div class="entry" data-search="2026-10-04 .*?\n        </div>\n      </div>\n', h, re.S)
assert m04, '10-04 entry not found'
entry04 = m04.group(0)
h = h.replace(entry04, '', 1)

# 全部移出后，再定位「周」分组 group-body 起点并按时间倒序插入 10-05、10-04
wk = h.index('data-gsearch="周 10月第1周')
wk_body = h.index('<div class="group-body">', wk) + len('<div class="group-body">\n')
h = h[:wk_body] + entry05 + entry04 + h[wk_body:]

# ---- 5) 新条目 10-12，插入近一周 group-body 顶部 ----
new_entry = '''      <div class="entry" data-search="2026-10-12 周一 住建动态简报 第48期 首次出现 3 多次出现 1 延续跟进 1 周末低更新期 连续第2期 住建部本级零新增 广东 完整社区建设扩面提质增效工作方案 20部门 481个完整社区 好房子好小区好社区好城区 公共服务 养老托育 私人充电设施 青岛 存量房屋交易合同网签备案办法 修订征求意见稿 房地产经纪 规范化标准化便捷化 烟建住房2026 1号 广西 城镇危旧住房改造暂行办法 征求意见稿 C/D级危房 大板结构 原拆原建 异地安置 三分之二表决 四分之三同意 代建单位 服务费 湖北 乡村建设工匠培训考核实施细则 4工种 40学时 继续教育 广西 建筑业高质量发展十五五规划 政策解读 智能建造 AI+建筑业 BIM 补录 烟台基准 保租房 烟建住房2023 28号 2026-11-14 33天 城市更新制度空窗 未获取来源 上海TLS 广州WAF420 河南 河北 安徽">
        <div class="t"><a href="住建动态简报_2026-10-12.html" target="_blank">住建动态简报_2026-10-12.html</a></div>
        <div class="meta">2026-10-12（周一）· <b>第 48 期</b> · 收录 <b>5</b> 条（首次 3 / 多次 1 / 延续 1）</div>
        <div class="abs"><b>周末低更新期（连续第 2 期）·住建部本级与全国窗口内零新增·本期全部为低更新期补录</b>：采集窗口（10-11 07:00—10-12 07:00）恰逢周日全天—周一晨，经 7 组并行子代理实测，住建部本级与国家级零实质新增，31 个省级住建部门、9 个重点城市（含武汉固定信源 7 栏目）窗口内实质零新增（深圳、宁波命中项为采购/考试类已剔除；上海、广州站点不可达）。本期收录 <b>5 条（首次 3／多次 1／延续 1，全部为补录件）</b>：<b>广东《完整社区建设扩面提质增效工作方案》</b>（20 部门联合、本系列首个省级完整社区专项方案，“十五五”≥481 个完整社区，挂网 10-10 第 47 期漏收，相关度：高）；<b>青岛《存量房屋交易合同网签备案办法（修订征求意见稿）》</b>（同省同主题，直接对照烟台 烟建住房〔2026〕1号，09-30，相关度：高）；<b>广西《城镇危旧住房改造暂行办法（征求意见稿）》</b>（省级专项办法，危房认定范围＋2/3 表决＋代建服务费≤5%，成文 09-02，相关度：高）；<b>湖北《乡村建设工匠培训考核实施细则（试行）（征求意见稿）》</b>（村镇建设工匠队伍，09-17，相关度：中）；<b>广西《建筑业高质量发展“十五五”规划》政策解读</b>（正式印发，10-08，延续跟进，相关度：中）。<b>去重</b>：广西《建筑产业提质升级若干意见（征求意见稿）》已于第 42 期收录，本期不重复计收。<b>烟台台账</b>：本级窗口内无实质新政（仅 3 条例行资质/安许公示）；保租房 烟建住房〔2023〕28号 <b>2026-11-14 到期、仅剩约 33 天</b>，接续信号维持；物业信用（空窗约 15 个月）与城市更新制度空窗持续。<b>通道更正</b>：辽宁省级住建部门官网实为 zjt.ln.gov.cn；江苏通知公告 col49384 WAF 拦截解除；广西须 http；贵州/云南须备用域。</div>
        <div class="tags">
          <span class="tag f">首次出现 3 条</span>
          <span class="tag m">多次出现 1 条</span>
          <span class="tag l">延续跟进 1 条</span>
        </div>
      </div>
'''
rw = h.index('data-gsearch="近一周')
rw_body = h.index('<div class="group-body">', rw) + len('<div class="group-body">\n')
h = h[:rw_body] + new_entry + h[rw_body:]

# ---- 6) 重新计算「近一周」「周」两组的 cnt ----
def recount(group_html):
    ns = re.findall(r'收录 <b>(\d+)</b> 条（首次 (\d+) / 多次 (\d+) / 延续 (\d+)）', group_html)
    n = sum(int(x[0]) for x in ns); a = sum(int(x[1]) for x in ns)
    b = sum(int(x[2]) for x in ns); c = sum(int(x[3]) for x in ns)
    return n, a, b, c

def fix_cnt(h, anchor):
    i = h.index(anchor)
    j = h.index('</details>', i)
    block = h[i:j]
    n, a, b, c = recount(block)
    new_cnt = '共收录 %d 条 · 首次 %d · 多次 %d · 延续 %d' % (n, a, b, c)
    block2 = re.sub(r'<span class="cnt">.*?</span>', '<span class="cnt">%s</span>' % new_cnt, block, count=1)
    return h[:i] + block2 + h[j:], new_cnt

h, c1 = fix_cnt(h, 'data-gsearch="近一周')
h, c2 = fix_cnt(h, 'data-gsearch="周 10月第1周')

io.open(P, 'w', encoding='utf-8').write(h)

print('totalIssue 48:', 'id="totalIssue">48<' in h)
print('visibleCount 48:', 'id="visibleCount">48<' in h)
print('updated 10-12:', '更新于 2026-10-12' in h)
print('new entry:', '住建动态简报_2026-10-12.html' in h)
print('10-05 moved:', h.count('data-search="2026-10-05'))
print('10-04 moved:', h.count('data-search="2026-10-04'))
print('近一周 cnt:', c1)
print('周 cnt:', c2)
print('changed:', h != orig)