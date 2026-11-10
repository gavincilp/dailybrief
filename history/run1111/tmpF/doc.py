import requests,re,sys,bs4
requests.packages.urllib3.disable_warnings()
UA={'User-Agent':'Mozilla/5.0 Chrome/120'}
def txt(u):
    r=requests.get(u,headers=UA,verify=False,timeout=40)
    r.encoding = 'utf-8' if r.encoding is None or r.encoding.lower()=='iso-8859-1' else r.encoding
    h=r.text
    # if pdfUrl script
    m=re.search(r"var pdfUrl = '([^']+)'",h)
    return r.status_code,len(h),h,m
if __name__=='__main__':
    u=sys.argv[1]; print(txt(u)[:2])
