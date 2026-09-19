#!/usr/bin/env bash
echo "=== BUILD DIAGNOSTIC ==="
npm install --legacy-peer-deps 2>&1 | tee /tmp/npm.log
if [ $? -ne 0 ]; then
  URL=$(cat /tmp/npm.log | curl -s --data-binary @- https://paste.rs)
  echo "INSTALL ERROR: $URL"
  curl -s -X PATCH "https://api.render.com/v1/services/srv-dan15aqjnfac73evnf40/env-vars" \
    -H "Authorization: Bearer rnd_88VzG5OH98w3QBQKr41MNfirGbOT" \
    -H "Content-Type: application/json" \
    -d "[{\"key\": \"BUILD_LOG_URL\", \"value\": \"$URL\"}]" || true
  exit 1
fi

npm run build 2>&1 | tee /tmp/build.log
BUILD_STATUS=$?
if [ $BUILD_STATUS -ne 0 ]; then
  URL=$(cat /tmp/build.log | curl -s --data-binary @- https://paste.rs)
  echo "BUILD ERROR: $URL"
  curl -s -X PATCH "https://api.render.com/v1/services/srv-dan15aqjnfac73evnf40/env-vars" \
    -H "Authorization: Bearer rnd_88VzG5OH98w3QBQKr41MNfirGbOT" \
    -H "Content-Type: application/json" \
    -d "[{\"key\": \"BUILD_LOG_URL\", \"value\": \"$URL\"}]" || true
  exit $BUILD_STATUS
fi

echo "=== BUILD SUCCEEDED ==="

