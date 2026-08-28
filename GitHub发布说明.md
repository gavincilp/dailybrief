# 每日简报 GitHub Pages 发布说明

## 一、已完成配置（全自动）

- 仓库：`git@github.com:gavincilp/dailybrief.git`（公开），SSH 认证已通过
- 本地仓库：`C:\Users\gavin\WorkBuddy\每日简报\output`（即站点根目录）
- 每日自动化（每天 8:30）在生成简报后自动执行：
  1. 将 `住建简报列表.html` 复制为 `index.html`（站点首页入口）
  2. `git add -A` + `git commit` + `git push origin main`
  3. **GitHub Pages 自动部署，无需任何手动操作**（约 1-2 分钟生效）
- 已推送内容：2026-08-25 ~ 08-28 共 4 期简报 + 列表索引页 + 政策追踪数据

## 二、需要手动完成（一次性，约 30 秒）

### 开启 GitHub Pages
- 打开 https://github.com/gavincilp/dailybrief/settings/pages
- **Build and deployment** 区域：
  - Source 选择 **Deploy from a branch**
  - Branch 选择 **main**，目录选 **/（root）**
- 点 **Save**，等待约 1-2 分钟首次构建完成

### 访问地址
- https://gavincilp.github.io/dailybrief/
- 首页为简报汇总索引页，可搜索、展开历史各期简报

## 三、日常维护（无需操作）

- **自动部署**：每天推送后 GitHub 自动重新发布，无需点击任何按钮
- 免费版限制：仓库 ≤ 1GB、Pages 站点带宽/构建次数有免费额度（当前 4 期简报约 200KB，远未触及）

## 四、备注
- 原 Gitee 仓库（gitee.com/xingjf/dailybrief）已不再作为发布目标，如不需要可自行删除或保留作备份。
