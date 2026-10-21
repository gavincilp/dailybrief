#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# setup_ssh_key.sh —— 云端运行前恢复 GitHub SSH 推送凭据
#
# 背景：云端沙箱每次启动 ~/.ssh 为空，导致简报无法推送。
#       本脚本在「〇、云端预检」阶段最先执行，自动装配密钥，使推送链路可用。
#
# 安全说明：本脚本**不含任何密钥内容**，密钥始终只存在于本机安全位置；
#           脚本只做「定位 → 落盘 → 校验指纹 → 写 config」，不打印密钥正文。
#
# 用法：
#   bash history/setup_ssh_key.sh            # 恢复（缺省动作）
#   bash history/setup_ssh_key.sh --check    # 仅检查当前是否可用，不做写入
#
# 退出码：0=凭据可用  1=恢复失败（调用方应转入降级模式：可生成简报但无法推送）
# ---------------------------------------------------------------------------
set -uo pipefail

KEY="${HOME}/.ssh/id_rsa"
PUB="${HOME}/.ssh/id_rsa.pub"
CONF="${HOME}/.ssh/config"
# 期望指纹：4096 位 RSA，注释 xinggavin@foxmail.com
EXPECT_FP="SHA256:xt14/vL4WkMX4+trCtAEE5qUknbwv2ZngxrW9fDKA8g"
REPO_HOST="github.com"

log() { printf '[ssh-key] %s\n' "$*"; }

write_config() {
  mkdir -p "$HOME/.ssh" && chmod 700 "$HOME/.ssh"
  if [ ! -f "$CONF" ] || ! grep -q "Host ${REPO_HOST}" "$CONF" 2>/dev/null; then
    cat >> "$CONF" <<CFG

Host ${REPO_HOST}
    HostName ${REPO_HOST}
    User git
    IdentityFile ${KEY}
    IdentitiesOnly yes
    StrictHostKeyChecking accept-new
CFG
    chmod 600 "$CONF"
    log "已写入 ~/.ssh/config"
  fi
}

fp_of() { ssh-keygen -l -f "$1" 2>/dev/null | awk '{print $2}'; }

# 握手探测：GitHub 对 `ssh -T` 恒以退出码 1 结束（不提供 shell），
# 因此**不可**用退出码或 pipefail 管道判定，只能匹配输出正文。
ssh_ok() {
  local out rc
  out="$(mktemp)"
  timeout 30 ssh -o BatchMode=yes -o ConnectTimeout=20 -T "git@${REPO_HOST}" >"$out" 2>&1
  rc=$?
  if grep -q "successfully authenticated" "$out" 2>/dev/null; then
    rm -f "$out"; return 0
  fi
  log "握手探测失败（ssh 退出码 ${rc}）"
  rm -f "$out"; return 1
}

# ---- 1. 已就位且指纹正确 → 直接复用 ---------------------------------------
if [ -s "$KEY" ]; then
  fp="$(fp_of "$KEY")"
  if [ "$fp" = "$EXPECT_FP" ]; then
    log "私钥已就位且指纹校验通过（${fp}）"
    write_config
    if ssh_ok; then
      log "SSH 握手验证通过：git@${REPO_HOST} 可推送"
    else
      log "握手未通过（网络受限或服务端延迟），密钥已就位，推送阶段可再试"
    fi
    exit 0
  else
    log "已存在私钥但指纹不符（${fp:-无法读取}），尝试重新恢复"
  fi
fi

# ---- 2. --check 模式到此为止 ----------------------------------------------
if [ "${1:-}" = "--check" ]; then
  log "检查模式：凭据不可用"
  exit 1
fi

# ---- 3. 按优先级定位密钥源 -------------------------------------------------
TMP="$(mktemp)"
trap 'rm -f "$TMP"' EXIT

restore_from_env() {
  [ -n "${SSH_PRIVATE_KEY:-}" ] || return 1
  printf '%s\n' "$SSH_PRIVATE_KEY" > "$TMP"
  [ "$(fp_of "$TMP")" = "$EXPECT_FP" ]
}

restore_from_file() { # $1=文件路径（可为 markdown，自动截取 PEM 块）
  [ -s "$1" ] || return 1
  if grep -q "BEGIN OPENSSH PRIVATE KEY" "$1" 2>/dev/null; then
    sed -n '/-----BEGIN OPENSSH PRIVATE KEY-----/,/-----END OPENSSH PRIVATE KEY-----/p' "$1" > "$TMP"
  else
    cp "$1" "$TMP"
  fi
  chmod 600 "$TMP"
  [ "$(fp_of "$TMP")" = "$EXPECT_FP" ]
}

CANDIDATES=(
  "$HOME/memory.md"
  "/workspace/memory.md"
  "$HOME/.ssh/id_rsa.bak"
  "/workspace/id_rsa"
  "/workspace/id_rsa.txt"
)

log "开始定位密钥源…"
FOUND=""
if restore_from_env; then
  FOUND="环境变量 SSH_PRIVATE_KEY"
else
  for f in "${CANDIDATES[@]}"; do
    if restore_from_file "$f"; then FOUND="$f"; break; fi
  done
  if [ -z "$FOUND" ]; then
    for f in /root/uploads/*id_rsa* /root/uploads/*.txt; do
      [ -s "$f" ] || continue
      if restore_from_file "$f"; then FOUND="$f"; break; fi
    done
  fi
fi

if [ -z "$FOUND" ]; then
  log "恢复失败：未找到与期望指纹匹配的私钥"
  log "  → 已尝试：环境变量 SSH_PRIVATE_KEY、memory.md 凭据存档章节、/root/uploads 上传件"
  log "  → 处置：本次按降级模式运行（照常生成简报与索引页，但不推送）"
  exit 1
fi

mkdir -p "$HOME/.ssh" && chmod 700 "$HOME/.ssh"
cp "$TMP" "$KEY" && chmod 600 "$KEY"
[ -s "$PUB" ] || ssh-keygen -y -f "$KEY" > "$PUB" 2>/dev/null
[ -s "$PUB" ] && chmod 644 "$PUB"
write_config

# ---- 4. 落盘后复验 ---------------------------------------------------------
fp="$(fp_of "$KEY")"
if [ "$fp" != "$EXPECT_FP" ]; then
  log "落盘后指纹校验失败（${fp:-无}）"
  exit 1
fi
log "已从「${FOUND}」恢复私钥，指纹 ${fp}"

if ssh_ok; then
  log "SSH 握手验证通过：git@${REPO_HOST} 可推送"
  exit 0
else
  log "警告：SSH 握手未通过（可能网络受限），但密钥已就位，推送阶段可再试"
  exit 0
fi
