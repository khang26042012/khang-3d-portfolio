#!/usr/bin/env bash
set -e
echo "=== BUILD DIAGNOSTIC ==="
node -v
npm -v

npm install --legacy-peer-deps
echo "=== TESTING NEXT BINARY ==="
./node_modules/.bin/next --version

echo "=== BUILDING NEXT.JS ==="
npm run build

echo "=== VERIFYING BUILD OUTPUT ==="
ls -la .next/
