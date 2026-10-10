# -*- coding: utf-8 -*-
p = '/root/dailybrief/住建动态简报_2026-10-10.html'
s = open(p, encoding='utf-8').read()
css = open('/workspace/css_add.html', encoding='utf-8').read()
anchor = '</style>\n</head>'
assert s.count(anchor) == 1, ('anchor count', s.count(anchor))
if '第 46 期版式补全' in s:
    print('already applied')
else:
    s = s.replace(anchor, '</style>\n' + css + '\n</head>')
    open(p, 'w', encoding='utf-8').write(s)
    print('css inserted, size=', len(s))