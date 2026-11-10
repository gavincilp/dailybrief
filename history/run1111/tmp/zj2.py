import requests, urllib3, re, time, json
from urllib.parse import quote
urllib3.disable_warnings()
UA={'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36','Referer':'https://jst.zj.gov.cn/'}
def api(pageId,tagId,pageType='column',n=2):
    u=('https://jst.zj.gov.cn/api-gateway/jpaas-publish-server/front/page/build/unit?parseType=bulidstatic&webId=3162'
       '&tplSetId=ruXYFpsVFzDi3ZOOn2U3E&pageType=%s&tagId=%s&editType=null&pageId=%s&paramJson=%s')%(pageType,quote(tagId),pageId,quote('{"pageNo":1,"pageSize":40}'))
    for i in range(n):
        try:
            r=requests.get(u,headers=UA,timeout=25,verify=False)
            print(pageId,tagId,r.status_code,len(r.content))
            if r.status_code==200 and len(r.content)>100: return r.json()
        except Exception as e: print('ERR',e)
        time.sleep(1)
d=api('FkL0euSBTo2xtPC9pR6f2','要闻')
s=json.dumps(d,ensure_ascii=False)
print(len(s))
for m in re.finditer(r'title[\'"]?\s*[:=]\s*[\'"]([^\'"]{5,120})[\'"]',s):
    print(m.group(1))
