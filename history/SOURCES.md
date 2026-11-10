# 信源与通道速查（住建政策每日简报 · 子代理必读）

> 本文件放在仓库 `history/` 下，供**云端任务与本地任务**的子代理共同读取。
> 云端沙箱读不到本机的工作区笔记，凡涉及「官网真实入口 / 不可达站点 / 已破解接口 / 内容校验陷阱」的知识，一律以本文件为准，并**每期复核、按实修正**（本文件随仓库同步）。
> 最后核对日期：2026-11-11

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
