import requests,re,urllib3
urllib3.disable_warnings()
H={'User-Agent':'Mozilla/5.0'}
items=[
("河南·四新征集","https://hnjs.henan.gov.cn/2026/11-09/3445925.html","关于征集2026年度住房城乡建设领域“四新”技术的通知"),
("四川·废止招标代理信用办法","https://jst.sc.gov.cn/scjst/c101428/2026/11/5/12956d760bf846cbb55b54d548276729.shtml","关于废止《四川省工程建设项目招标代理机构及项目负责人信用记录管理办法》的通知"),
("安徽·新型建造技术与试点项目","https://dohurd.ah.gov.cn/wjgk/tzgg/58408891.html","关于公布2026年度安徽省新型建造技术产品及试点项目名单的通知"),
("福建·资质管理","https://zjt.fujian.gov.cn/xxgk/zxrwj/../zfxxgkzl/xxgkml/xzxk_3797/202611/t20261110_7246830.htm","关于进一步明确建设工程企业资质管理有关事项的通知"),
("辽宁·场景资源","https://zjt.ln.gov.cn/zjt/tfwj/cswj/2026110415452494721/index.shtml","关于征集住建领域场景资源（第一批）的通知"),
]
for n,u,t in items:
    try:
        r=requests.get(u,headers=H,timeout=30,verify=False); r.encoding=r.apparent_encoding
        tt=re.search(r'<articleTitle|ArticleTitle" content="([^"]+)"',r.text,re.I)
        title=re.search(r'<title>(.*?)</title>',r.text,re.S)
        ok=t[:12] in r.text
        print(f"{n}\t{r.status_code}\t标题片段命中={ok}\t{re.sub(chr(10),' ',title.group(1))[:60] if title else ''}")
    except Exception as e: print(n,'ERR',e)
