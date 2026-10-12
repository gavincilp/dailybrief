# -*- coding: utf-8 -*-
"""住建部 JPAAS 栏目抓取：提取 queryData -> 调 build/unit -> 解析列表"""
import re, gzip, sys, json, ssl
import urllib.request, urllib.parse, urllib.error

CTX = ssl.create_default_context()
CTX.check_hostname = False
CTX.verify_mode = ssl.CERT_NONE
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/126.0 Safari/537.36"

def fetch(url, extra=None):
    headers = {"User-Agent": UA, "Accept-Encoding": "gzip",
               "Accept": "text/html,application/json,*/*"}
    if extra:
        headers.update(extra)
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=30, context=CTX) as r:
            raw = r.read()
            if "gzip" in r.headers.get("Content-Encoding", ""):
                raw = gzip.decompress(raw)
            return r.status, raw.decode("utf-8", "ignore")
    except urllib.error.HTTPError as e:
        return e.code, ""
    except Exception as e:
        return "ERR:%s" % type(e).__name__, ""

def get_querydata(html):
    out = []
    for m in re.finditer(r"<script\b[^>]*queryData=[\"'](\{.*?\})[\"'][^>]*>", html, re.S):
        block = m.group(0)
        try:
            d = json.loads(m.group(1).replace("'", '"'))
        except Exception:
            continue
        u = re.search(r'url="([^"]+)"', block)
        out.append((u.group(1) if u else "", d.get("pageId"), d.get("tagId"),
                    d.get("tplSetId"), d.get("webId")))
    return out

def call_unit(host, url, pageId, tagId, tplSetId, webId, referer):
    q = urllib.parse.urlencode({
        "parseType": "bulidstatic", "webId": webId, "tplSetId": tplSetId,
        "pageType": "column", "tagId": tagId, "editType": "null", "pageId": pageId})
    st, body = fetch(host + url + "?" + q,
                     {"Referer": referer, "X-Requested-With": "XMLHttpRequest",
                      "Accept": "application/json, text/javascript, */*; q=0.01"})
    html = ""
    try:
        html = json.loads(body).get("data", {}).get("html", "")
    except Exception:
        html = ""
    return st, html

def parse_items(html):
    items = []
    for m in re.finditer(r'<a[^>]+href="([^"]+)"[^>]*>(.*?)</a>', html, re.S):
        href = m.group(1)
        txt = re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", m.group(2))).strip()
        if not txt:
            continue
        tail = html[m.end():m.end()+300]
        dt = re.search(r"(\d{4})[-/年](\d{1,2})[-/月](\d{1,2})", tail)
        date = ("%s-%02d-%02d" % (dt.group(1), int(dt.group(2)), int(dt.group(3)))) if dt else ""
        items.append((txt, href, date))
    return items

def do_column(url):
    print("=" * 100)
    print("COLUMN:", url)
    st, html = fetch(url)
    print("  index HTTP:", st, "len:", len(html))
    if not isinstance(st, int) or st != 200:
        return
    mk = re.search(r'MakeTime"\s+content="([^"]+)"', html)
    print("  MakeTime:", mk.group(1) if mk else "(none)")
    qds = get_querydata(html)
    print("  queryData count:", len(qds))
    host = "https://www.mohurd.gov.cn"
    for (u, pageId, tagId, tplSetId, webId) in qds:
        st2, h2 = call_unit(host, u, pageId, tagId, tplSetId, webId, url)
        items = parse_items(h2)
        print("  -> tag[%s] pageId[%s] HTTP:%s htmllen:%s items:%s" % (tagId, pageId, st2, len(h2), len(items)))
        for (t, h, d) in items[:12]:
            print("       %s | %s | %s" % (d, t[:70], h[:90]))

if __name__ == "__main__":
    for u in sys.argv[1:]:
        do_column(u)