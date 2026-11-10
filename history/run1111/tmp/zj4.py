import requests, urllib3, re
from urllib.parse import quote
urllib3.disable_warnings()
UA={'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36','Referer':'https://jst.zj.gov.cn/'}
def art(u):
    if not u.startswith('http'): u='https://jst.zj.gov.cn'+u
    r=requests.get(u,headers=UA,timeout=25,verify=False); r.encoding='utf-8'
    t=r.text
    md=re.search(r'<meta name="(?:PubDate|pubdate|ArticleTitle|articletitle)" content="([^"]*)"',t)
    ti=re.search(r'<title>([^<]*)</title>',t)
    return r.status_code,ti.group(1) if ti else '',re.findall(r'<meta name="(ArticleTitle|PubDate|ColumnName|ContentSource)" content="([^"]*)"',t)
for u in ['/col/col1229129246/art/2026/art_ba4e32bed5515f00cba20a117cfd463c.html','/col/col1229129246/art/2026/art_fa481cb3bea692a6f6c56823d3c1bf6e.html','/col/col1229129246/art/2026/art_8b4d7ce74f7ccee2f1788db9001435c4.html']:
    print(u,art(u))
