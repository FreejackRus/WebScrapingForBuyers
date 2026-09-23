FROM node:20-alpine AS dependencies
WORKDIR /app
COPY package.json package-lock.json tsconfig.base.json ./
COPY apps/gateway/package.json apps/gateway/package.json
COPY apps/identity/package.json apps/identity/package.json
COPY apps/search/package.json apps/search/package.json
COPY apps/analysis/package.json apps/analysis/package.json
COPY apps/web/package.json apps/web/package.json
COPY packages/contracts/package.json packages/contracts/package.json
COPY packages/service-kit/package.json packages/service-kit/package.json
RUN npm ci

FROM dependencies AS builder
COPY . .
RUN npm run build

FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=builder /app/packages/contracts/dist ./packages/contracts/dist
COPY --from=builder /app/packages/contracts/package.json ./packages/contracts/package.json
COPY --from=builder /app/packages/service-kit/dist ./packages/service-kit/dist
COPY --from=builder /app/packages/service-kit/package.json ./packages/service-kit/package.json

FROM runtime AS gateway
COPY --from=builder /app/apps/gateway/dist ./apps/gateway/dist
COPY --from=builder /app/apps/gateway/package.json ./apps/gateway/package.json
EXPOSE 3001
CMD ["node", "apps/gateway/dist/server.js"]

FROM runtime AS identity
COPY --from=builder /app/apps/identity/dist ./apps/identity/dist
COPY --from=builder /app/apps/identity/package.json ./apps/identity/package.json
EXPOSE 3002
CMD ["node", "apps/identity/dist/server.js"]

FROM runtime AS search
COPY --from=builder /app/apps/search/dist ./apps/search/dist
COPY --from=builder /app/apps/search/package.json ./apps/search/package.json
EXPOSE 3003
CMD ["node", "apps/search/dist/server.js"]

FROM runtime AS analysis
COPY --from=builder /app/apps/analysis/dist ./apps/analysis/dist
COPY --from=builder /app/apps/analysis/package.json ./apps/analysis/package.json
EXPOSE 3004
CMD ["node", "apps/analysis/dist/server.js"]

FROM dependencies AS web-builder
ARG VITE_BASE_PATH=/price-radar/
ENV VITE_BASE_PATH=$VITE_BASE_PATH
COPY . .
RUN npm run build -w @peremena/contracts && npm run build -w @peremena/web

FROM nginx:1.29-alpine AS web
COPY deploy/web.nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=web-builder /app/apps/web/dist /usr/share/nginx/html
EXPOSE 80
