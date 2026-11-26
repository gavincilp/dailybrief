# 信源与通道速查（住建政策每日简报 · 子代理必读）

> 本文件放在仓库 `history/` 下，供**云端任务与本地任务**的子代理共同读取。
> 云端沙箱读不到本机的工作区笔记，凡涉及「官网真实入口 / 不可达站点 / 已破解接口 / 内容校验陷阱」的知识，一律以本文件为准，并**每期复核、按实修正**（本文件随仓库同步）。
> 最后核对日期：2026-11-23

---

## 一、真实入口（任务给定域名常有误，判「不可达」前先探实域）

| 地区 | 实域 | 备注 |
| --- | --- | --- |
| 山东 | `zjt.shandong.gov.cn` | 检索通道 jsearch 索引止于 2019 已失效；**xxgk `search.jsp` 本期返回「共0条记录」、`/module/xxgk/tree.jsp` 与 `dynamic.js` 均 404** → 省级政策文件改走首页「政策文件」静态栏＋RSS |
| 上海 | `zjw.sh.gov.cn` | **任务常用的 `zjw.sh.cn` 系误域**；政策文件栏标题/日期须核正文文号＋落款 |
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
| 武汉 | `zgj.wuhan.gov.cn` | 固定信源，直连 200 无需代理；「五改四好」专题 `/ztzl/wgshcsgx/` 实为 JS 跳转壳页（74B）→ 真实政策目录取 `/ztzl/wgshcsgx/zcwj_csgx/`；**长期漏采盲区：市府规范性文件（武政〔2026〕X号）藏在 `/xxgk/zcfgyjd_1/qtzdgkwj/` 的动态 JSON 列表（约 110 条）里，任何静态栏目都不列**，须直读该 JSON |
| 安徽 | `dohurd.ah.gov.cn` | **`zjt.ah.gov.cn` 为错域（000）**；列表接口 `/site/label/8888?labelName=publicInfoList&siteId=6804621&organId=6991&catId=<栏目ID>`（须带 Referer＋X-Requested-With） |
| 贵州 | `zfcxjst.guizhou.gov.cn` | **`zjt.guizhou.gov.cn` DNS 不解析（000）**；政策文件 `/zwgk/zcwj/` 经 meta Refresh 跳 `/zwgk/zcwj/zxwj/`；公告公示栏 JS 壳页 |
| 临沂 | `lyjs.linyi.gov.cn` | 列表页静态含日期，但**列表日期≠详情发布日期**（实例：列表 10-15、详情 `<发布日期>` 10-12），须逐条打开详情 |
| 南京 | `fcj.nanjing.gov.cn` | 住建职责在**住房保障和房产局**（非 zjj/jsj）；新闻列 `./dtxx/zwdt/`、`./dtxx/mtdt/`（相对链接须补域根） |
| 东莞 | `zjj.dg.gov.cn` | gkmlpt 为 Vue 渲染（接口 404/405）；**门户镜像 `www.dg.gov.cn` 亦不可用** → 该市本期难以核验 |

| 宁夏 | `jst.nx.gov.cn` | 原 `zjt.nx.gov.cn` 为**错域** |
| 云南 | `zfcxjst.yn.gov.cn`（备用） | 备用域间歇可达 |
| 吉林 | `jst.jl.gov.cn` | 旧域 000 |
| 辽宁 | `zjt.ln.gov.cn` | |
| 青岛 | `sjw.qingdao.gov.cn` | 独立 TRS 站：通知公告 `/cxjsj1/cxjsj35`、工作动态 `/cxjsj1/cxjsj36`（列表项内联渲染，日期格式 `[YYYY-MM-DD]`）；门户 `gkml` 仅作镜像（285B JS 壳页） |
| 烟台 | `zjj.yantai.gov.cn` ＋ 门户 `www.yantai.gov.cn` | 门户规范目录主栏为 **col43171**（tagId=「当前栏目列表」）；`col99947`/`col11807` 返回「模版内容不能为空」 |

## 二、长期不可达 / 半盲区（截至 2026-10-15；每期复核）

- **甘肃** 412（JS 反爬 `$_ts`）；**河北** 412（列表与详情，仅能经渲染取标题＋文号；首页 200）；
- **广东省住建厅 `zfcxjst.gd.gov.cn`**：HTTPS(443) TLS 握手停滞、HTTP(80) 返回 Empty reply（curl exit 52），三个 A 记录均失败 → **本沙箱出口不可达，判定为间歇性/出口 IP 相关故障**（10-14/10-15 期曾可用），须每期复查；
- **青海** 412（间歇）；**上海** TLS 握手失败（间歇）；**广州** WAF 420（IP 级黑名单，`gkmlpt` 子系统亦 420）；
- **黑龙江** 420（根域偶发 200、子路径稳定 420）；**2026-11-08 复测：子路径转为 TLS 直接断开 / ReadTimeout，非 420** → 两期连续不可达，改经省级政府门户 `www.hlj.gov.cn` 政策库反查；**成都** `cdzj.chengdu.gov.cn` 412；
- **河南 / 安徽** DNS 偶发失败；**厦门** `js.xm.gov.cn` DNS 失败；
- **常州** `zjj.changzhou.gov.cn` 000（连接超时）；**绍兴／泉州／洛阳／襄阳／宜昌／绵阳／大连／唐山／株洲** 住建局域本沙箱 DNS 无法解析；**芜湖** 420；

- **新疆** `zjt.xinjiang.gov.cn` 列表页标题由前端 JS 异步填充（`<a>` 无 title 文本，须逐条打开详情页读 `meta ArticleTitle`）；**内蒙古** `/zwgk/zcwj/` 政策文件目录为 JS 渲染壳页（仅通知公告栏可读）；
- **上海**「主动公开文件」`/zdgk/index.html` 为 JS 分页壳页（仅取回首页 10 条，未逐页翻取）；
- **东莞** `zjj.dg.gov.cn/gkmlpt/` 为 Vue 前端渲染（api 参数未知返回空）→ 改用门户镜像 `www.dg.gov.cn` 替代核验。
- → 上述站点可作为「低更新期」佐证，但**必须在简报末尾「未获取来源」清单列明**（网站名＋链接＋原因），不得跳过。

### 协议降级通道（2026-10-15 复证实证）

- **山东** `https://zjt.shandong.gov.cn`（解析 IPv6）返回 **000** → 改 **http://** 明文端口 200 正常；xxgk 接口 `POST /module/xxgk/search.jsp` 经 http 可用。
- **湖南** `zjt.hunan.gov.cn`、**江西** `zjt.jiangxi.gov.cn`：**HTTPS(443) 不可建连**（湖南 TLS 握手停滞；江西 `unsafe legacy renegotiation disabled`）→ **HTTP(80) 正常**。
- **云南** `zfcxjst.yn.gov.cn` 正文页 gzip 未声明 Content-Encoding，须先 `gzip.decompress()` 再解析。

## 三、已破解接口（省时关键）

- **住建部**：索引页为 JS 壳 → JPAAS 接口
  **正确路径（2026-10-15 实测）** `.../api-gateway/jpaas-publish-server/front/page/build/unit?...&webId=86ca573ec4df405db627fdc2493677f3&tplSetId=fc259c381af3496d85e61997ea7771cb&pageType=column&tagId=<栏目-list|内容1>&editType=null&pageId=…`，curl 加 `--compressed`。
  ⚠️ 旧路径 `/front/page/build/unit`（无 `api-gateway/jpaas-publish-server` 前缀）**已失效，返回 404/400**。栏目标题须强制 UTF-8 解码 `response.content`（壳页声明 ISO-8859-1，直接解码会把 tagId 乱码化导致接口返回空）。首页 `<meta MakeTime>` 可直接读。
  ⚠️ **`pageId` 不能凭规律填数字（2026-10-16 复证）**：栏目页内置 `queryData` 中的 `pageId` 为**哈希串**（政策文件库 `vhiC3JxmPC8o7Lqg4Jw0E`、工作动态 `919e942639b5477d96e4c97471c61d9f`）。误填数字（如 2107）→ 返回 `{"success":false,"code":"200","data":{}}`。**正确做法：先 curl 栏目 `index.html`，正则提取 `queryData="...pageId:'XXX'...tagId:'YYY'"`，再用该 pageId+tagId 调接口**。
  ⚠️ **文件库列表「发文日期」≠挂网时间（2026-10-16 复证）**：同一条《施工安全监督书电子证照标准》列表发文日期显示 10-10，`<meta PubDate>` 实为 10-15 10:00。**判定窗口内新增必须逐条打开详情页读 `<meta PubDate>`**，不能只看列表「发文日期」。
  栏目实测口径：`/gongkai/zc/wjk/` 政策文件库、`zqyj` 标准征求意见、`bzgg` 标准公告。
  ⚠️ 住建部本级**不设独立司局子栏目**，`/jigou/...`、`/sitemap.xml` 等路径 404，勿按规律拼装。

- **JPAAS 通用**：浙江 webId=3162、tplSetId=ruXYFpsVFzDi3ZOOn2U3E，**必须带 `editType=null`**；tagId 因栏目而异（建设动态/市县新闻/**其他文件**用「栏目列表list」，政策文件/标准公告/公告公示/民意征集用「当前栏目列表1a」）。宁波为 jQuery 序列化 GET（webId=3516、tplSetId=dzPj91zLBJ8Wn1v1VPH5n，非 queryData 包裹）。
  **2026-10-16 实测补充（浙江）**：①首页/栏目页**须带浏览器 User-Agent**，裸 curl → 403；②接口路径须为 `/api-gateway/jpaas-publish-server/front/page/build/unit`，**`pageId` 须纯数字**（不带 `col` 前缀）、**`tagId` 须 URL 编码**（中文未编码返回 404）、须带 `parseType=bulidstatic`；③**征求意见类条目的正文链接须用 `jpaas-jsurvey-web-server`（非 `jpaurvey-web-server`）**：`http://jst.zj.gov.cn/api-gateway/jpaas-jsurvey-web-server/front/dczj/showJsurveys.do?formId=<formId>`；用错前缀返回 404。公告公示栏（col1229165367）用 `当前栏目列表1a`。
  **2026-10-16 实测补充（宁波）**：列页 `queryData` 内含**纯数字 pageId**——通知公告 1229322076／最新文件 1229325543／政策解读 1229325563，配 `tagId=zjj_相关内容` 才返回数据；直接用首页 tagId（如 `zjj_通知公告`）返回 `success:false` 空。
- **济南 JCMS**：webId=19、tplSetId=DuKGsvX0nYD3oa3O9M4Y2、tagId=「当前栏目信息列表」；通知公告 pageId=40602、工作要闻 40601；意见征集 col42446 返回空。
  **2026-10-31 实测补充（教训：10-31 期漏采济建发〔2026〕41号）**：①`/col/col40602/index.html` 是 JS 空壳（4589 B，无条目），curl 直取必空，必须调 JPAAS；②**调用必须带 `paramJson={"pageNo":1,"pageSize":30}`（URL 编码）**，不传该参数时接口只返回 15 条且混入 2026-01 旧条目（排序按"置顶"优先，日期乱序），窗口内新文极易被挤出视野 → **建议 pageSize≥30 并逐条读日期后再判窗口**；③列表条目结构为 `<li><a href title>TEXT</a><span class="f_right">YYYY-MM-DD</span></li>`（与烟台 `<a class="fl">` 结构不同，切勿套用同一正则）；④详情页 `<meta name="PubDate">` 精确到分钟（如 41号=2026-10-30 21:59），晚于列表日期的条目以 PubDate 为准；⑤站点证书链不完整，requests 需 `verify=False`、Playwright 需 `ignore_https_errors=True`，否则 `ERR_CERT_AUTHORITY_INVALID`；⑥`dataproxy.jsp` 返回 403，不可用。
  另：**工作要闻 40601 前两条为 mp.weixin.qq.com 外链**（非 gov.cn 原文），按来源铁律不采，但需注意其条目占比。
- **杭州双站**：cxjw 最新政策/通知在 `/col/col1692623/art/2026/…`（**首页 title 已内联，可直接抓 art 链接，无需调 JPAAS**）；`fgj.hangzhou.gov.cn` 同理可读（房产交易 col1229265248、通知公告 col1229243551）。
- **青岛 TRS 正则**：列表页 `<li trs-attr="chip">` 内联渲染，正则 `<a ... href="..." title="...">.*?div_list_li_width_right'>[YYYY-MM-DD]`；通知公告 `/cxjsj1/cxjsj35`、工作动态 `/cxjsj1/cxjsj36`。
- **深圳内联列表**：`<li><a title="..."><span>YY-MM-DD</span></li>`，**日期为两位年（26-10-15）**；`index_1.html` 分页 404，默认列表已含近 20 条。

- **山东**：xxgk 接口 `POST /module/xxgk/search.jsp`（infotypeId：通知公告 SD1002／工作动态 SD1003／政策文件 SD0202／政策解读 SD020207…；jdid=407、divid=div160091、currentnum=1）；规范性文件独立栏 `GET /col/col293162/index.html?vc_xxgkarea=113700000045030270`。
- **江苏**：`POST /module/xxgk/search.jsp`（jdid=34、divid=div52043、currentnum=1，**须带完整浏览器头**）。
- **湖北** `zcwj.json` 接口；**湖南** 通知公告静态页 ＋ 省级搜索 API；**江西** `POST /queryList`（文章 `/{channel}/pc/content/content_{id}.html`）；**辽宁** 首页 `ywlist`。
- **烟台 zjj**：JCMS GET（webId=179、tplSetId=GC2egDexn2qAbtVty6wAZ），tagId 须为「当前栏目list」；翻页把 `pageNo` 嵌入 `paramJson={"pageNo":2,"pageSize":10}`；**接口 `pageId` 必须为纯数字**（如 22907，带 `col` 前缀返回 `success:false`）；政策文件栏 col22907。
  **2026-10-16 实测修正**：路径须带前缀 **`/api-gateway/jpaas-publish-server/front/page/build/unit`**（只写 `/front/page/build/unit` 会回落到首页模板 11212B 壳页），且须带 `parseType=bulidstatic`。栏目页 HTML 本身为 JS 壳页（无内联条目），日期/标题须经该接口取回。
  **踩坑**：烟台 烟建住房〔2026〕16号（2026-10-15 预售资金监管细则）正文为 **24 页扫描版 PDF（无文字层）**，条款无法核读，只能核实标题/文号/发布日期。
  **2026-11-08 口诀（tagId 大小写敏感）**：局站 `zjj.yantai.gov.cn` 用 **「当前栏目list」**（小写 l）；市政府门户 `www.yantai.gov.cn` 用 **「当前栏目列表」**（中文「列表」）。两者均须 `pageType=column` ＋ `editType=null`，且 `paramJson` 必须是**无空格紧凑 JSON**，否则返回 `success:false`。
- **烟台市政府门户**：webId=1、tplSetId=uo2n7cvvGR8iPKdzxdBuu；正确列 ID：市政府文件 col99959、市府办文件 col99961（勿用 99954/99955）。门户列页面会间歇重定向首页 → 改用 API 或文章页加 `?t=时间戳`。文件正文实体多为 PDF，其 `<meta PubDate>` 为 CMS 迁移时间，**不可作发布时间**。

## 四、内容校验陷阱

- **上海**：政策文件栏发布日期是**挂网日期**，须核对正文文号＋落款；文件页 `<title>` 仅栏目名，不能据以判标题一致性。
- **广东地市**（佛山 `fszj.foshan.gov.cn`、中山 `jsj.zs.gov.cn`）：正文页 `<title>` 仅「XX市住房和城乡建设局」，标题一致性须以**正文主体**核对。
- **同一文件双门户重复挂网**（东莞 `zjj.dg.gov.cn` 与 `www.dg.gov.cn`）→ 按文号/文件名比对，**不看 URL**。
- **范围外城市域名陷阱**：无锡（`zjj.wuxi.gov.cn` 实为**民族宗教事务局**）／泰州（`zjj.taizhou.gov.cn` 实为**市政府**）／扬州／聊城的 `zjj.*` 域名**实际归属非住建局**，勿误采；
  **反例（勿误判）**：南通住建局真域为 `zj.nantong.gov.cn`（**不是** `zjj.*`），可用；**台州与泰州同为 `zjj.` 前缀、易混**，采前必核站点标题是否含「住房和城乡建设」；
  **威海**：`zjj.weihai.gov.cn` 出现 **302 循环镜像**（形如武汉旧态），跟随时须限深 3 跳并保留原始 Referer。
- **广西** https 502 → **须用 http**（根域 gxcic.cn 非 gov.cn，不可用）；**贵州** TRS-IRS 会返回「系统错误」→ 改 IGI 接口；**海南** 通知公告为 iframe 嵌套；**山西** 征意栏链接用单引号 `href='./202610/t…shtml'`；**云南** 页面 gzip 未声明 Content-Encoding，须先 `gzip.decompress()` 再解析，否则标题乱码致校验误判。
- 政务门户「调查征集」页多为**表单壳页**（200 无正文）→ 检索同域 `/IGI/upload/file/` 下 docx/pdf 附件。

## 五、必守铁律

1. **来源只能是 gov.cn 住建部门官网原文**，禁新闻/门户/自媒体/聚合站转载（内容相同亦不可用）；找不到 gov.cn 原文宁可放弃该条。
2. **每一条必须可溯源至子代理报告的原文链接**。严禁凭领域常识补写主题、或按栏目路径规律拼装 URL。
3. 生成后**双重核验**：① 全量链接实测（状态码＋标题一致性）；② 把 HTML 内每条 `<div class="ititle">` 链接与子代理报告交叉比对（这一步是充分条件）。
4. 判断「是否已收录」一律按**文号／标题**比对，不依赖 URL。
5. **列表页只能由 `history/build_brief_list_cloud.py` 数据驱动生成，严禁手改 HTML**；改完必须同步 `history/issues_index.json` 并 `cp 住建简报列表.html index.html`。

### 2026-11-09 期新增／修正（第 73 期实测）

- **海南**：质量安全栏真实入口 `/szjt/0407/list2.shtml`（静态列表，日期内联，详情 `<meta PubDate>` 精确到秒）。**陷阱：通知类正文落款可早于挂网日 5—9 天**（实例：11-08 21:38 挂网、落款 10-30），时间须双记。
- **陕西**：公告公示真实路径 **`/sy/zcwj/gsgg/`**（`/sy/zcwj/gggs/` 为 404，勿凭语序拼装）。附件常为 **Word 97-2003 二进制 .doc**（沙箱无 antiword，可用 `olefile` 读 `WordDocument` 流后按 utf-16-le 解码取正文）。
- **山东**：本期 https 与 http **均为 502**（11-05 前 http 可读）；首页可读时 `Maketime` 可作「最后静态化时间」佐证，但 `col102884/102885` 壳页自身 Maketime 滞后，不可单独据此判零新增；`/rss/` 404，删除「RSS 通道」表述。
- **广东**：本期 https／http 均 200，应从「长期不可达」降级为「间歇性，每期首探」；文件通知栏 `/xxgk/wjtz/index.html` 静态内联约 15 条**无列表日期**，日期须读详情 `<meta PubDate>`；`/xxgk/gsgg/` 为壳页。
- **湖北**：`/zfxxgk/zc/qtzdgkwj/zcwj.json` 达 **1 576 条／1.2 MB**，可直接取前 N 条判窗口（字段 `PUBDATE`）；规范性文件 `gfxwj/zcwj.json` 仅 169 条。
- **江西**：`/queryList` 恒返 0，改读各栏 `-articleList.json`（`pubDate` 精确到分钟，`metadata.xxgk_filenumber` 为文号）。
- **武汉**：`/xxgk/zcfgyjd_1/qtzdgkwj/zcfg.json` 110 条可直接枚举，字段 `DOCRELTIME／FILENUM／FILENAME／URL`；**注意其时间字段为文件成文日，URL 年月才是挂网月份**。
- **深圳**：https 全线 **502**（含首页与 `/xxgk/tzgg/`），本期未能核验。
- **黑龙江**：`zjt.hlj.gov.cn` 连续第三期不可达（TLS 后读超时）；可用域 **`zfcxjst.hlj.gov.cn`**，栏目码 公示公告 `c114764`／文件通知 `c114765`／住建厅要闻 `c114759`／政策解读 `c114792`。
- **天津**：通知公告页正文为 `var item_<id> = {title, fileNum, url, doctime};` 内联全量数组（1 711 条），可正则直解，无需翻页。
- **住建部**：先读首页 `<meta name="MakeTime">`，与上期同值即可快速判定「部本级无更新」，再决定是否调 JPAAS，可省 5—8 次请求。

### 2026-11-11 期新增／修正（第 75 期实测）

- **福建**：真实文件路径须按列表页相对路径解析——`/xxgk/zxwj/` 列表项形如 `../zfxxgkzl/xxgkml/xzxk_3797/202611/t20261110_7246830.htm`，**直接改写为根路径 `/zfxxgkzl/…` 或 `/xxgk/zxwj/202611/…` 均返回 404（实测均为 2 字节空响应）**，只有保留 `../` 的原始相对路径 200 且正文可读。采前务必从列表页原样取 href。
- **浙江**：「其他文件」栏（col1229129246）tagId 实为 **「栏目列表list」**（用「当前栏目列表1a」返回「模版内容不能为空」）；政策文件 col1229159074 用「当前栏目列表1a」正常。**公告公示 col1229165367 页面与接口均只返回机构介绍条目，无公告列表** → 该栏本期仍无法核验。
- **辽宁**：`/zjt/tfwj/cswj/<id>/index.shtml` 详情页正文可直接从页面主体解析（无 iframe），`<meta PubDate>` 仅到日。
- **青海**：通知公告栏部分条目**直接挂 PDF**（如 `/xwdt/tzgg/202611/P020261110580351211321.pdf`），正文为扫描件无文字层，须 `pdftoppm` 转图后逐页目视核读；**务必核对末页印发日期与正文落款**（本期落款 2026-09-08、挂网 2026-11-10，相差 2 个月）。
- **安徽**：通知公告 `/wjgk/tzgg/<id>.html` 静态可读，正文在 `id="zoom"`；无独立文号的名单类文件以「征集通知文号」为上位依据。
- **烟台**：政策法规栏（col22907）**新设子栏 `col22894《城市更新》`（同栏目体例，30 条）**，须纳入常态巡检；该栏详情页正文常为壳页，正文可能在页面内嵌 `var pdfUrl`（烟更指发〔2021〕2／4号 即此），取 `pdfUrl` 指向的 `/cms_files/jcms1/web179/site/attach/…pdf` 解析。**11-10 中央补助资金办法正文区为空壳且无 pdfUrl，仅有门户 col43370 文字解读。**
- **湖北**：`zfcxjst.hubei.gov.cn` 仍 DNS 000，只用 `zjt.hubei.gov.cn`。
- **湖南**：通知公告列表页为 `top.location.replace()` 跳转壳（110 B），**改走省级搜索 API** `http://api.hunan.gov.cn/search/common/search/12d27704986d4b7cb6e8bf259a3f61ba`（POST，datas 参数同 list_all.js）。
- **广州**：本期**恢复 200**（此前 WAF 420），部门文件栏 `/zwgk/xxgkml/bmwj/qtwj/` 最新 03-11。
- **深圳**：本期 https **200 可达**（上期全线 502）。
- **东莞**：gkmlpt 为 Vue 渲染，但已破 **JSONP 通道 `postmeta/g/795_1.js`／`796_1.js`**（取回 100 条），不再是盲区。
- **沈阳／大连**：`zjj.shenyang.gov.cn`、`zjj.dl.gov.cn`、`zfcxjw.shenyang.gov.cn`、`jsj.dl.gov.cn`、`zfcxjsw.dl.gov.cn` 全部 DNS 000；两市门户 `www.shenyang.gov.cn`／`www.dl.gov.cn` 200 但无住建局栏目直链 → 两市仍为盲区。
- **河北**：列表与详情全 412（curl 与 Playwright 真实 Chromium 均 412），仅首页内联栏可读，持续按「未获取来源」记录。
- **甘肃**：412 持续不可达。

### 2026-11-23 期新增／修正（第 87 期实测）

> **本期教训（经复盘更正，务必按更正版执行）**：初版归因为「滚动 24 小时造成 10 小时盲区」，**该结论错误，已作废**。实际情况：5 条补位件（南宁 438号 与联合抽查、银川质量与巡查整改、佛山租赁通报）挂网于 **11-20 16:39—17:28**，**落在第 85 期（11-21）窗口「11-20 00:00 — 11-21 07:30」之内**——窗口并未失覆盖，是**筛选漏采**：同批 6 件中第 85 期只采到北京 555号，其余 5 件因属「范围外城市兜底」组、当期该组未覆盖到位而遗漏。**责任期次是第 85 期，不是第 86 期。**
>
> **★ 判重已由「人工记忆」改为「脚本门禁」（2026-11-23 上线）。** 新增 `history/verify_brief.py`，在每次 push 前强制运行：`python3 history/verify_brief.py --file 住建动态简报_YYYY-MM-DD.html`，**退出码非 0 不得发布**。它把本期条目与全部历史期次按「文号细键（含机关代字）→标题指纹→文号粗键＋标题相似度」三级比对，同时校验页头统计一致性、条目编号、div 平衡、`tracking.json` 重复建档。**任何「回溯补位／疑似漏采」件仍须以文号在历史 `ititle` 中留痕，脚本即该留痕的强制形式。**
>
> **★ 最严重教训——判重失效（已于第 87 期定稿前修正）。** 第 87 期初稿把北京 京建发〔2026〕555号 当作「漏采补位」再次收录并标【首次出现】，**实为第 85 期已作为第 2 条完整收录的第 2 次进正文**。失误链条：①只对河南 豫建科〔2026〕168号 做精确文号比对并剔除，**同批其余 5 件未做文号级比对**；②用「11-20 下午挂网＝第 86 期盲区」的**整体推断替代逐条检索**；③子代理「北京 555号 可能漏采」提示被**直接采信**。**铁律（必须执行）：任何「回溯补位／疑似漏采」件入正文前，必须以文号＋标题在全部历史简报的 `<div class="ititle">` 中做精确检索并留痕；子代理的漏采提示一律视为「待核线索」，不得直接采信。** 同时：`tracking.json` 建档前必须先查是否已有同文件主题（本期曾重复建档，已回滚）。窗口口径仍建议「按发布日期倒查 3 个自然日」，理由是覆盖面而非本期根因。

- **杭州**：`cxjw.hangzhou.gov.cn` **栏目页已变为空壳页（10.5 KB）**，「首页 title 内联可直接抓 art 链接」的旧结论**作废**；改调 JPAAS：webId=3232、tplSetId=zSjHGhwwTGtHWwuV6OwMD、tagId=**国务院List**、pageId=1692623，条目正则 `exchange_content_item_time`。`fgj.hangzhou.gov.cn` 房产交易栏 `col1229265248` 仍是 `location.href` 回首页壳页（1.8 KB）。
- **宁波**：条目结构为 `<a class="label-text">` ＋ `<div class="time">`（**与杭州 `<li>` 结构不同**）；本期 `totalRecord` 非 0，接口正常（上期「恒返 0」为间歇）。
- **上海**：`/zdgk/index.html` **单页 10 条常为同日批量发布**，判零新增必须并读 `index_2.html`（第 2 页），否则会误判「全站最新＝11-13」。
- **深圳**：政策法规栏是**表格**结构（`td.t3` 日期 ＋ `td.wh.t4` 文号），**不是** `<li><span>YY-MM-DD</span>`；`/xxgk/tzgg/` 实测 **302 回首页镜像**，真实通知列表未暴露。
- **山东**：`search.jsp` 返回「共 1980 条」却**无任何条目行**（十种参数组合均如此），该接口**账面可用、实际不可用**；https 持续 502、http 200（首页 `Maketime` 11-23 01:40，说明站点在运行）。
- **江苏**：xxgk 接口各 infotypeId **全部返回「共 0 条」**，须**留空** infotypeId 才返回全站 1866 条（无法按栏目切分）。
- **安徽**：`/site/label/8888` **只传 catId 会恒返「系统繁忙」（31 B）**；须按页面 `action=list` 的**全参数**（含 `catIds`、`file=/jh4/zjt/xxgk/publicInfoList_newest2022`）调用；栏目树在 `/6804621/6991.js`。
- **江西**：`-articleList.json` 已 **404**；改读列表页 HTML 内嵌 **`var articleList`**（可取文号与 pubDate）。
- **湖南**：栏目目录 403；首页「页面生成时间」可作零新增佐证（本期 11-21 13:47:55）。
- **四川**：`tonggao/`、`gongshitg/` 目录 **403**，`c101416` 等栏目已 404；可读列表为 `c101428/article_list.shtml`（分页 `_2`）。
- **河北**：https 首页 **200 可读**（http 302→https），但**栏目与详情仍全 412**；首页内联仅能作「有无新增」定性判断，**任何河北条目须详情可读方可入简报**。
- **黑龙江**：须用 `/zfcxjst/c114764/public_list.shtml`，直接 `/c114764/` 返 403。
- **山西**：实域 `zjt.shanxi.gov.cn`（任务书 `zjj.*` 为 NXDOMAIN）。
- **内蒙古**：`/zwgk/zcwj/` 404，改 `/zwgk/zcfg/`。
- **南宁**：`zjj.nanning.gov.cn` 政策文件栏 `/xxgk/fdzdgknr/zcwjcx/` 可读（详情页 `<title>` 带栏目前后缀，标题比对须去尾缀）；市场管理栏 `/dtzx/tzgg/scgl_37653/`。
- **银川**：子站 `zjj.yinchuan.gov.cn` 不可达；改**银川市政府门户** `www.yinchuan.gov.cn` 住建局信息公开（`/xxgk/bmxxgkml/szjj_2202/xxgkml_2205/bmqtwj_2213/`），**页面同时有「成文日期」与「发布日期」两个字段，须双记**（本期巡查整改通知成文 11-16、挂网 11-20）。
- **佛山**：`fszj.foshan.gov.cn/zwgk/txgg/content/post_*.html`，`<title>` 仅站名，标题在 `<meta ArticleTitle>`（**含 `<br/>` 需清理**）。
- **北京**：规范性文件栏 `/bjjs/xxgk/zcwj2024/gfxwj40/xxyx/`；**详情页 `_yfx_pubtime` 为挂网日、正文落款为成文日**，两者常差 2 日；`<meta PubDate>` 只到日。
- **烟台**：**站内检索 `jsearch/search.do` 关键词不生效**（返回全站信息流，「保租」命中 0 次），**不可作为任何结论的证据**（第 2 期确认）；必须走栏目接口。门户 col43171 接口 `paramJson` 须紧凑 JSON。
- **雅安／泰州**：泰州住建局真实域名 **`jsj.taizhou.gov.cn`**（200，站点标题含「住房和城乡建设」），**`zjj.taizhou.gov.cn` 为市政府**——两者易混，务必核站点标题。
- **domains 陷阱补记**：无锡 `zjj.wuxi.gov.cn`＝民族宗教事务局；扬州、聊城 `zjj.*` 亦非住建局；台州与泰州同 `zjj.` 前缀易混。

### 2026-11-24 期新增／修正（第 88 期实测）

- **住建部：JPAAS 文件库接口存在索引滞后（★重要）**。本期首页 `<meta MakeTime>` 已由 11-21 00:01:12 重建为 **2026-11-23 19:14:53**，但政策文件库接口（pageId=`vhiC3JxmPC8o7Lqg4Jw0E`）最新仍停 11-19；首页「政策发布」栏内联的 11-23 18:30 燃气执法案例通知，接口以 pageSize=10／30 两种参数均未返回。**判零新增须「接口＋首页内联＋详情页 PubDate」三读，不能只看接口最新日期。**
  - 补：首页内联可正则提取 5 类政策性文件直链（`/gongkai/zc/wjk/art/...`），逐条读 `<meta PubDate>` 即可确认是否在窗口内（本期 4 条首页高亮政策件 PubDate 分别为 11-11、10-23、10-26、10-15，均在窗口外）。
  - 征求意向栏 `/gongkai/fdzdgknr/zqyj/` 列表显示的是**截止日期**（12-15），不是发布日期，勿误判为新件。
- **深圳**：`zjj.sz.gov.cn/xxgk/tzgg/content/post_*.html` 详情页 `<meta ArticleTitle>`／`<meta PubDate>`（精确到分钟）可读；清单页 `index_1.html` 仍 404，首页默认列表约 21 条。政策法规栏为表格结构（`td.t3` 日期＋`td.wh.t4` 文号）。
- **佛山**：`fszj.foshan.gov.cn/zwgk/zcwj/jsgc/content/post_*.html` 为「部门规范性文件」栏（废止类通知在此，非 `/zwgk/txgg/`）；`<meta ArticleTitle>` 含 `<br/>` 需清理；`<title>` 仅站名。
- **中山**：`jsj.zs.gov.cn/zwgk/gggs/content/post_*.html`，`<meta ArticleTitle>`／`PubDate` 可读；文号在正文首行「文号：中建通〔2026〕98号」，`<title>` 仅站名。
- **贵州**：`zfcxjst.guizhou.gov.cn/zwgk/zcwj/zxwj/<yyyymm>/t<id>.html` 正文常仅一段「现印发给你们」，**制度条款在附件 docx**（`./P0<id>.docx` 相对路径）；可用 `zipfile` 读 `word/document.xml` 去标签取全文。
- **宁波**：「其他文件」栏 col1229325543 的 `<meta PubDate>` 可能与列表日期差 1 日（甬建发42号列表 11-20、PubDate 11-19 15:36），**以 PubDate 为准判窗口**。
- **上海**：`/zdgk/index.html` URL 中的 `20261123` 是**挂网路径月份**，非发文日；实例「延长《上海市建设工程定额管理实施细则》有效期」（沪建标定〔2026〕40号）`<meta PubDate>` 实为 **2026-02-02**。判窗口必须读 PubDate。
- **陕西**：`zfcxjst.shaanxi.gov.cn` 已 **NXDOMAIN**，实域迁至 **`js.shaanxi.gov.cn`**（200 可读）。
- **山东**：`search.jsp` 本期恢复可用（空 infotypeId 返回 6567 条），与此前「共 0 条」记载相反 → 标记为**间歇可用，仍需并读静态栏**。
- **北京**：`bjjs.beijing.gov.cn` 本期 000，改用 **`zjw.beijing.gov.cn`**。
- **四川**：`c101428/article_list.shtml` 最新 11-23（川建标函〔2026〕1190号 5 项地方标准），`_2` 分页为 10-21；`tonggao/`、`gongshitg/` 仍 403。
- **河北**：https 首页 200，栏目与详情**仍全 412**（本期再次证实）。
- **辽宁**：`/zjt/zmhd94/yjzj/<id>/index.shtml` 意见征集页「发布时间：2026年11月23日」可读，但**制度内容全在 doc 附件**、正文无量化指标。
- **湖南**：省级搜索 API 可用，窗口内仅 1 条（职称评审公示）；`tzgg2zhyw` 目录 403。
- **广西**：`zjt.gxzf.gov.cn/zfxxgk/fdzdgknr/yjzj1/t<id>.shtml`「意见征集」栏可直读（**用 http**），含 PubDate 到分钟；法规文件栏仍为 Vue 壳页。
- **烟台**：局站政策法规 col22907 全量 59 条、门户部门文件 col99956 全量 99 条，可一次枚举判窗口；`jsearch` 关键词不生效复验确认（第 3 次）。烟建建管〔2026〕15号 详情页 404，正文以局站 09-10 版为准。

### 2026-11-25 期新增／修正（第 89 期实测）

- **住建部**：首页 `<meta MakeTime>` 由 11-23 19:14:53 重建为 **2026-11-24 17:07:33**；文件库接口 pageId=`vhiC3JxmPC8o7Lqg4Jw0E` 当次可正常返回最新条目（含 11-24 17:01 挂网的 建办科函〔2026〕271号），**与 11-24 期「接口索引滞后」不同，本期接口与首页同步** → 该故障为间歇性，仍需「接口＋首页内联＋PubDate」三读。文件库附件（docx）下载接口 `/api-gateway/jpaas-web-server/front/document/download?fileUrl=…` 需带 Referer 且 `-L` 跟随，可直接 `zipfile` 解包读 `word/document.xml`。
- **山东**：https 仍 502、http 200 可用；**通知公告详情页无 `<meta PubDate>`**，发布时间取正文「发布日期:YYYY-MM-DD HH:MM」；`art_102884_*` 为通知公告条目路径。
- **广州**：`zfcj.gz.gov.cn/zjdt/zjxw/`（住建新闻）会发布**政策通报**（如「卖旧买新」政策优化），有量化数据但**无正式规范性文件同步挂网**——可作来源，但须在条目内标注「文号待核、正式文件未见挂网」，不得默认其为规范性文件。
- **浙江**：`/col/col1229159357/`（房地产市场监管处）、`/col/col1229159361/`（建筑市场监管处）民意征集页可直读；**正文「发布时间」显示为 12 小时制（04:54），`<meta PubDate>` 为 16:54**，以 meta 为准；附件 .doc 可用 `olefile` 读 `WordDocument`（utf-16-le），.docx 用 `zipfile`。
- **广东**：本期 `zfcxjst.gd.gov.cn` 全站 200，`/xxgk/wjtz/` 正常；详情页「成文日期」与挂网时间双列（196号 成文 11-13／挂网 11-23，201号 成文 11-20／挂网 11-24），**判窗口用挂网时间**；附件 PDF 可直接 `pdftotext`。
- **海南**：质量安全栏详情 `<meta PubDate>` 到秒（227号 16:54:37），**正文落款 11-20 早于挂网 4 天**，须双记。
- **河南**：`hnjs.henan.gov.cn/2026/11-24/<id>.html` 详情页 http 会 301 → 须 `-L` 跟跳到 https；`<meta PubDate>` 带毫秒（…:56.0）。
- **宁夏**：`jst.nx.gov.cn` 存在 **URL 节点日（11-23）≠ `<meta PubDate>`（11-19）** 的补挂情形（本期两条消防／分包通知），**一律以 PubDate 判窗口**，URL 日期不可作依据。
- **江苏**：xxgk `search.jsp` 留空 infotypeId 返回全站（约 1867 条），可按日期倒序取最新；11-24 条目为「技术中心申报推荐名单」（名单公示类，剔除）。
- **安徽**：`dohurd.ah.gov.cn/wjgk/tzgg/index.html` 静态列表含日期，可直读（本期 11-23／11-24 均为注册、职称公示）。
- **四川**：`c101428/article_list.shtml` 首条 11-23（排水管道标准，市政口径剔除），窗口内零新增。
- **湖北**：`/zfxxgk/zc/qtzdgkwj/zcwj.json` 最新 PUBDATE 11-19，条目数未变。
- **武汉**：`zcfg.json` 110 条、字节数 86,533，与上期完全一致（MD5 43055646…），可作「零新增」硬证据；`/zwdt/zgdt/`（住更动态）为本次新发现的补充栏目，内容多为媒体转载，按来源铁律不采。
- **烟台**：局站政策法规 col22907 最新仍为 11-16（第二批高品质住宅 27号）；门户 col99956 11-24 为市民政局地名文化遗产（非住建）。~~**绿建 烟建节科〔2023〕2号 有效期更正为 2026-12-14**（原文第三十三条：2023-12-15 施行、至 2026-12-14）~~ **该「12-14」记载已于第 90 期证伪，见下「2026-11-26 期新增／修正」，以 2026-12-09 为准**；物业信用 13号 空窗按 2025-06-30 起算为 **513 天**。

### 2026-11-26 期新增／修正（第 90 期实测）

> **★ 必读：住建部全站 `<meta PubDate>` 于 2026-11-25 16:57—17:54 被批量改写（全站重新静态化）。** 实证：发文 11-03《河流流量测验标准》、09-01《「好房子」第二批》、09-03《废止部分文件公告》等旧文，`<meta PubDate>` 现均显示 `2026-11-25 17:5x`；仅 09-04《公积金基础数据标准》保留原始 09-04。**→ 即日起住建部「窗口内新增」不得再以 `<meta PubDate>` 单独判定**，须改用「政策发布栏 date-info（挂网日）」＋「文件库表格发文日期」＋历史简报比对三读；其余站点暂未见同类现象，但每次运行应先抽 1—2 条旧文核 `PubDate` 是否被改写。

- **烟台（★口径更正）**：绿建 **烟建节科〔2023〕2号** 原文第三十三条逐字为「**本办法自2023年12月10日起施行，有效期至2026年12月09日**」（[原文](https://www.yantai.gov.cn/art/2023/11/15/art_99956_74949.html)）。**此前「12-14／12-15 施行」的记法查无依据，已作废；全部期次、台账、对比一律按 2026-12-09**。该件未列入 Q3 部门 18 件，属「库标有效、目录未列」。另：Q3 目录「库标有效未列目录」本期实测只确认 **2 件**（绿建 2号、物业信用 13号），第 3 件未获新增确认。
- **江西（通道提速，首选）**：栏目目录直链 `/jxszfhcxjst/{wjtz,gsgg}/` 恒 **403（openresty）**，但 `/{栏目}/{栏目}-articleList.json` **全部 200 可直读**（`wjtz／gsgg／flfgg／gfxwj／dczj／zcfg100／zcjd` 均实测），字段 `title / pubDate / urls.pc`。**优于读列表页内嵌 `var articleList`**（`-articleList.json` 曾在 11-23 期记 404，本期恢复，属间歇）。
- **湖南**：省级搜索 API 的 `publishedTime` 为毫秒时间戳且**带 8 小时偏移（UTC 口径）**——本期搜索显示 11-25 02:55，详情 `<meta PubDate>` 实为 **11-25 10:56**，**必须回详情判窗口**。`tzgg2zhyw` 目录仍 403。
- **四川**：`/scjst/c101429/article_list.shtml`（通告）为**可读静态列表、日期内联**，是该站唯一稳定通道（`c101428` 亦可读；`tonggao/`、`gongshitg/` 仍 403）。
- **青岛（TRS 正则修正）**：条目在 `<li trs-attr="chip">` 内**多包一层 div**，旧正则 `div_list_li_width_right'>[YYYY-MM-DD]` 会漏匹配 → 改用松匹配 `\[(\d{4}-\d{2}-\d{2})\]`。详情页**无 `<meta PubDate>`**，发布时间取列表日＋正文落款；https(443) 超时、http 200。
- **济南**：JCMS 必带 `paramJson={"pageNo":1,"pageSize":30}`（紧凑 JSON）＋`verify=False`；pageSize 小于 30 时，11-25 当日新件会被置顶旧文挤出视野。
- **东莞**：`zjj.dg.gov.cn/gkmlpt/api/all/796?page=1&sid=1` **直出 JSON**（本期起可用，替代此前 `postmeta/g/795_1.js` JSONP）；详情页 `<title>` 仅栏名，标题在 `<h1>`（**无 `<meta ArticleTitle>`**），核对标题须读 `h1`。
- **深圳**：首页与 `/xxgk/tzgg/` **首探常 502，重试 3 次即 200**（间歇性，不必记为不可达）。
- **山东**：https 仍 502、http 200；`search.jsp` 本期需 **POST（jdid=14）** 才返回条目，GET 无条目（与 11-24「GET 可用」相反 → 记为间歇，两种都试）。
- **北京**：「列表 11-25／详情 PubDate 实为 07-16」陷阱本期第二次证实（建筑垃圾再生产品通知，京建发〔2019〕148号 旧文重挂）。
- **台州／泰州**：`zjj.taizhou.gov.cn` 实为**泰州市政府**门户（本期再次证实），泰州住建真域 `jsj.taizhou.gov.cn`。
- **温州**：`zjj.wenzhou.gov.cn/col/col1229206191/` 列表可直接读，条目 `art/2026/art_*.html`，征意与名单类均在此栏。
- **山西**：`zjt.shanxi.gov.cn/zwgk/zqyj/` 征意栏可直读；页面「发表日期」可能比附件生成时间早 1 日（本期 11-24／11-25 10:38），按挂网口径记。
- **云南**：`zfcxjst.yn.gov.cn` 正文偶为**扫描件图片（8 页）**，须逐页目视核读；页面 gzip 未声明 Content-Encoding 的旧问题仍在。
- **南京**：`fcj.nanjing.gov.cn` 须带完整浏览器头；详情页 `<meta ArticleTitle>` 与标题一致，可作校验锚点。
- **武汉**：`zcfg.json` 条数（110）与最新成文日（10-12）未变，但**字节数／MD5 会因既有条目字段微调而变化**（本期 86,533→86,608、MD5 变）→ **「零新增」硬证据只能用「条数＋最新日期」，不能用 MD5**。

### 2026-11-27 期新增／修正（第 91 期实测）

- **住建部**：全站 `<meta PubDate>` 批量改写**第 2 期证实**（抽查 09-21 河流流量测验标准、11-09 高处坠落 建安办函〔2026〕44号、11-18 辽宁造价电子证照 建办厅函〔2026〕273号，PubDate 现均为 11-25 17:5x）→ **窗口判定只用「政策发布栏挂网日＋文件库发文日期＋正文发布时间」**。首页 `MakeTime` 本期 11-26 19:51:53（与 11-26 19:51 挂网的工信部转载件对应）。**工作动态 pageId=`919e942639b5477d96e4c97471c61d9f` 的 tagId 须用「栏目-list」，用「内容1」返回空模板**；政策发布 pageId=`8soTiiRMg3k87m5e2CQit`。文件库 pageId=`vhiC3JxmPC8o7Lqg4Jw0E` 第 3 页可回溯到 11-04（90 条）。征求意见栏列表显示**截止日期**，勿当发布日。
- **杭州（★重要）**：`cxjw.hangzhou.gov.cn` 征意页 `jpaas-jsurvey-web-server/front/dczj/showJsurveys.do?formId=…` **裸 curl 返回 403**，**带浏览器 UA 后 200**（本期实测）。征意页尾部有「发布时间：YYYY-MM-DD／截止时间：YYYY-MM-DD」两字段可直接读，落款为委名＋日期，无分钟。意见征集栏 `col1229800811` 的 index 为 JS 壳页，须从 JPAAS 列表取 `formId`。
- **东莞**：`zjj.dg.gov.cn/.../content/post_*.html` **http 访问返回 301，须 `-L` 跟跳**；详情标题在 `<h1>`（无 ArticleTitle），`<meta PubDate>` 精确到秒（本期 11-26 11:20:18）；`gkmlpt/api/all/796?page=1&sid=1` 直出 JSON，**真实地址在 `post_url` 字段**（旧 `4/<id>/post_` 格式 404）。
- **佛山**：`fszj.foshan.gov.cn/zwgk/txgg/content/post_*.html`，`<title>` 仅站名，标题在 `<meta ArticleTitle>`（**含 `<br/>` 需清理**）；`<meta PubDate>` 与正文「发布时间」同值，正文落款常早 1 日。
- **杭州（续）**：`fgj.hangzhou.gov.cn` JPAAS webId=3107、tplSetId=tequEn2sVguRAoeaDLIw0（通知公告 list／法规 list）。
- **广州**：部门文件真实通道为 `/gkmlpt/api/all/1090?page=1&sid=1`（JSON），规范性文件 1089；公文库详情页同时有「成文日期」与「发布日期」两字段（705号 成文 11-20／发布 11-24），**判窗口用发布日期**。
- **山东**：https 仍 502、http 200；`search.jsp` 本期 **POST（jdid=14、divid=div160091、infotypeId=SD02，共 1655 条）可用**；通知公告详情正文有「发布日期:YYYY-MM-DD HH:MM」；规范性文件 SD020205 最新 06-25、政策解读 SD02020701 最新 11-23。
- **福建**：旧域 `zfcxjst.fujian.gov.cn` 本期 **NXDOMAIN**，实域 **`zjt.fujian.gov.cn`**（`/xxgk/zxwj/`、`/xxgk/tzgg/` 最新均 11-17）。
- **江苏**：省级列表 200（全文 1869 条），**详情页无完整浏览器头＋Referer 返回 403**；已由南京 `fcj.nanjing.gov.cn`、南通 `zj.nantong.gov.cn`、苏州 `zfcjj.suzhou.gov.cn` 三市兜底（苏州详情同样须 UA＋Referer，发布日期在「【发布日期 ：…】」字段）。
- **湖北**：`gfxwj/zcwj.json` 已 **404**，由 `qtzdgkwj/zcwj.json`（1579 条）覆盖。
- **上海**：`zjw.sh.gov.cn/zdgk/index.html` 须并读 `index_2.html`；本期两页 20 条中 10 条同日批量（meta PubDate 为 2026-02-02 旧文重挂），**从第 3 条起即到 11-05**。`fgj.sh.gov.cn` 主动公开 6 子栏最新 11-18（沪房物业〔2026〕162号）。
- **武汉**：`zcfg.json` 110 条、86,608B、最新 DOCRELTIME 2026-10-12；「零新增」硬证据只用「条数＋最新日期」。`/zwdt/zgdt/` 住更动态最新 11-23。政策解读栏 11-25 挂网两条旧稿（PubDate 07-18／08-02，ContentSource 为「武汉发布」「长江日报」）。
- **烟台（★接口变化）**：局站 col22907 **首调带 `paramJson` 返回「参数不合法！」**，须严格用页面原始参数（`parseType=bulidstatic&webId=179&tplSetId=GC2egDexn2qAbtVty6wAZ&pageType=column&tagId=当前栏目list&editType=null&pageId=<纯数字>`）；列表日期类名为 **`span.fr`**（非 `f_right`）。门户 col99956／99959／99961／11795／43171 的 JPAAS 返回条目**不带日期**，须逐条读详情 `<meta PubDate>`。CMS `class="yxx" title` 可读完整有效性表述（如绿建 2号「自 2023-12-10 施行、有效期至 2026-12-09」），`class="sxrq" title` 为毫秒时间戳；但 13号 等未按届满日刷新，**不可单独采信**。
- **烟台（口径）**：门户部门文件栏窗口内出现**住房公积金中心**公文（烟住〔2026〕31／33／34号，成文 9 月、11-25 集中挂网）→ **属住房公积金类，按本简报筛选规则明确排除**，不因「挂网在住建栏目」而收录；如需留痕，只在台账段说明。
- **判重铁律补例（2026-11-27）**：本期两例对照——①**苏州 苏州建函设〔2026〕202号**：11-24 挂网，第 90 期**已明判剔除**（年度行政检查工作安排），本期 G 组重新上报时**维持原判、不因新发现即反转**；②**湖南挂证通报**：第 90 期**已明判剔除**（个案查处），本期复核后**改判收录**，理由是内含可复用治理机制。→ **判重不仅要比「是否收录过」，还要比「是否已判过、判的理由是否仍成立」**；改判必须写明理由与新证据。
