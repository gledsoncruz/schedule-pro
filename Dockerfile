# =========================
# Base (glibc - compatível com Next.js / SWC / Turbopack)
# =========================
FROM node:20-slim AS base

# Dependências necessárias para builds nativos
RUN apt-get update && apt-get install -y \
  git \
  python3 \
  make \
  g++ \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

EXPOSE 3000


# =========================
# Development (DevContainer)
# =========================
FROM base AS dev

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=development

# Código e dependências são gerenciados pelo DevContainer (bind mount)
CMD ["npm", "run", "dev"]


# =========================
# Builder (build do Next.js)
# =========================
FROM base AS builder

ENV NODE_ENV=production

# Copiamos apenas os manifests para cache
COPY package.json package-lock.json ./

# Instala apenas deps de produção para o build
RUN npm ci

# Copia o código completo
COPY . .

# Build do Next.js
RUN npm run build


# =========================
# Production (imagem final)
# =========================
FROM node:20-slim AS production

ENV NODE_ENV=production

WORKDIR /app

# Usuário não-root (boa prática em produção)
RUN groupadd -g 1001 nodejs \
  && useradd -m -u 1001 -g nodejs nextjs

# Copiamos apenas o necessário para runtime
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

USER nextjs

EXPOSE 3000

CMD ["npm", "start"]
