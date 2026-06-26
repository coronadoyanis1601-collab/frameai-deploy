#!/bin/bash
set -e

echo "=== FrameAI Starting ==="

echo ">>> Running Prisma DB push..."
npx prisma db push --skip-generate

echo ">>> Running seed (non-fatal)..."
node server/seed.js || echo "Seed skipped (already seeded)"

echo ">>> Starting server..."
exec node server/index.js
