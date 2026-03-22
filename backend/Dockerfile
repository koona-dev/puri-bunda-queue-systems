#backend/Dockerfile (Development)
FROM node:20-alpine

# Install pnpm dan dependencies sistem
RUN corepack enable && \
    corepack prepare pnpm@latest --activate

# Set working directory
WORKDIR /workspace

# Copy workspace configuration dari root
COPY pnpm-workspace.yaml ./
COPY package.json ./
COPY pnpm-lock.yaml ./

# Set working directory ke backend
WORKDIR /workspace/backend

# Copy backend package.json dan tsconfig
COPY backend/package.json backend/
COPY backend/tsconfig.json backend/
COPY backend/tsconfig.build.json* backend/
COPY backend/nest-cli.json backend/

# Install dependencies untuk seluruh workspace
WORKDIR /workspace
RUN pnpm install --frozen-lockfile

# Kembali ke backend directory
WORKDIR /workspace/backend

# Copy source code backend
COPY backend backend/

# Expose port untuk NestJS
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s \
    CMD node -e "require('http').get('http://localhost:3000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Development command
CMD ["pnpm", "start:dev"]