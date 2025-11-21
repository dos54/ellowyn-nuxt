# 1) Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# Install deps (includes devDependencies, runs postinstall -> prisma generate)
COPY package*.json ./
COPY prisma ./prisma
RUN npm ci

# Copy source
COPY . .

# Nuxt production build
RUN npm run build


# 2) Runtime stage
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NITRO_PORT=3000
ENV PORT=3000

# Copy node_modules with prisma + @prisma/client already generated
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/.output ./.output
COPY package*.json ./

EXPOSE 3000

# Run migrations then start server
CMD ["sh", "-c", "npm run migrate:deploy && node .output/server/index.mjs"]
