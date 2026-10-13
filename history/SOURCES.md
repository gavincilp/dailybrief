# 信源与通道速查（住建政策每日简报 · 子代理必读）

> 本文件放在仓库 `history/` 下，供**云端任务与本地任务**的子代理共同读取。
> 云端沙箱读不到本机的工作区笔记，凡涉及「官网真实入口 / 不可达站点 / 已破解接口 / 内容校验陷阱」的知识，一律以本文件为准，并**每期复核、按实修正**（本文件随仓库同步）。
> 最后核对日期：2026-10-13

---

## 一、真实入口（任务给定域名常有误，判「不可达」前先探实域）

| 地区 | 实域 | 备注 |
| --- | --- | --- |
| 山东 | `zjt.shandong.gov.cn` | 检索通道 jsearch 索引止于 2019 已失效 |
| 浙江 | `jst.zj.gov.cn` | `zjt.*` 不可达 |
| 四川 | `jst.sc.gov.cn` | |
| 河南 | `hnjs.henan.gov.cn` | 列表可达，DNS 偶发失败 |
| 河北 | `zfcxjst.hebei.gov.cn` | 政策域 |
| 天津 | `zfcxjs.tj.gov.cn` | `zj.tj.gov.cn` 不可达 |
| 江苏 | `jsszfhcxjst.jiangsu.gov.cn` | 主域 `jst.jiangsu.gov.cn` 超时 |
| 青岛 | `sjw.qingdao.gov.cn` | |
| 苏州 | `zfcjj.suzhou.gov.cn` | |
| 宁波 | `zjw.ningbo.gov.cn` | |
| 济南 | `jncc.jinan.gov.cn` | |
| 杭州 | `cxjw.hangzhou.gov.cn` ＋ `fgj.hangzhou.gov.cn` | 双站 |
| 广州 | `zfcj.gz.gov.cn` | 主域曾 DNS 失败 |
| 深圳 | `zjj.sz.gov.cn` | 列表页 HTML 已内联渲染，可直接解析 |
| 武汉 | `zgj.wuhan.gov.cn` | 固定信源，直连 200 无需代理 |
| 宁夏 | `jst.nx.gov.cn` | 原 `zjt.nx.gov.cn` 为**错域** |
| 云南 | `zfcxjst.yn.gov.cn`（备用） | 备用域间歇可达 |
| 吉林 | `jst.jl.gov.cn` | 旧域 000 |
| 辽宁 | `zjt.ln.gov.cn` | |
| 烟台 | `zjj.yantai.gov.cn` ＋ 门户 `www.yantai.gov.cn` | |

## 二、长期不可达 / 半盲区（截至 2026-10-13；每期复核）

- **甘肃** 412（JS 反爬 `$_ts`）；**河北** 412（列表与详情，仅能经渲染取标题＋文号）；
- **青海** 412；**上海** TLS 握手失败（间歇）；**广州** WAF 420（改走备用域）；
- **河南 / 安徽** DNS 偶发失败；**厦门** `js.xm.gov.cn` DNS 失败。
- → 上述站点可作为「低更新期」佐证，但**必须在简报末尾「未获取来源」清单列明**（网站名＋链接＋原因），不得跳过。

## 三、已破解接口（省时关键）

- **住建部**：索引页为 JS 壳 → JPAAS 接口
  `.../front/page/build/unit?...&webId=86ca573ec4df405db627fdc2493677f3&tplSetId=fc259c381af3496d85e61997ea7771cb&pageType=column&tagId=<栏目-list|内容1>&editType=null&pageId=…`，curl 加 `--compressed`；首页 `<meta MakeTime>` 可直接读。
- **JPAAS 通用**：浙江 webId=3162、tplSetId=ruXYFpsVFzDi3ZOOn2U3E，**必须带 `editType=null`**；tagId 因栏目而异（建设动态/市县新闻/其他文件用「栏目列表list」，政策文件/标准公告/公告公示/民意征集用「当前栏目列表1a」）。宁波为 jQuery 序列化 GET（webId=3516、tplSetId=dzPj91zLBJ8Wn1v1VPH5n，非 queryData 包裹）。
- **山东**：xxgk 接口 `POST /module/xxgk/search.jsp`（infotypeId：通知公告 SD1002／工作动态 SD1003／政策文件 SD0202／政策解读 SD020207…；jdid=407、divid=div160091、currentnum=1）；规范性文件独立栏 `GET /col/col293162/index.html?vc_xxgkarea=113700000045030270`。
- **江苏**：`POST /module/xxgk/search.jsp`（jdid=34、divid=div52043、currentnum=1，**须带完整浏览器头**）。
- **湖北** `zcwj.json` 接口；**湖南** 通知公告静态页 ＋ 省级搜索 API；**江西** `POST /queryList`（文章 `/{channel}/pc/content/content_{id}.html`）；**辽宁** 首页 `ywlist`。
- **烟台 zjj**：JCMS GET（webId=179、tplSetId=GC2egDexn2qAbtVty6wAZ），tagId 须为「当前栏目list」；翻页把 `pageNo` 嵌入 `paramJson={"pageNo":2,"pageSize":10}`；**接口 `pageId` 必须为纯数字**（如 22907，带 `col` 前缀返回 `success:false`）；政策文件栏 col22907。
- **烟台市政府门户**：webId=1、tplSetId=uo2n7cvvGR8iPKdzxdBuu；正确列 ID：市政府文件 col99959、市府办文件 col99961（勿用 99954/99955）。门户列页面会间歇重定向首页 → 改用 API 或文章页加 `?t=时间戳`。文件正文实体多为 PDF，其 `<meta PubDate>` 为 CMS 迁移时间，**不可作发布时间**。

## 四、内容校验陷阱

- **上海**：政策文件栏发布日期是**挂网日期**，须核对正文文号＋落款；文件页 `<title>` 仅栏目名，不能据以判标题一致性。
- **广东地市**（佛山 `fszj.foshan.gov.cn`、中山 `jsj.zs.gov.cn`）：正文页 `<title>` 仅「XX市住房和城乡建设局」，标题一致性须以**正文主体**核对。
- **同一文件双门户重复挂网**（东莞 `zjj.dg.gov.cn` 与 `www.dg.gov.cn`）→ 按文号/文件名比对，**不看 URL**。
- **范围外城市域名陷阱**：无锡／南通／扬州／泰州／聊城的 `zjj.*` 域名**实际归属非住建局**，勿误采。
- **广西** https 502 → **须用 http**（根域 gxcic.cn 非 gov.cn，不可用）；**贵州** TRS-IRS 会返回「系统错误」→ 改 IGI 接口；**海南** 通知公告为 iframe 嵌套；**山西** 征意栏链接用单引号 `href='./202610/t…shtml'`；**云南** 页面 gzip 未声明 Content-Encoding，须先 `gzip.decompress()` 再解析，否则标题乱码致校验误判。
- 政务门户「调查征集」页多为**表单壳页**（200 无正文）→ 检索同域 `/IGI/upload/file/` 下 docx/pdf 附件。

## 五、必守铁律

1. **来源只能是 gov.cn 住建部门官网原文**，禁新闻/门户/自媒体/聚合站转载（内容相同亦不可用）；找不到 gov.cn 原文宁可放弃该条。
2. **每一条必须可溯源至子代理报告的原文链接**。严禁凭领域常识补写主题、或按栏目路径规律拼装 URL。
3. 生成后**双重核验**：① 全量链接实测（状态码＋标题一致性）；② 把 HTML 内每条 `<div class="ititle">` 链接与子代理报告交叉比对（这一步是充分条件）。
4. 判断「是否已收录」一律按**文号／标题**比对，不依赖 URL。
5. **列表页只能由 `history/build_brief_list_cloud.py` 数据驱动生成，严禁手改 HTML**；改完必须同步 `history/issues_index.json` 并 `cp 住建简报列表.html index.html`。
