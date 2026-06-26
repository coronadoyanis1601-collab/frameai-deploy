FROM node:18-slim

RUN apt-get update -y && apt-get install -y openssl ca-certificates

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY prisma ./prisma/
RUN npx prisma generate

COPY client ./client/
WORKDIR /app/client
RUN npm install && npm run build

WORKDIR /app
COPY server ./server/
COPY start.sh ./start.sh
RUN chmod +x start.sh

EXPOSE 3001

CMD ["/bin/bash", "start.sh"]
