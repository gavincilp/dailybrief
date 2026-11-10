import json,requests,urllib3
urllib3.disable_warnings()
s=requests.Session(); s.verify=False; s.headers['User-Agent']='Mozilla/5.0'
def load(u):
    return json.loads(s.get(u,timeout=30).content.decode('utf-8-sig'))['data']
for u in ["https://zjt.hubei.gov.cn/zfxxgk/zc/qtzdgkwj/zcwj.json","https://zjt.hubei.gov.cn/zfxxgk/zc/gfxwj/zcwj.json"]:
    print('==',u)
    d=load(u)
    for it in d[:10]:
        print(it['PUBDATE'],'|',it['FILETYPE'],'|',it['FILENUM'],'|',it['FILENAME'])
        print('   ',it['URL'])
