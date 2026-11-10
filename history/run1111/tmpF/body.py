import requests,re,bs4,sys,io
requests.packages.urllib3.disable_warnings()
UA={'User-Agent':'Mozilla/5.0 Chrome/120'}
def get(u):
    r=requests.get(u,headers=UA,verify=False,timeout=40)
    r.encoding='utf-8'
    return r
def body(u,keys=None,n=1200):
    r=get(u); h=r.text
    s=bs4.BeautifulSoup(h,'html.parser')
    z=s.find(id='zoom')
    t=re.sub(r'\s+',' ',z.get_text(' ')) if z else ''
    pdf=re.search(r"var pdfUrl = '([^']+)'",h)
    pub=re.search(r'name="PubDate" content="([^"]*)"',h)
    print('URL',u); print(' HTTP',r.status_code,'len',len(h),'PubDate',pub.group(1) if pub else '-','pdf',pdf.group(1) if pdf else None)
    print(' zoomlen',len(z.get_text()) if z else 0)
    if keys:
        for k in keys:
            for m in re.finditer(k,t): print('  >>',k,':',t[max(0,m.start()-60):m.start()+160])
    return r,t
if __name__=='__main__':
    body(sys.argv[1], sys.argv[2:] if len(sys.argv)>2 else ['有效期'])
