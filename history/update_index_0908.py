# -*- coding: utf-8 -*-
"""2026-09-08 第15期：更新 住建简报列表.html（新增分组+计数+默认展开切换）"""
import re

PATH = "住建简报列表.html"
html = open(PATH, encoding="utf-8").read()

# 1) 计数与日期
html = html.replace('共收录 <span id="totalIssue">14</span>', '共收录 <span id="totalIssue">15</span>')
html = html.replace('更新于 2026-09-07', '更新于 2026-09-08')
html = html.replace('<span id="visibleCount">14</span>', '<span id="visibleCount">15</span>')

# 2) 新分组 HTML（置顶，open）
new_group = '''    <details class="day-group" open>
    <summary>
      <span class="arrow">▶</span>
      <span class="d">2026-09-08（周二）</span>
      <span class="m">第 15 期</span>
      <span class="cnt">收录 4 条 · 首次 0 · 多次 3 · 延续 1</span>
    </summary>
    <div class="group-body">
      <div class="entry" data-search="2026-09-08 住建动态简报 第15期 首次出现 0 多次出现 3 延续跟进 1 深圳 拟废止 深圳市建筑市场主体信用管理办法 深建规2020 3号 建筑市场主体信用 信用评价体系 国办发2026 8号 企业信用状况综合评价 国家发改委第44号令 招标投标领域信用管理暂行办法 2027年施行 广西暂停信用评价 苏州暂停应用 江苏废止信用手册 河北 6项举措入选 住建部好房子建设经验做法第二批 雄安新区 好房子建设指南 精品工程技术指导手册 住宅工程质量分户验收标准 56项管控措施 215个关键节点 唐山钢结构住宅 邢台设计创新 住宅工程质量易发问题防治指南 70余项好工艺 安徽 城市更新十五五规划 一图读懂 部门图解 214个更新片区 519个项目 4317亿元 城市更新省级立法 贵州 贵州省住房城乡建设系统行政处罚裁量权基准 征求意见 山东 鲁建法字2023 5号 832项处罚事项 行政处罚裁量 住建部官网零新增 建筑市场监管 信用 好房子 城市更新 行政执法 烟台基准 zjj.yantai.gov.cn 配售型保障房10号文 面积口径修正 90平方米为主 最大不超过150平方米 住建领域安全生产管理办法 发布会线索 幸福信托制 以旧换新6号文">
        <div class="t"><a href="住建动态简报_2026-09-08.html" target="_blank">住建动态简报_2026-09-08.html</a></div>
        <div class="meta">2026-09-08（周二）· <b>第 15 期</b> · 收录 <b>4</b> 条（首次 0 / 多次 3 / 延续 1）</div>
        <div class="abs">今日重点：采集窗口为周一工作日—周二晨（09-07 08:30—09-08 08:30），全国官网当日新增以公示/活动类为主，本期收录实质制度动态 4 条（系列第二个"零首次"低更新期）——深圳拟废止《深圳市建筑市场主体信用管理办法》（深建规〔2020〕3号）公开征求意见至 09-17，继广西"暂停"（08-10）、苏州"暂停应用"（08-25）、江苏省厅"废止信用手册等 12 件"（08-26）之后，清理方式升级为一线城市整体"废止"地方建筑市场信用管理文件，向国家"企业信用状况综合评价＋招投标信用管理统一框架"并轨（国办发〔2026〕8号＋发改委第 44 号令 2027-01-01 施行，对烟台招投标监管有前瞻意义）；河北官网披露 6 项举措入选住建部"好房子"经验做法（第二批）清单（雄安"56 项管控措施/215 个关键节点"分户验收体系、唐山钢结构住宅、70 余项好工艺推广等，直接服务烟台 9-30 省级高品质住宅培育库申报）；安徽 09-07 晚间发布城市更新"十五五"规划"一图读懂"部门图解（省级规划家族新成员，"规划＋更新立法＋214 片区项目库"并行）；贵州就住建系统行政处罚裁量权基准公开征求意见（山东 2023-09 鲁建法字〔2023〕5号 832 项基准先行）。住建部官网窗口内零新增。烟台基准：核实市住建局官网域名 zjj.yantai.gov.cn、修正配售型 10 号文面积口径（单套≤90㎡ 为主、最大 ≤150㎡），3 项长期待核实事项未销号并新增市级安全生产 2 件文件待核线索。</div>
        <div class="tags">
          <span class="tag f">首次出现 0 条</span>
          <span class="tag m">多次出现 3 条</span>
          <span class="tag l">延续跟进 1 条</span>
        </div>
      </div>
    </div>
  </details>

'''

# 3) 插到第14期（09-07，当前 open）分组之前
anchor = '<details class="day-group" open>\n    <summary>\n      <span class="arrow">▶</span>\n      <span class="d">2026-09-07'
assert html.count(anchor) == 1, "anchor count=%d" % html.count(anchor)
html = html.replace(anchor, new_group + anchor)

# 4) 第14期分组去掉 open（新分组插入后其后的 open details 即原第14期）
pat = re.compile(r'(<details class="day-group") open(>\s*<summary>\s*<span class="arrow">▶</span>\s*<span class="d">2026-09-07)')
html2, n = pat.subn(r'\1\2', html)
print("removed open on 09-07 group:", n)
html = html2

# 5) 清理残留
html = html.replace('<details class="day-group">open>', '<details class="day-group">')

open(PATH, "w", encoding="utf-8").write(html)
print("saved, len:", len(html))
print("totalIssue15:", 'totalIssue">15' in html)
print("visibleCount15:", 'id="visibleCount">15' in html)
print("open-groups:", html.count('<details class="day-group" open>'))
