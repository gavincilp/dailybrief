# 住建政策每日简报 · 云端运行规范（CLOUD_RUN）

> 本文件供**云端沙箱**中运行的自动化任务读取。本机（桌面端）运行时不需要读它。
> 站点根 ＝ 本仓库根目录；GitHub Pages 地址 https://gavincilp.github.io/dailybrief/

## 一、为什么需要本文件

桌面端任务的历史数据放在本机工作区 `C:\Users\gavin\WorkBuddy\每日简报\`（脚本在根目录 `build_brief_list.py`）。
云端沙箱没有这台电脑的磁盘与本机 SSH 私钥，因此云端版必须：

1. 从 **GitHub 仓库** 取历史库（`history/tracking.json`、`history/issues_index.json`、`history/list_style.css`）；
2. 用仓库内的生成脚本重建索引页（`history/build_brief_list_cloud.py`，已按仓库路径改写）；
3. 用 **HTTPS + Token** 提交推送（SSH 在云端不可用）。

## 二、云端工作目录布局（约定）

```
<任务工作目录>/
  site/                                 ← git clone 出来的站点仓库（＝站点根）
    .git/
    index.html                          ← 站点首页副本（＝住建简报列表.html）
    住建简报列表.html                     ← 索引页（由脚本生成，勿手改）
    住建动态简报_YYYY-MM-DD.html          ← 每日简报
    history/
      tracking.json                     ← 跨期主题库（唯一真相源）
      issues_index.json                 ← 索引页唯一数据源（46 期）
      list_style.css                    ← 索引页样式
      build_brief_list_cloud.py         ← 仓库内可用的索引页生成器
      CLOUD_RUN.md                      ← 本文件
```

## 三、取仓库（每次运行第一步）

```bash
# 有 Token（可写，推荐）
git clone https://$GH_TOKEN@github.com/gavincilp/dailybrief.git site
# 已存在则
cd site && git pull --rebase

# 无 Token（仅匿名只读；push 会失败 → 进入降级模式）
git clone https://github.com/gavincilp/dailybrief.git site
```

`$GH_TOKEN` 需具备该仓库的 **contents: write** 权限（classic PAT 勾 `repo`）。
提交前建议设置身份：

```bash
cd site
git config user.name  "workbuddy-bot"
git config user.email "xinggavin@foxmail.com"
```

## 四、生成与维护索引页

```bash
# 追加/更新当期元数据并重建索引页（在仓库根执行）
python history/build_brief_list_cloud.py --add '{"date":"YYYY-MM-DD","issue":N,"count":N,"first":X,"multi":Y,"cont":Z,"file":"住建动态简报_YYYY-MM-DD.html","abs":"今日重点：…"}'
# 仅预览不落盘
python history/build_brief_list_cloud.py --dry --today YYYY-MM-DD
# 同步站点首页
cp 住建简报列表.html index.html
```

脚本自动以「今天」为基准做时间分层（近一周逐日 / 本月其余按周 / 更早按月），并写入 `history/issues_index.json`（按 `date` 去重 upsert）。

## 五、发布

```bash
cd site
git add -A
git commit -m "每日简报 YYYY-MM-DD"
git push origin main          # 若 remote 仍为 git@github.com 形式，先 set-url 为 https://$GH_TOKEN@...
```

推送失败（无 token／网络）时重试一次；仍失败则在回复中说明原因，**不影响简报交付**。
GitHub Pages 自动部署，约 1–2 分钟后线上更新。

## 六、降级模式（重要）

以下任一情形即进入降级模式：

- 仓库 clone 失败（网络不可达、无权限）；
- 无 `GH_TOKEN`（可读不可写）；
- `history/tracking.json` 缺失。

降级模式下：

- **不做**跨期「首次出现／多次出现」判定与列表页维护（避免无依据的标签）；
- 仅执行采集 → 生成当日 `住建动态简报_YYYY-MM-DD.html` → `present_files` 交付；
- 回复首行注明「降级模式：未获取历史库／未发布」，并说明缺失原因。

## 七、与桌面端任务的分工建议

| 项 | 桌面端任务（现有，07:30） | 云端任务 |
| --- | --- | --- |
| 历史库 | 本机 + 仓库双写 | 仅仓库 |
| 生成脚本 | 工作区根 `build_brief_list.py` | 仓库内 `history/build_brief_list_cloud.py` |
| 推送 | 本机 SSH key | HTTPS + `GH_TOKEN` |
| 依赖 | 电脑需开机 | 无需开机，7×24 |

**若两者同时启用，务必保证幂等**：云端任务应先检查当日是否已存在 `住建动态简报_YYYY-MM-DD.html` 且 `issues_index.json` 已含该日期；若已存在则跳过生成，仅做一次 `git pull` 并退出。

## 八、云端通道与凭据故障排查（2026-10-13 实测补记）

**现象与实测结论**（本沙箱环境）：

| 通道 | 结果 | 处置 |
| --- | --- | --- |
| `git clone https://github.com/...` | **挂死**：`Failed to connect to github.com port 443 after ~135s`（已试 2 次 clone + 1 次 `ls-remote`，均超时） | 放弃 HTTPS git 通道 |
| `curl https://github.com/` | 可达（HTTP 200），带 `--resolve` 时 0.085s，不带时约 13s（DNS 慢） | 与 git 无关，不能推断 git 可用 |
| `curl https://api.github.com/` | 可达（HTTP 200，约 1.2s） | — |
| `codeload` 快照 `https://codeload.github.com/gavincilp/dailybrief/zip/refs/heads/main` | **可达**（HTTP 200，约 6.0 MB） | **历史库兜底方案**：解压即得全量工作树（含 `history/`），可正常做跨期标签与列表页维护 |
| SSH `git@github.com:22` | **可达并握手成功**（返回 `Permission denied (publickey)` = 服务端正常、仅缺密钥） | **推送首选通道** |

**结论**：本沙箱「HTTPS git 不可用、SSH git 可用」。因此：

1. **取历史库**：优先 `git clone`；失败后改用 codeload 快照兜底（此时站点根无 `.git`，跨期判定与列表页维护照常，仅推送不可行）。
2. **推送**：走 SSH（`git@github.com:gavincilp/dailybrief.git`），须在 `~/.ssh/id_rsa` 放置**私钥**（`chmod 600`）并配置 `~/.ssh/config`（`IdentityFile`、`IdentitiesOnly yes`）。**公钥不能用于认证**。
3. 若改用 Token，须 `export GITHUB_TOKEN=…` 后走 HTTPS——但在本沙箱大概率仍会挂死，不建议。
4. 平台 GitHub 连接器未授权时，其取 token 接口返回 **HTTP 404**（非 401/403），可据此快速判定「未授权」。

**一键补推脚本**：仓库外 `/workspace/push_dailybrief.sh`（私钥或 Token 就位后执行，自动补建 `.git`、提交并推送 main）。
