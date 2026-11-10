import re,json
from probe import zjj,menhu
def parse(h):
    out=[]
    for m in re.finditer(r'<a class="fl" href="([^"]+)"[^>]*>(.*?)</a>(.*?)</li>',h,re.S):
        url,title,rest=m.group(1),re.sub('<[^>]+>','',m.group(2)).strip(),m.group(3).strip()
        d=re.search(r'(\d{4}-\d{2}-\d{2})',rest)
        out.append((d.group(1) if d else '',title,url))
    return out
chans=[('zjj 政策法规',zjj,22907),('zjj 通知公告',zjj,22904),('zjj 工作动态',zjj,22906),('zjj 政策解读',zjj,22908),('zjj 行政许可公告',zjj,22924),('门户 col99959',menhu,99959),('门户 col99961',menhu,99961),('门户 col43171',menhu,43171),('门户 col99956',menhu,99956),('门户 col45031 意见征集',menhu,45031)]
allr={}
for name,fn,pid in chans:
    try:
        r=fn(pid); j=r.json()
        if not j.get('success'): print(name,'FAIL',r.text[:200]); continue
        items=parse(j['data']['html'])
        allr[name]=items
        print('==',name,len(items))
        for it in items[:12]: print('  ',it[0],it[1][:70],it[2])
    except Exception as e: print(name,'ERR',e)
json.dump(allr,open('allr.json','w'),ensure_ascii=False,indent=1)
