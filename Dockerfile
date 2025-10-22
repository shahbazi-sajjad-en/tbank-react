# syntax = docker/dockerfile:1
FROM node:18-alpine AS builder

WORKDIR /app

# ابتدا فایل‌های وابستگی را کپی کن
COPY package.json package-lock.json* ./
RUN npm install --legacy-peer-deps --no-audit

# سپس تمام کد منبع را کپی کن (شامل فایل‌های پنهان)
COPY . .

# ساخت برنامه
RUN npm run build

# مرحله نهایی
FROM node:18-alpine AS runner
WORKDIR /app

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 8098
ENV PORT=8098
ENV HOSTNAME=0.0.0.0
ENV NODE_ENV=production

CMD ["node", "server.js"]