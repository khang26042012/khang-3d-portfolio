#!/usr/bin/env bash
echo "=== EXECUTING REAL NEXT BUILD ==="
npm install --legacy-peer-deps

mkdir -p public
npm run build > public/build-log.txt 2>&1
BUILD_STATUS=$?

echo "BUILD STATUS: $BUILD_STATUS"
cat public/build-log.txt | tail -n 30

if [ $BUILD_STATUS -ne 0 ]; then
  echo "NEXT BUILD FAILED! Creating fallback build so we can inspect /build-log.txt on live server"
  mkdir -p .next
  echo "error-build" > .next/BUILD_ID
fi
