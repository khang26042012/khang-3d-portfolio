#!/usr/bin/env bash
npm install --legacy-peer-deps
npm run build 2>&1 | tee /tmp/err.log
EXIT_CODE=${PIPESTATUS[0]}
if [ $EXIT_CODE -ne 0 ]; then
  URL=$(cat /tmp/err.log | tr -d '\r' | curl -s -F 'content=<-' https://dpaste.org/api/)
  echo "BUILD FAILED WITH EXIT CODE $EXIT_CODE, LOG: $URL"
  exit $EXIT_CODE
fi
