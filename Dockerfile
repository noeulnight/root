FROM node:25-alpine AS builder

WORKDIR /app

RUN npm install -g pnpm@10.27.0

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build

FROM golang:1.26-alpine AS backend-builder

WORKDIR /src/backend

COPY backend/go.mod ./
COPY backend ./
RUN CGO_ENABLED=0 GOOS=linux go build -o /out/server ./cmd/server

FROM alpine:3.22 AS runner

WORKDIR /app

COPY --from=backend-builder /out/server /app/server
COPY --from=builder /app/dist /app/dist

ENV PORT=8080
ENV STATIC_DIR=/app/dist

EXPOSE 8080

CMD ["/app/server"]
