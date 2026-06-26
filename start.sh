#!/bin/bash

echo "=== FrameAI Starting ==="

echo ">>> DB push..."
./node_modules/.bin/prisma db push --skip-generate 2>&1 || true

echo ">>> Seeding..."
node server/seed.js 2>&1 || true

echo ">>> Starting server on port $PORT..."
exec node server/index.js
