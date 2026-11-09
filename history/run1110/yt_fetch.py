#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import requests, json, re, sys
from urllib.parse import quote
requests.packages.urllib3.disable_warnings()

UA = {"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36"}

def zjj(pageId, tpl="GC2egDexn2qAbtVty6wAZ", tag="当前栏目list", pageSize=30, pageNo=1, webId="179"):
    pj = json.dumps({"pageNo":pageNo,"pageSize":pageSize}, ensure_ascii=False, separators=(",",":"))
    url = ("https://zjj.yantai.gov.cn/api-gateway/jpaas-publish-server/front/page/build/unit"
           f"?parseType=bulidstatic&webId={webId}&tplSetId={tpl}&pageType=column"
           f"&tagId={quote(tag)}&editType=null&pageId={pageId}"
           f"&paramJson={quote(pj)}")
    r = requests.get(url, headers=UA, verify=False, timeout=40)
    return r

def portal(pageId, tpl="uo2n7cvvGR8iPKdzxdBuu", tag="当前栏目列表", pageSize=30, pageNo=1, webId="1"):
    pj = json.dumps({"pageNo":pageNo,"pageSize":pageSize}, ensure_ascii=False, separators=(",",":"))
    url = ("https://www.yantai.gov.cn/api-gateway/jpaas-publish-server/front/page/build/unit"
           f"?parseType=bulidstatic&webId={webId}&tplSetId={tpl}&pageType=column"
           f"&tagId={quote(tag)}&editType=null&pageId={pageId}"
           f"&paramJson={quote(pj)}")
    r = requests.get(url, headers=UA, verify=False, timeout=40)
    return r

def parse(html):
    out=[]
    # a with href + title/text, following span date
    for m in re.finditer(r'<a[^>]+href="([^"]+)"[^>]*?(?:title="([^"]*)")?[^>]*>(.*?)</a>(.{0,300}?)</li>', html, re.S):
        href,t,inner,rest=m.group(1),m.group(2),m.group(3),m.group(4)
        txt = re.sub(r'<[^>]+>','',inner).strip() or (t or '')
        d = re.search(r'(20\d\d[-/]\d\d?[-/]\d\d?)', rest)
        out.append((d.group(1) if d else '', txt[:80], href))
    if not out:
        for m in re.finditer(r'<a[^>]+href="([^"]+)"[^>]*>(.*?)</a>', html, re.S):
            txt=re.sub(r'<[^>]+>','',m.group(2)).strip()
            if len(txt)>6: out.append(('',txt[:80],m.group(1)))
    return out

if __name__=="__main__":
    mode=sys.argv[1]; pid=sys.argv[2]
    pg=int(sys.argv[3]) if len(sys.argv)>3 else 1
    r = zjj(pid,pageNo=pg) if mode=='zjj' else portal(pid,pageNo=pg)
    print("HTTP",r.status_code,"len",len(r.text))
    t=r.text
    print(t[:300].replace('\n',' '))
    items=parse(t)
    print("items",len(items))
    for d,x,h in items[:40]:
        print(d,'|',x,'|',h[:120])
