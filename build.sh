#!/usr/bin/env bash
echo "=== STARTING RENDER BUILD DIAGNOSTIC ==="
node -v
npm -v

npm install --legacy-peer-deps 2>&1 | tee /tmp/npm-install.log
if [ $? -ne 0 ]; then
  echo "=== NPM INSTALL FAILED ==="
  curl -s -F 'content=<-' https://dpaste.org/api/ < /tmp/npm-install.log || true
  exit 1
fi

echo "=== RUNNING NEXT BUILD ==="
npm run build 2>&1 | tee /tmp/next-build.log
BUILD_STATUS=$?

if [ $BUILD_STATUS -ne 0 ]; then
  echo "=== NEXT BUILD FAILED ==="
  URL=$(curl -s -F 'content=<-' https://dpaste.org/api/ < /tmp/next-build.log)
  echo "BUILD ERROR LOG URL: $URL"
  exit $BUILD_STATUS
fi

echo "=== BUILD SUCCEEDED ==="
