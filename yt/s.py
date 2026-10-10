import sys,subprocess,json,re,html
UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
def search(q):
    url=("http://www.yantai.gov.cn/api-gateway/jpaas-jsearch-web-server/interface/search/info"
         "?websiteid=&q="+subprocess.run(['python3','-c','import urllib.parse,sys;print(urllib.parse.quote(sys.argv[1]))',q],capture_output=True,text=True).stdout.strip()+
         "&pg=10&cateid=7I4sUcelGun35EIkKd3dy&serviceId=yglRfIhpRHsFrLutGVCBO&pos=title,content,filenumber&sortType=1&p=1")
    out=subprocess.run(['curl','-sL','-m','40','-A',UA,'-H','X-Requested-With: XMLHttpRequest',
        '-H','Referer: http://www.yantai.gov.cn/api-gateway/jpaas-jsearch-web-server/search',url],capture_output=True,text=True).stdout
    try: d=json.loads(out)
    except: return []
    res=((d.get('data') or {}).get('searchResult') or {}).get('result') or []
    items=[]
    for r in res:
        if not isinstance(r,str): continue
        date=re.search(r'时间[:：]\s*([\d]{4}-[\d]{2}-[\d]{2})',r)
        href=re.search(r'href="(http[^"]+)"',r)
        title=re.search(r'title="([^"]*)"',r)
        if not title:
            m=re.search(r'class="[^"]*title[^"]*"[^>]*>(.*?)</a>',r,re.S)
            title=re.sub('<[^>]+>','',m.group(1)) if m else None
        items.append((date.group(1) if date else '', html.unescape(re.sub('<[^>]+>','',title.group(1))) if title else '', href.group(1) if href else ''))
    return items
for q in sys.argv[1:]:
    print('\n#### Q:',q)
    for it in search(q): print('  ',it[0],'|',it[1][:70],'|',it[2][:95])
