import subprocess,concurrent.futures as cf,sys
UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"
sites=[
("佛山","https://fszj.foshan.gov.cn/"),
("东莞","https://zjj.dg.gov.cn/"),
("中山","https://jsj.zs.gov.cn/"),
("无锡_民族宗教?","https://zjj.wuxi.gov.cn/"),
("南通","https://zj.nantong.gov.cn/"),
("常州","https://zjj.changzhou.gov.cn/"),
("徐州","https://zjj.xz.gov.cn/"),
("盐城","https://zjj.yancheng.gov.cn/"),
("连云港","https://zjj.lyg.gov.cn/"),
("温州","https://zjj.wenzhou.gov.cn/"),
("嘉兴","https://zjj.jiaxing.gov.cn/"),
("绍兴","https://zjj.sx.gov.cn/"),
("金华","https://zjj.jinhua.gov.cn/"),
("台州","https://zjj.zjtz.gov.cn/"),
("厦门","https://js.xm.gov.cn/"),
("泉州","https://zjj.quanzhou.gov.cn/"),
("福州","https://zjj.fuzhou.gov.cn/"),
("潍坊","https://zjj.weifang.gov.cn/"),
("淄博","https://zjj.zibo.gov.cn/"),
("威海","https://zjj.weihai.gov.cn/"),
("临沂","https://lyjs.linyi.gov.cn/"),
("洛阳","https://zjj.ly.gov.cn/"),
("新乡","https://zjj.xinxiang.gov.cn/"),
("许昌","https://zjj.xuchang.gov.cn/"),
("绵阳","https://zjj.mianyang.gov.cn/"),
("宜宾","https://zjj.yibin.gov.cn/"),
("南充","https://zjj.nanchong.gov.cn/"),
("襄阳","https://zjj.xiangyang.gov.cn/"),
("宜昌","https://zjj.yichang.gov.cn/"),
("株洲","https://zjj.zhuzhou.gov.cn/"),
("岳阳","https://zjj.yueyang.gov.cn/"),
("衡阳","https://zjj.hengyang.gov.cn/"),
("唐山","https://zjj.tangshan.gov.cn/"),
("保定","https://zjj.baoding.gov.cn/"),
("廊坊","https://zjj.lf.gov.cn/"),
("大连","https://zjj.dl.gov.cn/"),
("鞍山","https://zjj.anshan.gov.cn/"),
("沈阳","https://zjj.shenyang.gov.cn/"),
("芜湖","https://zjw.wuhu.gov.cn/"),
("蚌埠","https://zjj.bengbu.gov.cn/"),
("马鞍山","https://zjj.mas.gov.cn/"),
]
def p(t):
    n,u=t
    r=subprocess.run(["curl","-s","-L","--max-time","18","-k","-A",UA,"-o","/tmp/x_"+n.replace('/','_')[:8]+".html","-w","%{http_code}",u],capture_output=True)
    code=r.stdout.decode().strip()
    title=''
    try:
        b=open('/tmp/x_'+n.replace('/','_')[:8]+".html",'rb').read().decode('utf-8','ignore')
        import re
        m=re.search(r'<title>(.*?)</title>',b,re.S)
        title=m.group(1).strip()[:40] if m else ''
    except: pass
    return (n,u,code,title)
with cf.ThreadPoolExecutor(12) as ex:
    for r in ex.map(p,sites): print('\t'.join(r))
