import requests,re,bs4,json
requests.packages.urllib3.disable_warnings()
UA={'User-Agent':'Mozilla/5.0 Chrome/120'}
def rows(u):
    r=requests.get(u,headers=UA,verify=False,timeout=40); r.encoding='utf-8'
    s=bs4.BeautifulSoup(r.text,'html.parser'); z=s.find(id='zoom')
    out=[]
    for tr in z.find_all('tr'):
        cs=[re.sub(r'\s+','',td.get_text()) for td in tr.find_all(['td','th'])]
        if cs: out.append(cs)
    return out
for u,n in [("https://www.yantai.gov.cn/col/col43171/art/2026/art_76b9ead0747c40a1a44dc5b284a0e04e.html","ZJJ-Q3"),("https://www.yantai.gov.cn/col/col43171/art/2026/art_a64379642a214619ad66a866a01acdda.html","SFJ-Q3"),("https://www.yantai.gov.cn/col/col43171/art/2026/art_7666d4bfd4b04b629ca8d7f1ea464b62.html","SFJ拟失效")]:
    rs=rows(u); print('=====',n,len(rs))
    for i,x in enumerate(rs): print(i,' | '.join(x)[:160])
