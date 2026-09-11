# -*- coding: utf-8 -*-
import io, re
p='住建简报列表.html'
h=io.open(p,encoding='utf-8').read()
orig=h

# 1) header totalIssue / 更新日期
h=h.replace('共收录 <span id="totalIssue">18</span> 期简报 · 覆盖全国住建部及各省市住建部门官网政策动态 · 更新于 2026-09-11',
            '共收录 <span id="totalIssue">19</span> 期简报 · 覆盖全国住建部及各省市住建部门官网政策动态 · 更新于 2026-09-12',1)
# 2) visibleCount
h=h.replace('共 <span id="visibleCount">18</span> 期','共 <span id="visibleCount">19</span> 期',1)

# 3) 去掉上一期(第18期)的默认展开
h=h.replace('<!-- 按日期分组（新期在上） -->\n\n        <details class="day-group" open>',
            '<!-- 按日期分组（新期在上） -->\n\n        <details class="day-group">',1)

ds=('2026-09-12 住建动态简报 第19期 首次出现 2 多次出现 3 延续跟进 0 '
    '广东 城市更新 城市体检与城市更新一体化推进工作指引 城市更新专项规划和年度实施计划编制工作指引 '
    '城市更新片区策划编制技术导则 城市更新项目实施方案编制技术导则 粤建节2026 168号 四件套 技术指引 试行 '
    '住建部 城市更新规划编制标准 征求意见 湖北 城市更新单元体检评估技术规程 '
    '青岛 建筑防水工程技术导则2026版 好房子 青建管字2022 39号 废止 工程质量安全 防水 浙江 堵漏裂臭 湖南 一隔四防 '
    '西藏 住宅小区物业服务合同示范文本 前期物业服务合同 征求意见 物业管理 上海 沪房物业2026 141号 酬金制 包干制 武汉 幸福信托制 '
    '四川 城市供水突发事件应急预案 征求意见稿 市政公用 应急管理 河南 防范第三方施工破坏城镇燃气管道 '
    '新疆 住房城乡建设领域涉黑涉恶违法犯罪线索 征集公告 专项行动 招投标 施工 建筑垃圾处置 '
    '烟台基准 公租房管理办法 烟建住房2026 9号 已核实 人工费拨付比例 烟建建管2026 15号 待核实')

new_group = '''        <details class="day-group" open>
    <summary>
      <span class="arrow">▶</span>
      <span class="d">2026-09-12（周六）</span>
      <span class="m">第 19 期</span>
      <span class="cnt">收录 5 条 · 首次 2 · 多次 3 · 延续 0</span>
    </summary>
    <div class="group-body">
      <div class="entry" data-search="%s">
        <div class="t"><a href="住建动态简报_2026-09-12.html" target="_blank">住建动态简报_2026-09-12.html</a></div>
        <div class="meta">2026-09-12（周六）· <b>第 19 期</b> · 收录 <b>5</b> 条（首次 2 / 多次 3 / 延续 0）</div>
        <div class="abs">今日重点：采集窗口为周五傍晚—周六晨（09-11 16:40—09-12 07:30），周五傍晚成为制度发布窗口——广东 09-11 17:33 印发城市更新"四件套"技术指引（粤建节〔2026〕168号，含城市体检与城市更新一体化推进工作指引、专项规划和年度实施计划编制工作指引、片区策划编制技术导则、项目实施方案编制技术导则），首次由单项标准升级为"体检—规划计划—片区策划—实施方案"全链条体系，在住建部 09-03《城市更新规划编制标准》征意、湖北 09-04 单元体检评估技术规程之后，多次出现；青岛 09-11 发布《建筑防水工程技术导则（2026版）》并废止 2022 版（青建管字〔2022〕39号），"好房子"条线下质量技术标准整体换代，首次出现；西藏 09-11 17:23 就住宅小区前期/普通两份物业服务合同示范文本征求意见（至 09-30），在上海 09-10 四文本、武汉 08-31 酬金制之后第 3 个地区加入，多次出现；四川 09-11 17:51 就《城市供水突发事件应急预案（征求意见稿）》征求意见（至 10-10），市政公用"事后应急"端补制度，首次出现；新疆 09-11 公开征集住建领域涉黑涉恶违法犯罪线索（明确招投标、施工、建筑垃圾处置三大领域），多次出现。烟台基准：窗口内本级无实质新政，上期 8 项待核实中"公租房管理办法修订稿"已销号（烟建住房〔2026〕9号，2026-07-01 施行、有效期至 2031-07-01），其余 7 项维持待核实。</div>
        <div class="tags">
          <span class="tag f">首次出现 2 条</span>
          <span class="tag m">多次出现 3 条</span>
          <span class="tag l">延续跟进 0 条</span>
        </div>
      </div>
    </div>
  </details>

''' % ds

anchor='<!-- 按日期分组（新期在上） -->\n\n'
assert anchor in h, 'anchor not found'
h=h.replace(anchor, anchor+new_group, 1)

io.open(p,'w',encoding='utf-8').write(h)
print('totalIssue19:', 'id="totalIssue">19<' in h)
print('visibleCount19:', 'id="visibleCount">19<' in h)
print('updated 09-12:', '更新于 2026-09-12' in h)
print('new group inserted:', '住建动态简报_2026-09-12.html' in h)
print('old 18 group collapsed:', h.count('<details class="day-group" open>'))
print('changed:', h!=orig, 'len', len(h))
