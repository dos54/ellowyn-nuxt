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
# ARG DATABASE_URL=${DATABASE_URL}
# ENV DATABASE_URL=${DATABASE_URL}
# ARG GITHUB_CLIENT_SECRET=${GITHUB_CLIENT_SECRET}
# ENV GITHUB_CLIENT_SECRET=${GITHUB_CLIENT_SECRET}
# ARG GITHUB_CLIENT_ID=${GITHUB_CLIENT_ID}
# ENV GITHUB_CLIENT_ID=${GITHUB_CLIENT_ID}
# ARG AUTH_SECRET=${AUTH_SECRET}
# ENV AUTH_SECRET=${AUTH_SECRET}
# ARG DO_SPACES_ENDPOINT=${DO_SPACES_ENDPOINT}
# ENV DO_SPACES_ENDPOINT=${DO_SPACES_ENDPOINT}
# ARG DO_SPACES_KEY=${DO_SPACES_KEY}
# ENV DO_SPACES_KEY=${DO_SPACES_KEY}
# ARG DO_SPACES_SECRET=${DO_SPACES_SECRET}
# ENV DO_SPACES_SECRET=${DO_SPACES_SECRET}
# ARG DO_SPACES_BUCKET=${DO_SPACES_BUCKET}
# ENV DO_SPACES_BUCKET=${DO_SPACES_BUCKET}

# Copy node_modules with prisma + @prisma/client already generated
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/.output ./.output
COPY package*.json ./

EXPOSE 3000

# Run migrations then start server
CMD ["sh", "-c", "npm run migrate:deploy && node .output/server/index.mjs"]
