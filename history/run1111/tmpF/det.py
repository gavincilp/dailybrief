import requests,re,sys
requests.packages.urllib3.disable_warnings()
UA={'User-Agent':'Mozilla/5.0 Chrome/120'}
u=sys.argv[1]
r=requests.get(u,headers=UA,verify=False,timeout=40)
r.encoding=r.apparent_encoding if r.apparent_encoding else 'utf-8'
h=r.text
print('HTTP',r.status_code,'len',len(h))
for k in ['PubDate','ArticleTitle','MakeTime','ContentSource','ColumnName']:
    m=re.search(r'<meta[^>]+name="%s"[^>]+content="([^"]*)"'%k,h)
    if m: print(k,'=',m.group(1))
m=re.search(r'<title>(.*?)</title>',h,re.S)
if m: print('TITLE=',m.group(1).strip()[:200])
