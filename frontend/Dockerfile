FROM node:20-alpine

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /workspace

COPY pnpm-workspace.yaml ./
COPY package.json ./
COPY pnpm-lock.yaml ./

WORKDIR /workspace/frontend

COPY frontend/package.json frontend/

RUN pnpm install --frozen-lockfile

COPY frontend frontend/

EXPOSE 3000

CMD ["pnpm", "dev"]
