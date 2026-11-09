# -*- coding: utf-8 -*-
import re,json,sys
from yt_fetch import zjj,portal
def items(r):
    try: h=json.loads(r.text)['data']['html']
    except Exception as e:
        return [('ERR',r.status_code,r.text[:100],'')]
    out=[]
    for m in re.finditer(r'<a[^>]+href="([^"]+)"[^>]*>(.*?)</a>\s*<span[^>]*>([^<]*)</span>',h,re.S):
        t=re.sub(r'<[^>]+>','',m.group(2)).strip()
        out.append((m.group(3).strip(),t,m.group(1)))
    if not out:
        for m in re.finditer(r'<a[^>]+href="([^"]+)"[^>]*>(.*?)</a>',h,re.S):
            t=re.sub(r'<[^>]+>','',m.group(2)).strip()
            if len(t)>5: out.append(('',t,m.group(1)))
    return out
if __name__=='__main__':
    mode=sys.argv[1]; pid=sys.argv[2]; pg=int(sys.argv[3]) if len(sys.argv)>3 else 1
    r=zjj(pid,pageNo=pg) if mode=='zjj' else portal(pid,pageNo=pg)
    it=items(r)
    print(f"== {mode} {pid} p{pg} HTTP{r.status_code} n={len(it)}")
    for d,t,h in it: print(d,'|',t[:70],'|',h[:90])
