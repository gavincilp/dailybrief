import requests, urllib3, re, json
from urllib.parse import quote
urllib3.disable_warnings()
UA={'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36','Referer':'https://jst.zj.gov.cn/'}
def api(pageId,tagId):
    u=('https://jst.zj.gov.cn/api-gateway/jpaas-publish-server/front/page/build/unit?parseType=bulidstatic&webId=3162'
       '&tplSetId=ruXYFpsVFzDi3ZOOn2U3E&pageType=column&tagId=%s&editType=null&pageId=%s')%(quote(tagId),pageId)
    r=requests.get(u,headers=UA,timeout=25,verify=False)
    try: return json.loads(r.text)['data'].get('html','')
    except: return ''
for k in ['1229129246']:
    h=api(k,'当前栏目列表1a')
    print(len(h)); print(re.sub(r'\s+',' ',h)[:1500])
# home page links for other file col
t=open('zj_home.html',encoding='utf-8',errors='ignore').read()
for m in re.finditer(r'href="(/col/col1229129246/[^"]+)"[^>]*>\s*([^<]{4,100})',t): print(m.group(1),m.group(2).strip())
