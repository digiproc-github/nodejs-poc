FROM node:20-slim AS builder

WORKDIR /app

COPY . .

RUN npm ci
RUN npm run build

FROM node:20-slim

WORKDIR /app

COPY --from=builder ./app/build .
COPY --from=builder ./app/node_modules ./node_modules
COPY --from=builder ./app/package*.json ./

RUN npm prune --production
ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", "--enable-source-maps", "index.js"]
