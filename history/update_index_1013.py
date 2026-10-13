# -*- coding: utf-8 -*-
"""更新汇总索引页「住建简报列表.html」——第 49 期（2026-10-13）。
基于第 48 期已更新的原版（totalIssue=48）执行；幂等：只应在本期未更新的原版上运行一次。
同步产出站点入口 index.html。
"""
import io, re, shutil

P = '/root/dailybrief/住建简报列表.html'
h = io.open(P, encoding='utf-8').read()
orig = h

# ---- 1) 页头统计 ----
h = h.replace('共收录 <span id="totalIssue">48</span> 期简报 · 累计 505 条政策动态 · 覆盖 2026-08-25 ~ 2026-10-12 · 更新于 2026-10-12',
              '共收录 <span id="totalIssue">49</span> 期简报 · 累计 509 条政策动态 · 覆盖 2026-08-25 ~ 2026-10-13 · 更新于 2026-10-13', 1)
h = h.replace('共 <span id="visibleCount">48</span> 期', '共 <span id="visibleCount">49</span> 期', 1)

# ---- 2) 近一周分组：更新 data-gsearch / 日期范围 ----
h = h.replace('近一周 10-06 ~ 10-12 含今日，逐日列出 2026-10-12 2026-10-11 2026-10-10 2026-10-09 2026-10-07 2026-10-06',
              '近一周 10-07 ~ 10-13 含今日，逐日列出 2026-10-13 2026-10-12 2026-10-11 2026-10-10 2026-10-09 2026-10-07', 1)
h = h.replace('    <span class="d">10-06 ~ 10-12</span>\n    <span class="m">6 期</span>',
              '    <span class="d">10-07 ~ 10-13</span>\n    <span class="m">6 期</span>', 1)

# ---- 3) 周分组：吸纳滚出近一周的 10-06 ----
h = h.replace('周 10月第1周 · 10-01 ~ 10-05 2026-10-05 2026-10-04 2026-10-03 2026-10-02 2026-10-01',
              '周 10月第1周 · 10-01 ~ 10-06 2026-10-06 2026-10-05 2026-10-04 2026-10-03 2026-10-02 2026-10-01', 1)
h = h.replace('    <span class="d">10月第1周 · 10-01 ~ 10-05</span>\n    <span class="m">5 期</span>',
              '    <span class="d">10月第1周 · 10-01 ~ 10-06</span>\n    <span class="m">6 期</span>', 1)

# ---- 4) 抽出 10-06 条目（声明窗口 10-07~10-13 已不含），移入周分组顶部 ----
m06 = re.search(r'      <div class="entry" data-search="2026-10-06 .*?\n        </div>\n      </div>\n', h, re.S)
assert m06, '10-06 entry not found'
entry06 = m06.group(0)
h = h.replace(entry06, '', 1)

wk = h.index('data-gsearch="周 10月第1周')
wk_body = h.index('<div class="group-body">', wk) + len('<div class="group-body">\n')
h = h[:wk_body] + entry06 + h[wk_body:]

# ---- 5) 新条目 10-13，插入近一周 group-body 顶部 ----
new_entry = '''      <div class="entry" data-search="2026-10-13 周二 住建动态简报 第49期 首次出现 1 多次出现 1 延续跟进 2 常规更新日 非低更新期 住建部本级零新增 广东 关于支持未来社区完整社区建设工作的若干措施 征求意见稿 粤建公告2026 79号 政府银行企业社区 四方协同 金融支持 未来社区 天津 关于贯彻落实完善商品住房销售制度的通知的实施意见 津住建房市2026 8号 封顶预售 预售资金全额监管 现房销售备案 定金5% 主办银行制 第6个落地城市 补录 江苏 一图读懂 关于支持青年社区建设的若干措施 苏政办发2026 46号 四维一体 社区单元 江西 数智住建 建设三年行动计划 2027-2029 赣建网信2026 1号 1115框架 数智底座 数据中台 AI中台 统一门户 烟台基准 保租房 烟建住房2023 28号 2026-11-14 31天 城市更新制度空窗 物业信用空窗 未获取来源 上海TLS 广州WAF420 河南DNS失败 安徽DNS失败 河北412 黑龙江420 甘肃412 青海412">
        <div class="t"><a href="住建动态简报_2026-10-13.html" target="_blank">住建动态简报_2026-10-13.html</a></div>
        <div class="meta">2026-10-13（周二）· <b>第 49 期</b> · 收录 <b>4</b> 条（首次 1 / 多次 1 / 延续 2）</div>
        <div class="abs"><b>常规更新日（非低更新期）·住建部本级零新增·省级仅广东、江苏、江西窗口内有实质新增</b>：采集窗口（10-12 07:00—10-13 07:00）经 7 组并行子代理实测，住建部本级与国家级零实质新增（政策发布最新 09-23、行政规范性文件库最新 08-28、部门规章库最新 04-20、标准公告最新 09-23；首页 MakeTime 已更新至 10-12 19:01，窗口内刷新仅为地方信息栏目新闻稿）；31 个省级住建部门中仅广东、江苏、江西 3 省窗口内有实质新增（其余多为例行公示，均属排除口径）；9 个重点城市（含武汉固定信源 7 栏目）窗口内零实质新增（上海、广州站点不可达）。本期收录 <b>4 条（首次 1／多次 1／延续 2）</b>：<b>广东《关于支持未来社区（完整社区）建设工作的若干措施（征求意见稿）》</b>（粤建公告〔2026〕79号，挂网 10-12，完整社区主题配套支持措施，“政府、银行、企业、社区”四方协同，延续跟进，相关度：高）；<b>天津《关于贯彻落实〈关于完善商品住房销售制度的通知〉的实施意见》</b>（津住建房市〔2026〕8号，成文 10-10，国家 3 号文第 6 个落地城市、低更新期补录，多次出现，相关度：高）；<b>江苏一图读懂《关于支持青年社区建设的若干措施》</b>（苏政办发〔2026〕46号，10-12，官方图解解读，延续跟进，相关度：中）；<b>江西《“数智住建”建设三年行动计划（2027－2029年）》</b>（赣建网信〔2026〕1号，10-12，本系列首个统揽全领域的省级住建数字化顶层规划，首次出现，相关度：中）。<b>烟台台账</b>：本级窗口内无实质新政；保租房 烟建住房〔2023〕28号 <b>2026-11-14 到期、约剩 31 天</b>，接续信号维持；物业信用（空窗约 15 个月）与城市更新制度空窗持续。<b>通道</b>：上海 TLS 握手失败、广州 WAF 420、河南/安徽 DNS 失败、河北 412、黑龙江/广州 420、甘肃/青海 412 延续不可达。</div>
        <div class="tags">
          <span class="tag f">首次出现 1 条</span>
          <span class="tag m">多次出现 1 条</span>
          <span class="tag l">延续跟进 2 条</span>
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

assert h != orig, 'no change applied'

io.open(P, 'w', encoding='utf-8').write(h)
shutil.copyfile(P, '/root/dailybrief/index.html')

print('totalIssue 49:', 'id="totalIssue">49<' in h)
print('visibleCount 49:', 'id="visibleCount">49<' in h)
print('updated 10-13:', '更新于 2026-10-13' in h)
print('new entry:', '住建动态简报_2026-10-13.html' in h)
print('10-06 kept:', h.count('data-search="2026-10-06'))
print('近一周 cnt:', c1)
print('周 cnt:', c2)