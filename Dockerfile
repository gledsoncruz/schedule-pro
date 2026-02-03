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

# Copiamos apenas os manifests primeiro para cache de dependências
COPY package.json package-lock.json ./

EXPOSE 3000


# =========================
# Development (DevContainer)
# =========================
FROM base AS dev
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=development

# Instala dependências (inclui devDependencies)
RUN npm install

# Código fonte (usado no devcontainer com bind mount)
COPY . .

CMD ["npm", "run", "dev"]


# =========================
# Builder (build do Next.js)
# =========================
FROM base AS builder

ENV NODE_ENV=production

# Reaproveita node_modules do dev para acelerar (opcional, mas seguro)
COPY --from=dev /app/node_modules ./node_modules

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
