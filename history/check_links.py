# -*- coding: utf-8 -*-
"""批量校验简报候选链接：可访问性 + 标题关键词匹配"""
import json, re, ssl, urllib.request, urllib.error

links = {
    "好房子建设指南再次征求意见": "https://www.mohurd.gov.cn/gongkai/zc/wjk/art/2026/art_b07ec77a36f544169e7a3dea749ee4dc.html",
    "建房规3号全文": "https://www.mohurd.gov.cn/gongkai/zc/wjk/art/2026/art_45644612a7064289bdc0d5b1427a25d8.html",
    "三部门答记者问": "https://www.mohurd.gov.cn/xinwen/gzdt/art/2026/art_1fbaaf4f0cba4cf5a5213bb8501bf7f9.html",
    "湖南存量房交易管理": "https://zjt.hunan.gov.cn/zjt/c101183/c101185/202608/t20260819_34047125.html",
    "广西暂停信用评价": "http://zjt.gxzf.gov.cn/zfxxgk/fdzdgknr/wjtz/jzsc/t28011467.shtml",
    "江苏生命线管理办法": "https://www.jiangsu.gov.cn/art/2026/8/26/art_46144_11820899.html",
    "湖北城市更新十五五规划": "https://www.hubei.gov.cn/zfwj/ezf/202608/t20260828_6003358.shtml",
    "湖北楼盘体检平台": "https://hubei.gov.cn/hbfb/bmdt/202608/t20260829_6003578.shtml",
    "江西业委会指导规则": "https://zjt.jiangxi.gov.cn/jxszfhcxjst/dczj/pc/content/content_2090708426896515072.html",
    "四川工程量清单报价评审": "https://jst.sc.gov.cn/scjst/gfxwj/2026/8/18/a4b92a0e60784c459bca5dc22e5ad063.shtml",
    "苏州韧性城市规划": "https://zfcjj.suzhou.gov.cn/szszjj/myzj/202608/985392746de84c6e8cd4ba79b3e7a6b8.shtml",
    "广州合同检查方案": "https://zfcj.gz.gov.cn/gkmlpt/content/10/10980/post_10980790.html",
    "青岛施工合同范本": "https://sjw.qingdao.gov.cn/cxjsj1/cxjsj35/202608/t20260826_10713397.shtml",
    "广西三板应用强化": "http://zjt.gxzf.gov.cn/zfxxgk/fdzdgknr/fgwj/xzgfxwj/t28064337.shtml",
    "天津消防设计编制指南": "https://zfcxjs.tj.gov.cn/xxgk_70/tzgg/202608/t20260828_7360531.html",
    "海南安责险服务指南": "https://zjt.hainan.gov.cn/szjt/0407/202608/e9a44f4eaa72427dbb95357384ebebe9.shtml",
    "安徽特种作业证书调整": "https://dohurd.ah.gov.cn/wjgk/tzgg/58336851.html",
    "广东打非治违调度会": "http://zfcxjst.gd.gov.cn/xwzx/zxdt/content/post_4946332.html",
    "广东装配式地下车站标准": "http://zfcxjst.gd.gov.cn/xxgk/wjtz/content/post_4947701.html",
    "住建部6项行业标准": "https://www.mohurd.gov.cn/gongkai/zc/wjk/art/2026/art_6e737bddfd4d4bdca79d6962abe9bed1.html",
}

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

def fetch(url):
    req = urllib.request.Request(url, headers={
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml",
        "Accept-Language": "zh-CN,zh;q=0.9",
    })
    try:
        with urllib.request.urlopen(req, timeout=20, context=ctx) as r:
            html = r.read(60000).decode("utf-8", "ignore")
            return r.status, html
    except urllib.error.HTTPError as e:
        return e.code, ""
    except Exception as e:
        return f"ERR:{type(e).__name__}", ""

keywords = {
    "好房子建设指南再次征求意见": ["好房子", "建设指南"],
    "建房规3号全文": ["商品住房销售", "建房规"],
    "三部门答记者问": ["答记者问", "商品住房销售"],
    "湖南存量房交易管理": ["存量房"],
    "广西暂停信用评价": ["信用评价", "暂停"],
    "江苏生命线管理办法": ["生命线"],
    "湖北城市更新十五五规划": ["城市更新", "十五五"],
    "湖北楼盘体检平台": ["体检", "楼盘"],
    "江西业委会指导规则": ["业主大会", "业主委员会"],
    "四川工程量清单报价评审": ["工程量清单", "评标"],
    "苏州韧性城市规划": ["韧性城市", "十五五"],
    "广州合同检查方案": ["合同检查"],
    "青岛施工合同范本": ["施工合同"],
    "广西三板应用强化": ["三板", "预制"],
    "天津消防设计编制指南": ["消防设计", "编制指南"],
    "海南安责险服务指南": ["安全生产责任保险"],
    "安徽特种作业证书调整": ["特种作业"],
    "广东打非治违调度会": ["打非治违"],
    "广东装配式地下车站标准": ["装配", "地下车站"],
    "住建部6项行业标准": ["标准", "征求意见"],
}

print("=" * 90)
for name, url in links.items():
    status, html = fetch(url)
    if isinstance(status, int):
        title = re.search(r"<title>(.*?)</title>", html, re.S)
        t = title.group(1).strip()[:60] if title else ""
        kws = keywords.get(name, [])
        hit = [k for k in kws if k in html[:30000] or k in t]
        flag = "OK " if status == 200 and hit else "?  "
        print(f"{flag} [{status}] {name}")
        print(f"      title: {t}")
        if status == 200 and not hit:
            print(f"      !! 标题关键词未命中: {kws}")
    else:
        print(f"ERR [{status}] {name} -> {url}")
print("=" * 90)
