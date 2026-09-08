# -*- coding: utf-8 -*-
# 更新住建简报列表.html：新增 2026-09-09（第16期）分组并置顶展开，上一期改折叠，更新计数与日期
import io

path = r"C:\Users\gavin\WorkBuddy\每日简报\output\住建简报列表.html"
h = io.open(path, encoding="utf-8").read()

# 1) 更新计数与日期
h = h.replace('<span id="totalIssue">15</span>', '<span id="totalIssue">16</span>')
h = h.replace('<span id="visibleCount">15</span>', '<span id="visibleCount">16</span>')
h = h.replace("更新于 2026-09-08", "更新于 2026-09-09")
h = h.replace("更新于 2026-09-09日", "更新于 2026-09-09")  # safety

# 2) 新分组条目（默认 open）
new_group = '''<details class="day-group" open>
    <summary>
      <span class="arrow">▶</span>
      <span class="d">2026-09-09（周三）</span>
      <span class="m">第 16 期</span>
      <span class="cnt">收录 4 条 · 首次 2 · 多次 2 · 延续 0</span>
    </summary>
    <div class="group-body">
      <div class="entry" data-search="2026-09-09 住建动态简报 第16期 首次出现 2 多次出现 2 延续跟进 0 河南 九部门 控增量去库存优供给 着力稳定房地产市场 若干措施 15条 供地去化周期管控 18个月 12至18个月 提高预售门槛 鼓励现房销售 收购存量商品房 用作保障性住房 安置住房 多子女家庭核减一套 以旧换新 带押过户 预售资金专户监管 项目公司制 主办银行制 现房销售制 房地产调控 湖南 城市更新三年行动实施方案 2026至2028 湘政办发2026 45号 20项任务 100个城市更新片区 80个引领片区 4000个老旧小区 500个完整社区 老旧住房自主更新1.8万套 加装更新电梯5000台 老旧管网1.2万公里 房屋安全体检 安全管理资金 质量安全保险 专项债自审自发 REITs 危房普查建档立卡 C级D级危险住房 十大历史文化保护利用重点片区 甘肃 房屋建筑统一代码制度 赋码到套到户 甘建设2026 96号 三统一 CIM基础平台 施工图审查赋码 施工许可电子证照载明 商品房预现售 保障房配售配租 赋码到套户 数字住建 全国 数字化绿色化协同转型发展实施方案 2026至2030 七部门 双化协同 城市运行一网统管 城市信息模型CIM 城市运行管理服务平台 建筑节能 绿色低碳 住建部官网转发 中央网信办 烟台基准 安全生产两件文件未见发布 待核实">
        <div class="t"><a href="住建动态简报_2026-09-09.html" target="_blank">住建动态简报_2026-09-09.html</a></div>
        <div class="meta">2026-09-09（周三）· <b>第 16 期</b> · 收录 <b>4</b> 条（首次 2 / 多次 2 / 延续 0）</div>
        <div class="abs">今日重点：采集窗口为周二工作日—周三晨（09-08 08:30—09-09 08:30），省级层面重磅集中——河南 09-08 由省住建厅等九部门印发 15 条房地产新政（"控增量去库存优供给"：供地去化周期分档管控、提高预售门槛并鼓励现房销售、收购存量商品房用作保障/安置住房、以旧换新、带押过户、探索项目公司制/主办银行制，多次出现）；湖南 09-07 公开省政府办公厅《城市更新三年行动实施方案（2026—2028年）》（湘政办发〔2026〕45号，20 项任务量化到 2028：启动 100 片区/建成 80 引领片区、旧改 4000 小区、自主更新 1.8 万套、电梯 5000 台、管网 1.2 万公里，并部署房屋安全三项制度与专项债"自审自发"＋REITs 融资，系系列首份省级三年行动型更新专项，首次出现）；甘肃 09-07 印发甘建设〔2026〕96号落实房屋建筑统一代码制度（"三统一＋两阶段目标"，国家导则后系列内首个省级落地，多次出现）；住建部官网 09-08 转发七部门《促进数字化绿色化协同转型发展实施方案（2026—2030年）》（涉 CIM 平台与城市运管服、建筑领域双化协同，首次出现）。住建部规范性文件窗口内零新增；延续跟进 0 条。烟台基准：官网 09-04 后无新业务发文，发布会提及的市级安全生产 2 件文件仍"未见正式发布"。</div>
        <div class="tags">
          <span class="tag f">首次出现 2 条</span>
          <span class="tag m">多次出现 2 条</span>
          <span class="tag l">延续跟进 0 条</span>
        </div>
      </div>
    </div>
  </details>
'''

anchor = '<details class="day-group" open>'
idx = h.find(anchor)
assert idx >= 0, "未找到 open 分组锚点"
h = h[:idx] + new_group + "\n  " + h[idx:]
# 上一期（2026-09-08）改折叠：把紧随其后的第一个 open 分组去掉 open
h = h.replace('<details class="day-group" open>', '<details class="day-group">', 1)

io.open(path, "w", encoding="utf-8").write(h)
print("done. groups:", h.count('<details class="day-group"'), "| open groups:", h.count('<details class="day-group" open>'))
