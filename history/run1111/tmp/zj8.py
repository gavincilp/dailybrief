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
for tag in ['栏目列表','当前栏目列表','栏目列表list','其他文件']:
    h=api('1229129246',tag)
    it=re.findall(r'<a title="([^"]{4,200})" target="_blank" href="([^"]+)">.*?(\d{4}-\d{2}-\d{2})',re.sub(r'\s+',' ',h))
    print(tag,len(h),len(it)); 
    for x in it[:6]: print('  ',x[2],x[0][:60])
