# 住建政策每日简报 · 云端运行规范（CLOUD_RUN）

> 本文件供**云端沙箱**中运行的自动化任务读取。本机（桌面端）运行时不需要读它。
> 站点根 ＝ 本仓库根目录；GitHub Pages 地址 https://gavincilp.github.io/dailybrief/

## 〇、第 0 步：恢复 SSH 推送凭据（每次运行最先执行）

云端沙箱每次启动 `~/.ssh` 为空，必须先装配密钥，否则后续推送必然失败。**在任何采集动作之前执行**：

```bash
bash history/setup_ssh_key.sh          # 恢复并验证（正常输出「SSH 握手验证通过」）
bash history/setup_ssh_key.sh --check   # 仅检查当前是否已可用，不写入
```

脚本行为（**自身不含任何密钥内容**，运行过程不打印密钥正文）：

1. 若 `~/.ssh/id_rsa` 已存在且指纹匹配 → 直接复用；
2. 否则按序从「环境变量 `SSH_PRIVATE_KEY` → 本机凭据存档（`memory.md` 的『GitHub 推送凭据存档』章节）→ `/root/uploads` 上传件」中定位私钥，自动截取 PEM 块、落盘为 `~/.ssh/id_rsa`（`chmod 600`）、补写 `~/.ssh/config`；
3. 落盘后校验指纹必须为 `SHA256:xt14/vL4WkMX4+trCtAEE5qUknbwv2ZngxrW9fDKA8g`，再做一次 `ssh -T git@github.com` 握手。

- 退出码 **0** ＝ 凭据可用，按正常流程运行（含推送）；
- 退出码 **1** ＝ 恢复失败，转入降级模式（照常生成简报与索引页，但不推送），并在回复首行说明原因。

> **判定陷阱**：GitHub 对 `ssh -T` 恒以**退出码 1** 结束（不提供 shell），因此判定握手成功必须匹配输出正文中的 `successfully authenticated`，**不可**依赖退出码或 `pipefail` 管道——否则会误判为失败。

## 一、为什么需要本文件

桌面端任务的历史数据放在本机工作区 `C:\Users\gavin\WorkBuddy\每日简报\`（脚本在根目录 `build_brief_list.py`）。
云端沙箱没有这台电脑的磁盘与本机 SSH 私钥，因此云端版必须：

1. 从 **GitHub 仓库** 取历史库（`history/tracking.json`、`history/issues_index.json`、`history/list_style.css`）；
2. 用仓库内的生成脚本重建索引页（`history/build_brief_list_cloud.py`，已按仓库路径改写）；
3. 先用第 0 步的 `history/setup_ssh_key.sh` 恢复密钥，再用 **SSH** 提交推送（本沙箱 HTTPS git 实测不可用，详见第八章）。

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

## 三、取仓库（第 0 步之后执行）

**优先走 SSH**（已实测可用；HTTPS git 在本沙箱会挂死，见第八章）：

```bash
git clone --depth 1 git@github.com:gavincilp/dailybrief.git site
# 已存在则
cd site && git pull --rebase
```

```bash
# 兜底：无 .git / clone 失败时，用 codeload 快照取全量工作树（含 history/）
curl -L -o /tmp/site.zip https://codeload.github.com/gavincilp/dailybrief/zip/refs/heads/main
unzip -q -o /tmp/site.zip -d /tmp/ && cp -r /tmp/dailybrief-main/* site/
```

> codeload 快照**不含 `.git`**。此时不要重新 clone 覆盖（会丢失当日产物），改用：
> ```bash
> cd site
> git init && git remote add origin git@github.com:gavincilp/dailybrief.git
> git fetch --depth 1 origin main
> git symbolic-ref HEAD refs/heads/main
> git reset --mixed origin/main     # 关键：只重置 HEAD 与 index，工作树保持不变
> ```
> 随后 `git status` 显示的差异即为本次改动，核对无误再提交。

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
git push origin main          # remote 应为 git@github.com:gavincilp/dailybrief.git
```

- remote 若是 `https://github.com/...`，先改为 SSH：`git remote set-url origin git@github.com:gavincilp/dailybrief.git`。
- 推送失败时重试一次；仍失败则在回复中说明原因，**不影响简报交付**。
- GitHub Pages 自动部署，约 1–2 分钟（实测约 30 秒）后线上更新。
- 收尾建议核验线上生效：`curl -sI https://gavincilp.github.io/dailybrief/住建动态简报_YYYY-MM-DD.html`（应为 200）。

## 六、降级模式（重要）

以下任一情形即进入降级模式：

- 仓库 clone 失败（网络不可达、无权限）；
- **第 0 步 `history/setup_ssh_key.sh` 退出码为 1**（私钥未找到／指纹不符 → 可读写通道未建立）；
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
| 推送 | 本机 SSH key | SSH（第 0 步 `history/setup_ssh_key.sh` 自动恢复凭据） |
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

### 补记：SSH 通道已验证成功（2026-10-13 18:46）

用户提供 **私钥**（OpenSSH 格式、4096 位 RSA、无密码）后，SSH 推送链路一次性打通：

```
cp id_rsa ~/.ssh/id_rsa && chmod 600 ~/.ssh/id_rsa
ssh -T git@github.com          # → Hi gavincilp/dailybrief! You've successfully authenticated
git init && git remote add origin git@github.com:gavincilp/dailybrief.git
git fetch --depth 1 origin main
git symbolic-ref HEAD refs/heads/main && git reset --mixed origin/main   # 关键：不覆盖工作树
git add -A && git commit -m "每日简报 2026-10-13" && git push -u origin main
```

**关键手法**：codeload 快照解压得到的工作树**没有 `.git`**，不要直接 `git clone` 覆盖（会丢失当日产物）。正确做法是 `git init` + `fetch` + **`git reset --mixed origin/main`**（只重置 HEAD 与 index，工作树保持不变），随后 `git status` 显示的差异即为本次改动，核对无误后再提交。

**指纹校验**：私钥指纹须与已登记公钥一致 —— `SHA256:xt14/vL4WkMX4+trCtAEE5qUknbwv2ZngxrW9fDKA8g`（可用 `ssh-keygen -l -f ~/.ssh/id_rsa` 与 `ssh-keygen -y -f ~/.ssh/id_rsa | ssh-keygen -l -f -` 双向比对）。

**实测结果**：`main 5cee66c..ad49cc1` 推送成功；GitHub Pages 约 30 秒内生效，在线简报页 HTTP 200、条目 15 条与本地一致。

> 结论更新：本沙箱 **HTTPS git 不可用、SSH git 可用**。云端任务应默认走 SSH；`git clone` 失败时用 codeload 兜底取历史库，再用上述 `init+fetch+reset --mixed` 手法补建 `.git` 完成推送。

### 补记二：凭据自愈脚本上线（2026-10-21）

云端沙箱每次启动 `~/.ssh` 为空，过去需人工补私钥才能推送。现已内置 `history/setup_ssh_key.sh` 并写入本文件**第 0 步**，实现凭据自愈：

| 项 | 说明 |
| --- | --- |
| 脚本 | `history/setup_ssh_key.sh`（`bash history/setup_ssh_key.sh` / `--check`） |
| 密钥存档位置 | 工作目录 **`memory.md`** 的「GitHub 推送凭据存档」章节 —— 该文件**不在 git 仓库内**，不会随推送外泄 |
| 恢复优先级 | 环境变量 `SSH_PRIVATE_KEY` → `memory.md` → `~/.ssh/id_rsa.bak` → `/workspace/id_rsa*` → `/root/uploads/*id_rsa*` |
| 校验 | 落盘后比对指纹 `SHA256:xt14/vL4WkMX4+trCtAEE5qUknbwv2ZngxrW9fDKA8g`，再握手一次 |
| 退出码 | 0＝可用（正常流程含推送）；1＝恢复失败（降级模式，照常出简报但不推送） |

**实测**：删除 `~/.ssh/id_rsa` 后运行脚本，约 3 秒内从 `memory.md` 恢复并落盘为 600 权限、指纹一致、`ssh -T` 握手成功。

**踩坑**：GitHub 对 `ssh -T` 恒返回**退出码 1**（不提供 shell），脚本早期版本因 `set -o pipefail` + `grep -q` 管道被这个非零码带偏、误报「握手未通过」。已改为把输出重定向到临时文件再匹配 `successfully authenticated`。

**安全红线**：本仓库是**公开仓库**，任何密钥正文都**不得**写入仓库内文件（脚本、文档一律只写逻辑与指纹，不写密钥）。若需轮换密钥：在 GitHub → Settings → SSH and GPG keys 删除旧公钥 → 重新生成 → 更新 `memory.md` 存档章节（脚本指纹常量 `EXPECT_FP` 需同步更新）。
