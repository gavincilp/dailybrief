import re,subprocess
UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"
pages={
"佛山":"https://fszj.foshan.gov.cn/zwgk/xxgkml/",
"中山":"https://jsj.zs.gov.cn/zwgk/tzgg/",
"南通":"https://zj.nantong.gov.cn/ntszjj/tzgg/tzgg.html",
"温州":"https://zjj.wenzhou.gov.cn/col/col1229212110/index.html",
"福州":"https://zjj.fuzhou.gov.cn/zwgk/tzgg/",
"威海":"https://zjj.weihai.gov.cn/col/col39821/index.html",
"临沂":"https://lyjs.linyi.gov.cn/",
"新乡":"https://zjj.xinxiang.gov.cn/",
"株洲":"https://zjj.zhuzhou.gov.cn/",
"保定":"https://zjj.baoding.gov.cn/",
"廊坊":"https://zjj.lf.gov.cn/",
"芜湖":"https://zjw.wuhu.gov.cn/",
"蚌埠":"https://zjj.bengbu.gov.cn/",
"马鞍山":"https://zjj.mas.gov.cn/",
}
d='%s'
import sys
