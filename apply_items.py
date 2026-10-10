# -*- coding: utf-8 -*-
p = '/root/dailybrief/住建动态简报_2026-10-10.html'
s = open(p, encoding='utf-8').read()

def rep(old, new, cnt=1):
    global s
    c = s.count(old)
    assert c == cnt, ('count mismatch', c, old[:40])
    s = s.replace(old, new)

# ---------- 1) 头部统计 ----------
rep('<span class="st st-all">今日收录 <b>18</b> 条</span>', '<span class="st st-all">今日收录 <b>21</b> 条</span>')
rep('<span class="st st-first">首次出现 <b>13</b> 条</span>', '<span class="st st-first">首次出现 <b>14</b> 条</span>')
rep('<span class="st st-multi">多次出现 <b>5</b> 条</span>', '<span class="st st-multi">多次出现 <b>6</b> 条</span>')
rep('<span class="st st-cont">延续跟进 <b>0</b> 条</span>', '<span class="st st-cont">延续跟进 <b>1</b> 条</span>')

# ---------- 2) 提要计数 ----------
rep('本期共收录 <b>18 条</b>（首次出现 15／多次出现 3／延续跟进 0）',
    '本期共收录 <b>21 条</b>（首次出现 14／多次出现 6／延续跟进 1）；另经 <b>10-10 午间二次复核</b>，补录此前漏收的窗口内条目 <b>3 条</b>（天津智慧工地典型场景、广州建筑行业自律、广西 BIM 试点经验第三期），并对本期版式做补全修正')

# ---------- 3) 新增条目（插入到「二、政策追踪表」之前） ----------
new_items = '''<div class="item" id="it19">
  <div class="ihd">
    <div class="ino">19</div>
    <div class="imain">
      <div class="ititle"><a href="https://zfcxjs.tj.gov.cn/xxgk_70/tzgg/202610/t20261010_7409892.html" target="_blank" rel="noopener">天津市住房和城乡建设委员会关于发布第一批智慧工地技术应用典型应用场景的通知</a></div>
      <div class="imeta">
        <span class="m m-src">天津市住房和城乡建设委员会</span>
        <span class="m m-pub">发布时间：2026-10-09</span>
        <span class="m m-field">领域：建筑业管理／工程质量安全（智慧工地）</span>
        <span class="tag t-first">首次出现</span>
      </div>
    </div>
  </div>
  <div class="block">
    <div class="block-t">内容摘要</div>
    <div class="block-b">天津市住建委落实住房和城乡建设部关于推进智慧工地建设的部署，2026 年 3 月组织征集智慧工地技术应用场景，共征集 <b>9 个场景</b>，经资料审查与专家评审，遴选确定 <b>3 个项目为第一批智慧工地技术应用典型应用场景</b>予以发布，供全市学习借鉴，推动智慧工地由「技术供给」走向「场景落地」。</div>
  </div>
  <div class="block blk-change">
    <div class="block-t">变化对比</div>
    <div class="block-b">本系列智慧工地／智能建造类条目此前多为「技术标准规程」（深圳智能建造工种机器人应用技术规程、塔式起重机远程控制系统）或「平台建设」；天津本件把落点放在<b>「典型应用场景名录式发布」</b>，以「征集—评审—名录」方式沉淀可复制场景，该体例在本简报追踪系列中<b>为首次记录</b>（智慧工地建设本身系住建部长期部署事项，多地已推行）。</div>
  </div>
  <div class="block blk-yt">
    <div class="block-t">与烟台现行政策对比</div>
    <div class="block-b"><b>① 烟台是否已有同类政策：</b>烟台已在 <b>2026-10-01 起常态化应用「人工智能辅助」招标投标</b>，并建有智慧工地相关平台，但<b>未见市级「智慧工地技术应用典型应用场景」征集与名录发布机制</b>（烟台是否已开展同类场景征集，<b>待核实</b>）。<b>② 异同：</b>烟台侧重「平台＋AI 评审」的过程监管，天津侧重「场景遴选＋名录示范」的经验推广；两者互补，天津路径<b>无新增财政支出</b>。<b>③ 启示：</b>建议烟台由市住建局组织一次智慧工地场景征集，与既有 AI 辅助招投标、智慧工地平台数据贯通，形成本地「可复制场景清单」，成本极低、见效快。</div>
  </div>
  <div class="relbar rel-m">
    <span class="rel-t">与烟台相关度</span>
    <span class="rel-v">中</span>
    <span class="rel-n">「场景征集—评审—名录」低成本推广工具，可与烟台 AI 辅助招投标、智慧工地平台衔接。</span>
  </div>
</div>
<div class="item" id="it20">
  <div class="ihd">
    <div class="ino">20</div>
    <div class="imain">
      <div class="ititle"><a href="https://zfcj.gz.gov.cn/gkmlpt/content/11/11031/post_11031293.html" target="_blank" rel="noopener">广州市住房和城乡建设局关于转发《关于推进建筑行业自律建设规范我市房屋建筑工程领域经营秩序的通知》的通知（穗建质〔2026〕590号）</a></div>
      <div class="imeta">
        <span class="m m-src">广州市住房和城乡建设局</span>
        <span class="m m-pub">发布时间：2026-10-08（成文 2026-09-27）</span>
        <span class="m m-field">领域：建筑业管理（行业自律／市场秩序）</span>
        <span class="tag t-multi">多次出现</span>
      </div>
    </div>
  </div>
  <div class="block">
    <div class="block-t">内容摘要</div>
    <div class="block-b">广州市住建局转发上级《关于推进建筑行业自律建设规范我市房屋建筑工程领域经营秩序的通知》，要求推进建筑行业自律建设、规范房屋建筑工程领域经营秩序（文号：<b>穗建质〔2026〕590 号</b>）。<span style="color:#8a6d1f">（注：正文页经渲染方式核验标题、日期与文号一致；直连请求因站点 WAF 返回 420。）</span></div>
  </div>
  <div class="block blk-change">
    <div class="block-t">变化对比</div>
    <div class="block-b">本系列「行业自律」主题此前见于<b>甘肃（建设工程监理行业自律管理办法，09-24）</b>与<b>佛山（施工图审查收费行业自律，10-06）</b>，均聚焦单一环节；广州本件把自律从「监理／图审收费」扩展到<b>房屋建筑工程领域经营秩序</b>整体，覆盖面更广，为该主题第 3 个地区。</div>
  </div>
  <div class="block blk-yt">
    <div class="block-t">与烟台现行政策对比</div>
    <div class="block-b"><b>① 烟台是否已有同类政策：</b>烟台建筑业治理以<b>制度性工具</b>为主——农民工工资支付承诺制、招投标「评定分离」、AI 辅助招投标（2026-10-01 起）、《建筑工程施工现场关键岗位人员配备和在岗履职管理办法》（烟建建管〔2022〕9号），<b>未见以「行业自律＋经营秩序规范」为抓手的专件</b>（烟台行业协会自律建设情况<b>待核实</b>）。<b>② 异同：</b>烟台偏「政府监管＋承诺制」，广州偏「行业自律＋经营秩序」，前者刚性、后者柔性；广州可补烟台在招标代理、专业分包等<b>中介层行为规范</b>上的空白。<b>③ 启示：</b>建议烟台在深化评定分离、AI 评审的同时，研究以<b>行业协会自律公约＋经营秩序负面清单</b>方式约束中介层行为，成本低、可先行试点。</div>
  </div>
  <div class="relbar rel-m">
    <span class="rel-t">与烟台相关度</span>
    <span class="rel-v">中</span>
    <span class="rel-n">「行业自律」主题第 3 个地区，可补烟台中介层行为规范空白；正文页受 WAF 限制经渲染核验。</span>
  </div>
</div>
<div class="item" id="it21">
  <div class="ihd">
    <div class="ino">21</div>
    <div class="imain">
      <div class="ititle"><a href="http://zjt.gxzf.gov.cn/zfxxgk/fdzdgknr/wjtz/t28198240.shtml" target="_blank" rel="noopener">广西壮族自治区住房和城乡建设厅关于印发建筑信息模型（BIM）技术应用试点项目经验做法（第三期）的通知</a></div>
      <div class="imeta">
        <span class="m m-src">广西壮族自治区住房和城乡建设厅</span>
        <span class="m m-pub">发布时间：2026-10-09（落款 2026-10-08）</span>
        <span class="m m-field">领域：建筑业管理／数字化（BIM）</span>
        <span class="tag t-cont">延续跟进</span>
      </div>
    </div>
  </div>
  <div class="block">
    <div class="block-t">内容摘要</div>
    <div class="block-b">广西住建厅为深化<b>安全可靠 BIM 技术在工程建设领域全生命周期应用</b>，将试点项目（南宁供电局青秀供电分局应急联动中心，绿色建筑二星级、近零能耗示范）的 BIM 应用经验做法整理印发为<b>第三期</b>，要求各地学习借鉴。</div>
  </div>
  <div class="block blk-change">
    <div class="block-t">变化对比</div>
    <div class="block-b">BIM 主题本系列已有<b>宁夏（竣工 BIM 交付技术导则）、深圳（既有建筑 BIM 建模技术标准）</b>等「标准立规型」条目；广西本件属<b>「试点项目经验做法」批次化推广</b>的阶段性延续（第三期），非新制度立规，故计为「延续跟进」而非「多次出现」。</div>
  </div>
  <div class="block blk-yt">
    <div class="block-t">与烟台现行政策对比</div>
    <div class="block-b"><b>① 烟台是否已有同类政策：</b>烟台绿色低碳与智能建造制度集中在绿色建筑标识认定（烟建节科〔2023〕2号，至 2026-12-09）、装配式（烟政办字〔2019〕54号，已届满未见接续）等，<b>未见市级 BIM 技术应用专项文件或试点经验推广机制</b>（<b>待核实</b>）。<b>② 异同：</b>广西以「试点—经验—推广」路径推动 BIM 落地，烟台在绿色建筑、装配式方面有基础但 BIM 应用缺专项抓手。<b>③ 启示：</b>建议烟台将 BIM 应用纳入绿色建筑、装配式与 AI 辅助招投标的衔接环节，先在政府投资项目开展 BIM 试点并沉淀经验做法，成本可控。</div>
  </div>
  <div class="relbar rel-l">
    <span class="rel-t">与烟台相关度</span>
    <span class="rel-v">低</span>
    <span class="rel-n">经验推广型延续条目，烟台可参考「试点—经验—推广」路径，非紧迫。</span>
  </div>
</div>
'''
rep('<div class="sec-h">二、政策追踪表（多地同类政策对比）</div>', new_items + '<div class="sec-h">二、政策追踪表（多地同类政策对比）</div>')

# ---------- 4) 政策追踪表新增行 ----------
track_rows = '''
<tr>
  <td class="td-topic">智慧工地技术应用（典型应用场景名录式推广）</td>
  <td class="td-prior">住建部长期部署，多地推行智慧工地；本系列曾记录塔机远程控制、智能建造工种机器人等技术规程</td>
  <td class="td-new">天津（第一批智慧工地技术应用典型应用场景，9 个征集场景中遴选 3 个，10-09）</td>
  <td class="td-diff">由「技术规程供给」转向「场景落地示范」，以「征集—评审—名录发布」低成本推广，可类比用于烟台 AI 辅助招投标与智慧工地平台衔接。</td>
</tr>

<tr>
  <td class="td-topic">建筑行业自律与经营秩序规范</td>
  <td class="td-prior">甘肃（监理行业自律管理办法，09-24）、佛山（施工图审查收费行业自律，10-06）</td>
  <td class="td-new">广州（转发规范房屋建筑工程领域经营秩序通知，穗建质〔2026〕590号，10-08）</td>
  <td class="td-diff">由「单一环节自律」（监理／图审收费）扩展到「房屋建筑工程领域经营秩序」整体，覆盖面更广、为第 3 个地区。</td>
</tr>

<tr>
  <td class="td-topic">BIM 技术应用试点经验推广</td>
  <td class="td-prior">宁夏（竣工 BIM 交付标准）、深圳（既有建筑 BIM 建模标准）</td>
  <td class="td-new">广西（BIM 技术应用试点项目经验做法第三期，10-08）</td>
  <td class="td-diff">以「试点项目经验做法」批次化印发推动 BIM 全生命周期应用，属经验推广型，非新制度立规。</td>
</tr>'''
rep('街道赋权执法。</td>\n</tr>\n\n</tbody></table></div>',
    '街道赋权执法。</td>\n</tr>\n' + track_rows + '\n</tbody></table></div>')

# ---------- 5) 附录新增行 ----------
app_rows = '''<tr><td class="ap-no">19</td><td class="ap-name">天津市第一批智慧工地技术应用典型应用场景</td><td class="ap-lv"><span class="lv-m">中</span></td></tr>
<tr><td class="ap-no">20</td><td class="ap-name">广州建筑行业自律规范房屋建筑工程领域经营秩序通知</td><td class="ap-lv"><span class="lv-m">中</span></td></tr>
<tr><td class="ap-no">21</td><td class="ap-name">广西 BIM 技术应用试点项目经验做法（第三期）</td><td class="ap-lv"><span class="lv-l">低</span></td></tr>'''
rep('新乡房屋安全鉴定机构信息登记及动态更新</td><td class="ap-lv"><span class="lv-m">中</span></td></tr>\n</tbody></table></div>',
    '新乡房屋安全鉴定机构信息登记及动态更新</td><td class="ap-lv"><span class="lv-m">中</span></td></tr>\n' + app_rows + '\n</tbody></table></div>')

# ---------- 6) 页脚说明 ----------
rep('采集方式：8 组并行子代理（住建部／重点省份组1／重点省份组2／重点城市／武汉固定信源／其余省份／烟台基准／独立复查兜底），\n    经汇总去重、链接全量实测与溯源交叉核验后成稿。',
    '采集方式：8 组并行子代理（住建部／重点省份组1／重点省份组2／重点城市／武汉固定信源／其余省份／烟台基准／独立复查兜底），\n    经汇总去重、链接全量实测与溯源交叉核验后成稿；并于 2026-10-10 午间完成同日二次复核与补录（新增 3 条），同步修正本期版式。')

open(p, 'w', encoding='utf-8').write(s)
print('done, size=', len(s))