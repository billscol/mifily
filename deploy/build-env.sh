#!/bin/sh
# Generates a build-time-only apps/web/.env so `next build` doesn't crash:
# several lib/**/client.ts modules construct SDK clients (Plain, Stripe,
# Tinybird, Intercom, etc.) at module scope, and some of those throw if
# their key/url env var is empty. Real values are injected at runtime via
# docker-compose's `env_file: .env` on the server; this file never leaves
# the build stage.
set -eu

OUT=apps/web/.env
: > "$OUT"

grep -oE '^[A-Z0-9_]+=' apps/web/.env.example | sed 's/=$//' | sort -u |
while read -r key; do
  case "$key" in
    DATABASE_URL)
      echo "$key=\"mysql://user:pass@localhost:3306/db\"" ;;
    *_URL | *_ENDPOINT | *_DOMAIN)
      echo "$key=\"https://build-time-placeholder.invalid\"" ;;
    *)
      echo "$key=\"build-time-placeholder\"" ;;
  esac
done >> "$OUT"
