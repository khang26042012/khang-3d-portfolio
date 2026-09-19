#!/usr/bin/env bash
set -e
npm ci --legacy-peer-deps || npm install --legacy-peer-deps
npm run build
