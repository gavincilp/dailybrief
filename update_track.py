# -*- coding: utf-8 -*-
import json
p = '/root/dailybrief/history/tracking.json'
d = json.load(open(p, encoding='utf-8'))
before = len(d['topics'])

def add(topic):
    d['topics'].append(topic)

# 1) 天津：智慧工地典型应用场景（首次建档）
add({
    "topic": "智慧工地技术应用典型应用场景（名录式推广）",
    "first_seen": "2026-10-10",
    "first_region": "天津市（市住房城乡建设委，2026-10-09 发布第一批智慧工地技术应用典型应用场景）",
    "regions": [
        {"region": "天津市", "date": "2026-10-09",
         "detail": "2026 年 3 月组织征集智慧工地技术应用场景（共 9 个），经资料审查与专家评审遴选 3 个项目为第一批典型应用场景并予发布；智慧工地建设本身为住建部长期部署事项，多地已推行，本系列首次记录「征集—评审—名录发布」体例"}
    ],
    "changes": [
        {"date": "2026-10-10", "change": "本期建档（10-10 午间二次复核补录），体例为本系列首次记录"}
    ]
})

# 2) 广州：建筑行业自律规范经营秩序（扩展既有「行业自律」主题）
hit = None
for t in d['topics']:
    if t['topic'].startswith('建设工程监理行业自律建设与多元共治'):
        hit = t
        break
assert hit is not None, 'industry self-discipline topic not found'
hit['regions'].append({
    "region": "广州市", "date": "2026-10-08",
    "detail": "转发上级《关于推进建筑行业自律建设规范我市房屋建筑工程领域经营秩序的通知》（穗建质〔2026〕590号，成文 2026-09-27）：自律范围由单一环节（监理／图审收费）扩展至房屋建筑工程领域经营秩序整体"
})
hit['changes'].append({"date": "2026-10-10", "change": "主题扩展：+广州（房建工程经营秩序整体，覆盖面较甘肃 09-24、佛山 10-06 更广），为第 3 个地区"})

# 3) 广西：BIM 技术应用试点项目经验做法（第三期，延续跟进）
add({
    "topic": "BIM 技术应用试点项目经验做法（省级批次推广）",
    "first_seen": "2026-10-10",
    "first_region": "广西壮族自治区（第三期，落款 2026-10-08／挂网 2026-10-09）",
    "regions": [
        {"region": "广西壮族自治区", "date": "2026-10-09",
         "detail": "印发《建筑信息模型（BIM）技术应用试点项目经验做法（第三期）》，推广南宁应急联动中心项目（绿色建筑二星级、近零能耗示范）BIM 全生命周期应用经验；属「试点—经验—推广」批次化延续，非新制度立规。同主题标准立规型条目：宁夏（竣工 BIM 交付技术导则）、深圳（既有建筑 BIM 建模技术标准）"}
    ],
    "changes": [
        {"date": "2026-10-10", "change": "本期建档（10-10 午间二次复核补录），计为延续跟进"}
    ]
})

d['last_updated'] = '2026-10-10'
d['notes'] = d['notes'].rstrip() + (
    " | 2026-10-10（第 46 期，同日二次复核补充）：10-10 午间对第 46 期执行同日复核，主窗口（10-09 07:30—10-10 12:30）"
    "经 8 组并行子代理复测，住建部本级与 31 省、9 重点城市（含武汉固定信源）窗口内零新增实质制度文件；"
    "补录此前漏收的窗口内条目 3 条：①天津第一批智慧工地技术应用典型应用场景（首次建档，10-09）；②广州转发建筑行业自律规范房建工程经营秩序（穗建质〔2026〕590号，10-08，扩展既有「行业自律」主题为第 3 个地区）；"
    "③广西 BIM 技术应用试点经验做法第三期（10-08，延续跟进）。主题总数 "
    + str(before) + " → " + str(len(d['topics'])) + "。"
    "市政公用事业与地下管网类已移出追踪范围主题维持 5 个，保留历史记录、不再跟进、不计入当日统计。"
)

# 校验：新增主题名不得与既有重复
existing = set(t['topic'] for t in d['topics'][:before])
for nm in ["智慧工地技术应用典型应用场景（名录式推广）", "BIM 技术应用试点项目经验做法（省级批次推广）"]:
    assert nm not in existing, ('dup with existing', nm)
json.dump(d, open(p, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('topics', before, '->', len(d['topics']))
print('last_updated', d['last_updated'])