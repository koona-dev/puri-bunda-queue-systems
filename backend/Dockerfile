#backend/Dockerfile (Development)
FROM node:20-alpine

# Install pnpm dan dependencies sistem
RUN corepack enable && \
    corepack prepare pnpm@latest --activate

# Set working directory ke backend
WORKDIR /workspace/backend

# Copy backend package.json dan tsconfig
COPY backend/package.json ./
COPY backend/tsconfig.json ./
COPY backend/nest-cli.json ./

RUN pnpm install

# Copy source code backend
COPY backend/ ./

# Expose port untuk NestJS
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s \
    CMD node -e "require('http').get('http://localhost:8080/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Development command
CMD ["pnpm", "start:dev"]