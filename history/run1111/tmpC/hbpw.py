from playwright.sync_api import sync_playwright
import re,sys
urls=sys.argv[1:]
with sync_playwright() as p:
    b=p.chromium.launch(args=['--no-sandbox','--ignore-certificate-errors'])
    pg=b.new_page(ignore_https_errors=True,user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36')
    for u in urls:
        try:
            r=pg.goto(u,wait_until='domcontentloaded',timeout=45000)
            pg.wait_for_timeout(3000)
            print('###',u,r.status if r else None, pg.title()[:100])
            t=pg.inner_text('body')
            print(t[:1500].replace('\n\n','\n'))
        except Exception as e: print('###',u,'ERR',e)
    b.close()
