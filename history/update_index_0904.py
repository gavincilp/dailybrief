# -*- coding: utf-8 -*-
"""第11期(2026-09-04)：向 住建简报列表.html 插入新分组并更新统计，另存 index.html"""
import io, re

P = r"C:\Users\gavin\WorkBuddy\每日简报\output\住建简报列表.html"
with io.open(P, "r", encoding="utf-8") as f:
    html = f.read()

new_group = '''
  <details class="day-group" open>
    <summary>
      <span class="arrow">▶</span>
      <span class="d">2026-09-04（周五）</span>
      <span class="m">第 11 期</span>
      <span class="cnt">收录 11 条 · 首次 7 · 多次 3 · 延续 1</span>
    </summary>
    <div class="group-body">
      <div class="entry" data-search="2026-09-04 住建动态简报 第11期 首次出现 7 多次出现 3 延续跟进 1 住建部 城市更新规划编制标准 征求意见 建筑施工安全检查标准 JGJ59 修订 2026年第117号公告 废止十三五装配式建筑行动方案 装配式建筑示范城市管理办法 产业基地 江西 城市地下管网专项体检工作技术指南 湖南 房屋市政工程关键岗位人员配备管理办法 再次征求意见 贵州 消防施工质量全过程管理 黔建通2026 44号 广西 住宅专项维修资金实施细则2026年修订 桂建发2026 9号 上海 住建管理十五五规划全文 沪建综规2026 362号 宁波 住宅小区物业管理条例 2026年第二次修正 湖北 行政规范性文件清理结果 广州 模块化建筑设计施工总承包招标文件编制指引 城市更新 质量安全 装配式建筑 地下管网 城市体检 消防审验 维修资金 物业管理 综合规划 智能建造 招投标 制度清理 烟台基准 以旧换新 预售资金监管 配售型保障房 幸福信托制 公租房修订">
        <div class="t"><a href="住建动态简报_2026-09-04.html" target="_blank">住建动态简报_2026-09-04.html</a></div>
        <div class="meta">2026-09-04（周五）· <b>第 11 期</b> · 收录 <b>11</b> 条（首次 7 / 多次 3 / 延续 1）</div>
        <div class="abs">今日重点：住建部 09-03 集中放量——《城市更新规划编制标准》《建筑施工安全检查标准（JGJ59 修订）》同日征求意见、第 117 号公告废止"十三五"装配式建筑行动方案等 5 件文件；江西首创《城市地下管网专项体检工作技术指南（试行）》、湖南关键岗位人员配备管理办法二轮征意、贵州消防施工质量全过程管理 09-01 施行（补录）、广西住宅维修资金实施细则 2026 修订印发、宁波物业条例 2026 年第二次修正公布、湖北规范性文件清理（91 件中 54 件失效）、上海住建"十五五"规划全文补录、广州模块化建筑 EPC 招标指引征意；每条动态含【与烟台现行政策对比】。</div>
        <div class="tags">
          <span class="tag f">首次出现 7 条</span>
          <span class="tag m">多次出现 3 条</span>
          <span class="tag l">延续跟进 1 条</span>
        </div>
      </div>
    </div>
  </details>
'''

marker = "<!-- 按日期分组（新期在上） -->"
assert marker in html, "marker not found"
html = html.replace(marker, marker + "\n" + new_group, 1)

# 旧的 09-03 组默认展开改为折叠（去掉其 open）——插入后第一个 open 组为新增，第二个为原 09-03
idx_first_open = html.find('<details class="day-group" open>')
idx_second_open = html.find('<details class="day-group" open>', idx_first_open + 1)
assert idx_second_open != -1
html = html[:idx_second_open] + '<details class="day-group">' + html[idx_second_open + len('<details class="day-group">'):]

# 更新头部统计与日期
html = html.replace('共收录 <span id="totalIssue">10</span> 期', '共收录 <span id="totalIssue">11</span> 期')
html = html.replace('更新于 2026-09-03', '更新于 2026-09-04')
html = html.replace('共 <span id="visibleCount">10</span> 期', '共 <span id="visibleCount">11</span> 期')

with io.open(P, "w", encoding="utf-8") as f:
    f.write(html)
print("住建简报列表.html updated, len:", len(html))

with io.open(r"C:\Users\gavin\WorkBuddy\每日简报\output\index.html", "w", encoding="utf-8") as f:
    f.write(html)
print("index.html synced")
