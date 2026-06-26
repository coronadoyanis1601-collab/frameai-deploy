FROM node:18-slim

# OpenSSL requis par Prisma
RUN apt-get update -y && apt-get install -y openssl ca-certificates

WORKDIR /app

# Deps serveur
COPY package*.json ./
RUN npm install

# Prisma
COPY prisma ./prisma/
RUN npx prisma generate

# Build frontend
COPY client ./client/
WORKDIR /app/client
RUN npm install && npm run build

# Serveur
WORKDIR /app
COPY server ./server/

EXPOSE 3001

# Script de démarrage robuste
CMD sh -c "npx prisma db push --skip-generate && node server/seed.js ; node server/index.js"
