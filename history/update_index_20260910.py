# -*- coding: utf-8 -*-
# 更新住建简报列表.html：新增 2026-09-10（第17期）分组并置顶展开（同时修正上期 open 误折叠问题）
import io

path = r"C:\Users\gavin\WorkBuddy\每日简报\output\住建简报列表.html"
h = io.open(path, encoding="utf-8").read()

# 1) 更新计数与日期
h = h.replace('<span id="totalIssue">16</span>', '<span id="totalIssue">17</span>')
h = h.replace('<span id="visibleCount">16</span>', '<span id="visibleCount">17</span>')
h = h.replace("更新于 2026-09-09", "更新于 2026-09-10")

# 2) 先把现有 open 分组（第15期，误留）折叠
h = h.replace('<details class="day-group" open>', '<details class="day-group">', 1)

new_group = '''<details class="day-group" open>
    <summary>
      <span class="arrow">▶</span>
      <span class="d">2026-09-10（周四）</span>
      <span class="m">第 17 期</span>
      <span class="cnt">收录 5 条 · 首次 1 · 多次 3 · 延续 1</span>
    </summary>
    <div class="group-body">
      <div class="entry" data-search="2026-09-10 住建动态简报 第17期 首次出现 1 多次出现 3 延续跟进 1 住建部 促进装配式装修发展的指导意见 征求意见稿 建司局函标2026 166号 装配式装修 内装工业化 好房子 绿色建筑 117号公告 废止十三五装配式 上海 旧住房成套改造和拆除重建实施管理办法 征求意见 沪房规范2023 1号 试行转正式 22条 80%以上权利人同意启动 协议签约95% 规划土地支持 增加建筑量 相邻零星土地 城市更新 自主更新 原拆原建 山西 利用政策性金融资金支持城市更新行动 晋建设字2026 97号 国家开发银行山西省分行 专项贷款最长35年 政策性金融工具20年 三优先绿色通道 八大领域 城市更新投融资 贵州 进一步规范全省国有土地上房屋征收工作的指导意见 黔建通2026 55号 先补偿后搬迁 严禁大拆大建 探索试行房票安置 一户一档 房屋征收 安徽 城市更新十五五规划 皖建城2026 61号 6000亿元投资 老旧小区1900个 完整社区100个 危旧房城中村5万户 地下管网1.3万公里 智能建造试点100个 口袋公园750个 房屋全生命周期安全管理制度 专项债 REITs 城市更新条例 烟台基准 原拆原建 中心城区率先试点 核销 安全生产两件文件 拟出台 招远发布会">
        <div class="t"><a href="住建动态简报_2026-09-10.html" target="_blank">住建动态简报_2026-09-10.html</a></div>
        <div class="meta">2026-09-10（周四）· <b>第 17 期</b> · 收录 <b>5</b> 条（首次 1 / 多次 3 / 延续 1）</div>
        <div class="abs">今日重点：采集窗口为周三工作日—周四晨（09-09 08:30—09-10 08:30），部级与城市更新条线为主——住建部 09-09 就《关于促进装配式装修发展的指导意见（征求意见稿）》公开征求意见（建司局函标〔2026〕166号，反馈至 09-15，国家层面首次就装配式装修单列专项部署，衔接 09-03 废止"十三五"装配式文件的 117 号公告，首次出现）；上海 09-09 拟将旧住房成套改造和拆除重建办法由 2023 试行转正式并公开征求意见（22 条全流程、80% 同意启动＋95% 签约生效双门槛、可按规划增加建筑量，湖北 08-27/湖南 09-04 后自主更新政策族再添上海，多次出现）；山西 09-08 省住建厅联合国家开发银行山西省分行发文以政策性金融支持城市更新（八大领域、专项贷款最长 35 年、三优先绿色通道，江苏 08-22/陕西 08-21 后第 3 个地区，上期漏收补录，多次出现）；贵州 09-08 印发规范国有土地上房屋征收指导意见（先补偿后搬迁、严禁大拆大建、探索试行房票安置，广州 08-31 示范文本后跟进，多次出现）；安徽城市更新"十五五"规划正式印发文本确认（皖建城〔2026〕61号，6000 亿元投资、旧改 1900 个等量化指标，第 15 期图解建档后层级核销，延续跟进）。烟台基准：官网 09-08—09-10 无实质新政；核销 2 项（原拆原建"中心城区率先试点"确认存在、安全生产 2 件文件经招远发布会佐证仍拟出台），维持待核实 9 项。</div>
        <div class="tags">
          <span class="tag f">首次出现 1 条</span>
          <span class="tag m">多次出现 3 条</span>
          <span class="tag l">延续跟进 1 条</span>
        </div>
      </div>
    </div>
  </details>
'''

anchor = '<details class="day-group">'
idx = h.find(anchor)
assert idx >= 0, "未找到分组锚点"
h = h[:idx] + new_group + "\n" + h[idx:]

io.open(path, "w", encoding="utf-8").write(h)
print("done. groups:", h.count('<details class="day-group"'), "| open groups:", h.count('<details class="day-group" open>'))
