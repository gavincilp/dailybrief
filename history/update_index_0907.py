# -*- coding: utf-8 -*-
"""2026-09-07 第14期：更新 住建简报列表.html（新增分组+计数+默认展开切换）"""
import io, re

PATH = "住建简报列表.html"
html = open(PATH, encoding="utf-8").read()

# 1) 计数与日期
html = html.replace('共收录 <span id="totalIssue">13</span>', '共收录 <span id="totalIssue">14</span>')
html = html.replace('更新于 2026-09-06', '更新于 2026-09-07')
html = html.replace('<span id="visibleCount">13</span>', '<span id="visibleCount">14</span>')

# 2) 新分组 HTML（置顶，open）
new_group = '''  <details class="day-group" open>
    <summary>
      <span class="arrow">▶</span>
      <span class="d">2026-09-07（周一）</span>
      <span class="m">第 14 期</span>
      <span class="cnt">收录 4 条 · 首次 1 · 多次 1 · 延续 2</span>
    </summary>
    <div class="group-body">
      <div class="entry" data-search="2026-09-07 住建动态简报 第14期 首次出现 1 多次出现 1 延续跟进 2 陕西省委省政府 关于推动城市高质量发展的实施意见 25项行动 城市更新 好房子 保障性住房 老旧小区改造 自主更新 原拆原建 完整社区 地下管网 房屋市政安全 天津 配售型保障性住房建设导则 住建部好房子建设经验做法第二批清单 河北区志成路项目 全装修 绿色建筑 山西 绿色建筑创新项目创建方案 晋建科字2026 103号 每年培育三年认定 信用记录 容积率 绿色金融 青海 高寒高海拔农牧区传统民居好房子技术标准 农房 城市高质量发展省级实施意见 好房子 绿色建筑 配售型保障房 村镇建设 绿色低碳 城市更新 烟台基准 幸福信托制 300个小区 配售型保障房10号文 以旧换新6号文">
        <div class="t"><a href="住建动态简报_2026-09-07.html" target="_blank">住建动态简报_2026-09-07.html</a></div>
        <div class="meta">2026-09-07（周一）· <b>第 14 期</b> · 收录 <b>4</b> 条（首次 1 / 多次 1 / 延续 2）</div>
        <div class="abs">今日重点：周一晨低更新窗口（09-06 周日停更、09-07 上午官网未及更新），本期收录 09-03/09-04 发布补录 4 条——陕西省委、省政府《关于推动城市高质量发展的实施意见》（25 项行动，湖北 08-24 公开后第二个省委省政府级城市综合实施意见，含好房子/自主更新原拆原建/完整社区/地下管网/房屋市政安全）；天津配售型保障房建设导则入选住建部"好房子"经验做法（第二批）清单全国推广（三原则七板块、志成路 616 套样本，直接对标烟台配售型 10 号文建设端）；山西绿色建筑创新项目创建方案（晋建科字〔2026〕103 号，六类创建对象、"每年培育、三年认定"、认定结果挂接招投标/信用评价，系列内首个绿建"创建示范+信用激励"省级方案）；青海批准发布高寒高海拔农牧区传统民居"好房子"技术标准（好房子标准首次下沉农房）。四条均含【与烟台现行政策对比】；烟台基准完成幸福信托制口径（300 小区）、配售型 10 号文、以旧换新 6 号文三项核验销号。</div>
        <div class="tags">
          <span class="tag f">首次出现 1 条</span>
          <span class="tag m">多次出现 1 条</span>
          <span class="tag l">延续跟进 2 条</span>
        </div>
      </div>
    </div>
  </details>

'''

# 3) 插到第13期分组之前（第一个 <details class="day-group" open> 之前）
anchor = '<details class="day-group" open>\n    <summary>\n      <span class="arrow">▶</span>\n      <span class="d">2026-09-06'
assert html.count(anchor) == 1, "anchor count=%d" % html.count(anchor)
html = html.replace(anchor, new_group + anchor)

# 4) 第13期分组去掉 open（新分组之后遇到的第一个 open details 即原第13期）
old_open = '<details class="day-group" open>\n    <summary>\n      <span class="arrow">▶</span>\n      <span class="d">2026-09-07'
# 新加的已经是 open 且在最前；将紧随其后的第13期 open 移除
pat = re.compile(r'(<details class="day-group") open(>\s*<summary>\s*<span class="arrow">▶</span>\s*<span class="d">2026-09-06)')
html2, n = pat.subn(r'\1\2', html)
print("removed open on 09-06 group:", n)
html = html2

# 5) 清理残留的 "open>" 错位（若第10期等历史遗留）
html = html.replace('<details class="day-group">open>', '<details class="day-group">')

open(html if False else PATH, "w", encoding="utf-8").write(html)
print("saved, len:", len(html))
print("totalIssue14:", "totalIssue\">14" in html)
print("visibleCount14:", 'id="visibleCount">14' in html)
