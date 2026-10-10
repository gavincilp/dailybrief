import subprocess, json, re, html as H

cols = [
 ("政策发布","/zhengcefabu/index.html","8soTiiRMg3k87m5e2CQit","栏目-list"),
 ("建设要闻(工作动态)","/xinwen/gzdt/index.html","919e942639b5477d96e4c97471c61d9f","栏目-list"),
 ("领导动态","/xinwen/jsyw/index.html","f317736c953f43b893310d52b48aadaa","栏目-list"),
 ("部门规章(规章库)","/gongkai/zhengce/gzk/index.html","DDOs7kRcD3aqX6vDea1GY","内容1"),
 ("行政规范性文件","/gongkai/zc/xzgfxwjk/index.html","CddoJMk2fUTffhM06m29m","内容1"),
 ("重大政策","/gongkai/fdzdgknr/zgzygwywj/index.html","8809974b93084264aeaa2a6d9b669676","栏目-list"),
 ("标准公告","/gongkai/fdzdgknr/bzgg/index.html","Y53uSscFTKvrbHxaF9Cvp","栏目-list"),
 ("政策解读","/gongkai/fdzdgknr/zcjd/index.html","42de1cef4327490da16ba47e333f6bb0","栏目-list"),
 ("政策文件库","/gongkai/zc/wjk/index.html","vhiC3JxmPC8o7Lqg4Jw0E","内容1"),
]
API="https://www.mohurd.gov.cn/api-gateway/jpaas-publish-server/front/page/build/unit"
base=dict(parseType="bulidstatic",webId="86ca573ec4df405db627fdc2493677f3",
 tplSetId="fc259c381af3496d85e61997ea7771cb",pageType="column",editType="null")

out={}
for name,url,pid,tag in cols:
    args=["curl","-sL","--compressed","-m","30","-A","Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36","-G",API,
      "--data-urlencode","parseType=bulidstatic","--data-urlencode","webId=86ca573ec4df405db627fdc2493677f3",
      "--data-urlencode","tplSetId=fc259c381af3496d85e61997ea7771cb","--data-urlencode","pageType=column",
      "--data-urlencode",f"tagId={tag}","--data-urlencode","editType=null","--data-urlencode",f"pageId={pid}"]
    r=subprocess.run(args,capture_output=True,text=True)
    try:
        d=json.loads(r.stdout)
        h=d.get("data",{}).get("html","") or ""
    except Exception as e:
        h=""; print("ERR",name,e,r.stdout[:200])
    items=[]
    for m in re.finditer(r'<a[^>]*href="([^"]+)"[^>]*title="([^"]*)"[^>]*>.*?</a>\s*<span[^>]*>([\d\-\.]+)</span>', h):
        items.append((m.group(2),m.group(1),m.group(3)))
    # fallback: pair a and date spans sequentially
    if not items:
        hrefs=re.findall(r'<a[^>]*href="([^"]+)"[^>]*title="([^"]*)"', h)
        dates=re.findall(r'<span[^>]*>(20\d\d[-\d\.]*)</span>', h)
        for i,(hr,ti) in enumerate(hrefs):
            dt=dates[i] if i<len(dates) else "?"
            items.append((ti,hr,dt))
    out[name]={"url":url,"count":len(items),"items":items[:12]}
    print("="*70)
    print(name,"| index:",url,"| items:",len(items))
    for ti,hr,dt in items[:12]:
        print("  ",dt,"|",ti[:60],"|",hr)

json.dump(out,open("cols_out.json","w"),ensure_ascii=False,indent=1)
