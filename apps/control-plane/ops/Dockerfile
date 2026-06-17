# Context: monorepo root
FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies first (for caching)
COPY package*.json ./
COPY apps/landing/package.json ./apps/landing/package.json
COPY apps/control-plane/ops/package.json ./apps/control-plane/ops/package.json
COPY apps/control-plane/api/package.json ./apps/control-plane/api/package.json
COPY apps/tenant/patient/package.json ./apps/tenant/patient/package.json
COPY apps/tenant/web/package.json ./apps/tenant/web/package.json
COPY apps/tenant/api/package.json ./apps/tenant/api/package.json
COPY packages/contracts/package.json ./packages/contracts/package.json
COPY packages/core/package.json ./packages/core/package.json
COPY packages/database/package.json ./packages/database/package.json
COPY packages/ui/package.json ./packages/ui/package.json

RUN npm ci

# Copy sources and build
COPY . .
RUN npx prisma generate --schema=packages/database/prisma/tenant.schema.prisma
RUN npx prisma generate --schema=packages/database/prisma/control-plane.schema.prisma
RUN npx turbo run build --filter=ops...

EXPOSE 3000
ENV PORT=3000
ENV NODE_ENV=production

CMD ["npm", "run", "start", "--workspace=ops"]
