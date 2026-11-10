import requests, urllib3, re, json
from urllib.parse import quote
urllib3.disable_warnings()
UA={'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36','Referer':'https://jst.zj.gov.cn/'}
def api(pageId,tagId,pageType='column'):
    u=('https://jst.zj.gov.cn/api-gateway/jpaas-publish-server/front/page/build/unit?parseType=bulidstatic&webId=3162'
       '&tplSetId=ruXYFpsVFzDi3ZOOn2U3E&pageType=%s&tagId=%s&editType=null&pageId=%s')%(pageType,quote(tagId),pageId)
    r=requests.get(u,headers=UA,timeout=25,verify=False)
    try: return json.loads(r.text)['data']
    except: return {}
def parse(h):
    h=re.sub(r'\s+',' ',h)
    return re.findall(r'<a title="([^"]{4,200})" target="_blank" href="([^"]+)">.*?<span class="fr">([\d-]{8,10})</span>',h)
cols={'1229159074':'当前栏目列表1a','1229129246':'当前栏目列表1a','1229159357':'当前栏目列表1a','1229158252':'当前栏目列表1a','1229322076':'当前栏目列表1a'}
for k,v in cols.items():
    d=api(k,v)
    items=parse(d.get('html',''))
    print('=====',k,len(items))
    for a,b,c in items[:12]: print(c,a,b)
    # look for pageId in html
    for m in re.finditer(r"pageId['\"]?\s*[:=]\s*'?([0-9]+)",d.get('html','')): print(' pid',m.group(1))
