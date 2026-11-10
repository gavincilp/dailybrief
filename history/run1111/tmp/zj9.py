import requests, urllib3, re, json
from urllib.parse import quote
urllib3.disable_warnings()
UA={'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36','Referer':'https://jst.zj.gov.cn/'}
def api(pageId,tagId):
    u=('https://jst.zj.gov.cn/api-gateway/jpaas-publish-server/front/page/build/unit?parseType=bulidstatic&webId=3162'
       '&tplSetId=ruXYFpsVFzDi3ZOOn2U3E&pageType=column&tagId=%s&editType=null&pageId=%s')%(quote(tagId),pageId)
    return requests.get(u,headers=UA,timeout=25,verify=False).text
for pid in ['1229165367','1229248','1229129247','1229125874']:
    t=api(pid,'当前栏目列表1a')
    try:
        h=json.loads(t)['data']['html']
    except: print(pid,'fail',t[:100]); continue
    h=re.sub(r'\s+',' ',h)
    it=re.findall(r'<a title="([^"]{4,200})" target="_blank" href="([^"]+)">.*?(\d{4}-\d{2}-\d{2})',h)
    print('===',pid,len(it))
    for x in it[:10]: print('  ',x[2],x[0][:70],x[1][:60])
