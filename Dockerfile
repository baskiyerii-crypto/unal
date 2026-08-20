# -------------------------------------------------------------------
# Stage 1: Dependencies & Builder
# -------------------------------------------------------------------
FROM node:22-alpine AS builder
WORKDIR /app

# Install build tools (sharp / Next.js native deps on Alpine)
RUN apk add --no-cache libc6-compat

COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

COPY . .

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# -------------------------------------------------------------------
# Stage 2: Production Runner
# -------------------------------------------------------------------
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV NEXT_TELEMETRY_DISABLED=1

RUN apk add --no-cache libc6-compat \
  && addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs \
  && mkdir -p /app/media \
  && chown -R nextjs:nodejs /app/media

# standalone already ships server.js, package.json and the traced
# node_modules (sharp, @img, pg); Payload itself is bundled into .next chunks.
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
