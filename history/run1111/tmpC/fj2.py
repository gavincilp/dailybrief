import re,requests,urllib3
urllib3.disable_warnings()
for p in ['xxgk/tzgg','xxgk/gzdt']:
    r=requests.get(f"https://zjt.fujian.gov.cn/{p}/",verify=False,timeout=25,headers={'User-Agent':'Mozilla/5.0'}); r.encoding='utf-8'
    print('===',p,r.status_code)
    for m in re.finditer(r'href="([^"]*t2026(?:10|11)\d{4}_\d+\.html?)"[^>]*>([^<]{6,120})<',r.text):
        print(m.group(2).strip()[:60],'|',m.group(1))
