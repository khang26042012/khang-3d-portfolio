#!/usr/bin/env bash
set -e
echo "=== EXECUTING PRODUCTION BUILD ==="
npm install --legacy-peer-deps
npm run build
echo "=== BUILD COMPLETED SUCCESSFULLY ==="
