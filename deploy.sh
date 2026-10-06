#!/usr/bin/env bash
# =============================================================
#   شركة المذاق العصري — سكربت النشر
#   يدفع الكود إلى GitHub ثم ينشر على Cloudflare Pages
#   شغّل السكربت بعد ضبط المتغيرات في الأسفل
# =============================================================

set -euo pipefail

# -------- إعدادات يجب ضبطها --------
GITHUB_USERNAME="${GITHUB_USERNAME:-CHANGE_ME}"          # مثال: faisal-alkhateeb
GITHUB_REPO="${GITHUB_REPO:-CHANGE_ME}"                  # مثال: mazaq-asri-admin
GITHUB_TOKEN="${GITHUB_TOKEN:-}"                         # Personal Access Token (scopes: repo)

CF_ACCOUNT_ID="${CF_ACCOUNT_ID:-CHANGE_ME}"               # Account ID من Cloudflare
CF_API_TOKEN="${CF_API_TOKEN:-}"                         # API Token من Cloudflare (صلاحيات Pages:Edit)
CF_PROJECT_NAME="${CF_PROJECT_NAME:-modrtn-taste-company}"  # اسم مشروع Pages
# ------------------------------------

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT_DIR"

echo "▶︎ التأكد من تثبيت wrangler…"
if ! command -v wrangler >/dev/null 2>&1; then
  echo "  → wrangler غير مثبت. ثبّته عبر: npm i -g wrangler"
fi

echo "▶︎ دفع الكود إلى GitHub…"
if [ -n "$GITHUB_TOKEN" ] && [ "$GITHUB_USERNAME" != "CHANGE_ME" ]; then
  REPO_URL="https://${GITHUB_TOKEN}@github.com/${GITHUB_USERNAME}/${GITHUB_REPO}.git"
  if ! git remote get-url origin >/dev/null 2>&1; then
    git remote add origin "$REPO_URL"
  else
    git remote set-url origin "$REPO_URL"
  fi
  git push -u origin main
else
  echo "  → تم تخطّي GitHub: لم يتم تزويد GITHUB_TOKEN."
fi

echo "▶︎ النشر على Cloudflare Pages…"
if command -v wrangler >/dev/null 2>&1 && [ "$CF_ACCOUNT_ID" != "CHANGE_ME" ]; then
  export CLOUDFLARE_ACCOUNT_ID="$CF_ACCOUNT_ID"
  if [ -n "$CF_API_TOKEN" ]; then
    export CLOUDFLARE_API_TOKEN="$CF_API_TOKEN"
  fi
  wrangler pages deploy . --project-name="$CF_PROJECT_NAME"
else
  echo "  → تم تخطّي Cloudflare: wrangler غير متوفر أو CF_ACCOUNT_ID غير مضبوط."
fi

echo "✅ تم الانتهاء."