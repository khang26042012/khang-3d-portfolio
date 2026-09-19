#!/usr/bin/env bash
echo "=== STARTING PRODUCTION SERVER ==="
echo "PORT: ${PORT:-10000}"
echo "NODE_ENV: ${NODE_ENV}"

# Run next start and capture any crash message
./node_modules/.bin/next start -H 0.0.0.0 -p ${PORT:-10000} 2>&1 | tee /tmp/next-runtime.log
EXIT_CODE=${PIPESTATUS[0]}

if [ $EXIT_CODE -ne 0 ]; then
  echo "=== NEXT START CRASHED WITH EXIT CODE $EXIT_CODE ==="
  URL=$(curl -s -F 'content=<-' https://dpaste.org/api/ < /tmp/next-runtime.log)
  echo "CRASH LOG: $URL"
  exit $EXIT_CODE
fi
