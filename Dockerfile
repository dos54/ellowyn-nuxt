# 1) Build stage
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY pnpm-lock.yaml* yarn.lock* .npmrc* ./ 2>/dev/null || true

RUN npm ci

COPY . .

# Nuxt 3/4: generate production build
RUN npm run build

# 2) Runtime stage
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NITRO_PORT=3000
ENV PORT=3000

COPY --from=builder /app/.output ./.output
COPY package*.json ./

RUN npm ci --omit=dev

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
