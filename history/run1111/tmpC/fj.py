import re,requests,urllib3
urllib3.disable_warnings()
for p in ['xxgk/zxwj','xxgk/tzgg','xxgk/gzdt']:
    r=requests.get(f"https://zjt.fujian.gov.cn/{p}/",verify=False,timeout=25,headers={'User-Agent':'Mozilla/5.0'}); r.encoding='utf-8'
    print('===',p,r.status_code,len(r.text))
    for m in re.finditer(r'href="(\.?/?[^"]*t20\d{6}_\d+\.html?)"[^>]*>([^<]{6,120})<',r.text):
        print(m.group(2).strip()[:60],'|',m.group(1))
