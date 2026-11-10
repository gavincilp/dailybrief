import requests, urllib3, re, json
from urllib.parse import quote
urllib3.disable_warnings()
UA={'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36','Referer':'https://jst.zj.gov.cn/'}
def api(pageId,tagId,pageType='column'):
    u=('https://jst.zj.gov.cn/api-gateway/jpaas-publish-server/front/page/build/unit?parseType=bulidstatic&webId=3162'
       '&tplSetId=ruXYFpsVFzDi3ZOOn2U3E&pageType=%s&tagId=%s&editType=null&pageId=%s')%(pageType,quote(tagId),pageId)
    r=requests.get(u,headers=UA,timeout=25,verify=False)
    return r.text
try:
    j=json.loads(api('1229159074','当前栏目列表1a'))
    print(json.dumps(j,ensure_ascii=False)[:1200])
except Exception as e:
    print('ERR',e); print(api('1229159074','当前栏目列表1a')[:400])
