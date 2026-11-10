import json,requests,re
s=requests.Session(); s.headers['User-Agent']='Mozilla/5.0'
s.verify=False
import urllib3; urllib3.disable_warnings()
for u in ["https://zjt.hubei.gov.cn/zfxxgk/zc/qtzdgkwj/zcwj.json","https://zjt.hubei.gov.cn/zfxxgk/zc/gfxwj/zcwj.json","https://zjt.hubei.gov.cn/zfxxgk/zc/gfxwj/zcwj.json"]:
    try:
        r=s.get(u,timeout=30); print(u,r.status_code,len(r.text))
        t=r.text.strip().lstrip('\ufeff')
        try:
            d=json.loads(t)
        except Exception as e:
            print('json err',e,t[:200]); continue
        items=d if isinstance(d,list) else d.get('data') or d.get('list') or list(d.values())[0]
        print(type(items),len(items))
        print(items[:2] if isinstance(items,list) else str(items)[:300])
    except Exception as e: print(u,e)
