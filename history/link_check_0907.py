# -*- coding: utf-8 -*-
"""2026-09-07 第14期 候选链接校验"""
import ssl, urllib.request, re, sys

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36"

links = {
"湖北_质量月启动(城市更新质安监管解读)": "https://zjt.hubei.gov.cn/bmdt/dtyw/zjyw/202609/t20260907_6008160.shtml",
"陕西_城市高质量发展实施意见": "https://js.shaanxi.gov.cn/sy/zjzx/zjyw/202609/t20260904_3674201.html",
"山西_绿色建筑创新项目创建方案": "https://zjt.shanxi.gov.cn/zwgk/gztz/202609/t20260903_10213573.shtml",
"天津_配售型好房子入选第二批经验清单": "https://zfcxjs.tj.gov.cn/xwzx_70/zjdt/202609/t20260904_7367443.html",
"海南_省外检测机构进琼备案": "https://zjt.hainan.gov.cn/szjt/0407/202609/81a4818d09b64f809a5a0363932b2491.shtml",
"青海_农牧区传统民居好房子技术标准": "https://zjt.qinghai.gov.cn/xwdt/tzgg/202609/t20260903_430174.html",
"广东_轨道交通移动通信信号检测标准": "http://zfcxjst.gd.gov.cn/xxgk/wjtz/content/post_4951379.html",
"广东_钢螺杆锚桩静载试验标准征意": "http://zfcxjst.gd.gov.cn/xxgk/wjtz/content/post_4951372.html",
"湖北_城市更新质安监管通知(若单独存在)": "https://zjt.hubei.gov.cn/",
}

def fetch(url, timeout=25):
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "text/html,*/*"})
    try:
        with urllib.request.urlopen(req, timeout=timeout, context=ctx) as r:
            raw = r.read()
            final_url = r.geturl()
            return r.status, final_url, raw
    except Exception as e:
        return None, str(e), b""

def decode(raw):
    for enc in ("utf-8", "gb18030"):
        try:
            return raw.decode(enc)
        except Exception:
            continue
    return raw.decode("utf-8", errors="ignore")

for name, url in links.items():
    st, info, raw = fetch(url)
    if st is None:
        print(f"[FAIL] {name}\n    {info[:160]}")
        continue
    txt = decode(raw)
    # title
    m = re.search(r"<title>(.*?)</title>", txt, re.S)
    title = re.sub(r"\s+", " ", m.group(1)).strip() if m else "(no title)"
    # published date hints
    d1 = re.search(r"(20\d\d-\d\d-\d\d \d\d:\d\d)", txt)
    print(f"[OK {st}] {name}\n    final: {info[:110]}\n    TITLE: {title[:120]}")
    if d1:
        print(f"    time: {d1.group(1)}")
    print()

print("DONE")
