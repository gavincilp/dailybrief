import json,urllib.request,urllib.parse,re,sys
def post(url,data):
    r=urllib.request.Request(url,data=urllib.parse.urlencode(data).encode(),headers={'User-Agent':'Mozilla/5.0'})
    return urllib.request.urlopen(r,timeout=30).read().decode('utf-8','ignore')
def get(url):
    r=urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0','Referer':'https://cxjw.hangzhou.gov.cn/'})
    return urllib.request.urlopen(r,timeout=30).read().decode('utf-8','ignore')

def hz(col):
    base='https://cxjw.hangzhou.gov.cn/api-gateway/jpaas-publish-server/front/page/build/unit'
    d=dict(parseType='bulidstatic',webId='3301000007',tplSetId='',pageType='column',tagId='当前栏目列表',editType='null',pageId=col)
    try:
        t=get(f'https://cxjw.hangzhou.gov.cn/col/col{col}/index.html')
        q=re.search(r'queryData="(.*?)"',t)
        print(col,'queryData:',q.group(1)[:300] if q else None)
    except Exception as e: print('err',e)
hz('1692623'); hz('1229486199')
