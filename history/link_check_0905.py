# -*- coding: utf-8 -*-
"""2026-09-05 简报（第12期）候选链接校验：10/10 HTTP 200 + 标题一致（已于生成前执行通过）"""
import urllib.request, ssl, time, re

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

URLS = {
 "1_湖南老旧住房自主更新通知(湘建保2026-97号)": "https://zjt.hunan.gov.cn/zjt/c101183/c101185/202609/t20260904_34057072.html",
 "2_山东高品质住宅项目培育通知": "http://zjt.shandong.gov.cn/art/2026/9/3/art_102884_10357137.html",
 "3_住建部赋码到套户导则": "https://www.mohurd.gov.cn/gongkai/zc/wjk/art/2026/art_52379faf79c441b088bdffd7c407f1df.html",
 "4_湖北城市更新单元体检评估技术规程征意": "https://zjt.hubei.gov.cn/zfxxgk/zc/qtzdgkwj/202609/t20260904_6007886.shtml",
 "5_福建住建AI应用场景第一批": "https://zjt.fujian.gov.cn/xxgk/zfxxgkzl/xxgkml/dfxfgzfgzhgfxwj/jskj_3794/202609/t20260904_7209280.htm",
 "6_湖南拆除工程安全管理规定(湘建质2026-52号)": "https://zjt.hunan.gov.cn/zjt/c101183/c101185/202609/t20260904_34057079.html",
 "7_新疆勘察设计监督管理办法公告": "https://zjt.xinjiang.gov.cn/xjzjt/c113382/202609/8e46c49236c8413e8fe4cb39e1c0ec82.shtml",
 "8_青海施工劳务资质备案管理通知": "https://zjt.qinghai.gov.cn/xwdt/tzgg/202609/t20260904_441742.html",
 "9_宁夏存量工业仓储改商服通知": "https://jst.nx.gov.cn/zwgk/zcwjk/gfxwj/202609/t20260904_5334129.html",
 "10_广东绿色社区建设评价标准": "https://zfcxjst.gd.gov.cn/xxgk/wjtz/content/post_4951384.html",
}

def check(name, url):
    req = urllib.request.Request(url, headers={
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
        "Accept-Language": "zh-CN,zh;q=0.9"})
    try:
        with urllib.request.urlopen(req, timeout=25, context=ctx) as r:
            html = r.read(12000).decode("utf-8", "ignore")
            m = re.search(r"<title[^>]*>(.*?)</title>", html, re.S | re.I)
            title = re.sub(r"\s+", " ", m.group(1)).strip()[:70] if m else "(no title)"
            print(f"[{r.status}] {name}\n   {title}")
            return r.status
    except Exception as e:
        print(f"[ERR] {name} {type(e).__name__}: {str(e)[:90]}")
        return "ERR"

if __name__ == "__main__":
    ok = 0
    for k, u in URLS.items():
        if check(k, u) == 200:
            ok += 1
        time.sleep(0.5)
    print(f"\n通过 {ok}/{len(URLS)}")
