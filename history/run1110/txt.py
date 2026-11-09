# -*- coding: utf-8 -*-
import requests,re,html,sys
requests.packages.urllib3.disable_warnings()
UA={"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120"}
def get(u):
    r=requests.get(u,headers=UA,verify=False,timeout=60); r.encoding=r.apparent_encoding
    return r
def text(u):
    r=get(u)
    m=re.search(r'<title>(.*?)</title>',r.text,re.S)
    ti=html.unescape(m.group(1)).strip() if m else None
    pd=re.search(r'name="PubDate"\s+content="([^"]+)"',r.text,re.I)
    t=re.sub(r'<script.*?</script>|<style.*?</style>','',r.text,flags=re.S)
    t=re.sub(r'<[^>]+>','\n',t); t=html.unescape(t)
    t=re.sub(r'[ \t\u3000\xa0]+',' ',t); t=re.sub(r'\n\s*\n+','\n',t)
    return r.status_code,ti,(pd.group(1) if pd else None),t
if __name__=='__main__':
    s,ti,pd,t=text(sys.argv[1])
    print("HTTP",s,"| PubDate",pd,"| TITLE",ti)
    if len(sys.argv)>2:
        for kw in sys.argv[2:]:
            i=t.find(kw)
            print("\n### KW",kw)
            print(t[max(0,i-300):i+1500] if i>=0 else "NOT FOUND")
    else:
        print(t[:4000])
