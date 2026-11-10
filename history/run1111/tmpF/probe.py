import requests, json, urllib.parse, sys
requests.packages.urllib3.disable_warnings()
UA={'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36'}
BASE_BASE='https://zjj.yantai.gov.cn/api-gateway/jpaas-publish-server/front/page/build/unit'
def zjj(pid,tag='当前栏目list',page=1,size=30):
    p=json.dumps({"pageNo":page,"pageSize":size},separators=(',',':'))
    q={'parseType':'bulidstatic','webId':'179','tplSetId':'GC2egDexn2qAbtVty6wAZ','pageType':'column','tagId':tag,'editType':'null','pageId':str(pid),'paramJson':p}
    r=requests.get(BASE_BASE,params=q,headers=UA,verify=False,timeout=30)
    return r
def menhu(pid,tag='当前栏目列表',page=1,size=30):
    p=json.dumps({"pageNo":page,"pageSize":size},separators=(',',':'))
    q={'parseType':'bulidstatic','webId':'1','tplSetId':'uo2n7cvvGR8iPKdzxdBuu','pageType':'column','tagId':tag,'editType':'null','pageId':str(pid),'paramJson':p}
    r=requests.get(BASE_BASE,params=q,headers=UA,verify=False,timeout=30)
    return r
if __name__=='__main__':
    r=zjj(22907); print(r.status_code, len(r.content)); print(r.text[:600])
