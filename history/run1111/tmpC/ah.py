import requests,re,urllib3
urllib3.disable_warnings()
H={'User-Agent':'Mozilla/5.0','Referer':'https://dohurd.ah.gov.cn/public/column/6991?type=4&catId=43797551&action=list','X-Requested-With':'XMLHttpRequest'}
def get(cat,pg=1):
    u=f"https://dohurd.ah.gov.cn/site/label/8888?labelName=publicInfoList&siteId=6804621&organId=6991&pageSize=15&pageIndex={pg}&action=list&isDate=true&dateFormat=yyyy-MM-dd&type=4&catIds={cat}&file=/jh4/zjt/xxgk/publicInfoList_newest2022"
    r=requests.get(u,headers=H,verify=False,timeout=30); return r.text
for name,cat in [('行政规范性文件','43797551'),('其他政策文件','43797551'.replace('51','61')),('公示公告','43796261'),('调控政策','6715291'),('住房保障','6715451'),('老旧小区改造','43796331'),('建筑市场监管','43794721')]:
    h=get(cat)
    items=re.findall(r'href="(/public/6991/\d+\.html)"[^>]*>\s*([^<]{6,120}?)\s*</a>.*?(\d{4}-\d{2}-\d{2})',h,re.S)
    print('==',name,cat,len(items))
    for it in items[:5]: print('  ',it[2],it[1][:55],it[0])
