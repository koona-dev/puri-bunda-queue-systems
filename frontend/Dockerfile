FROM node:20-alpine

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /workspace/frontend

COPY frontend/package.json ./

RUN pnpm install

COPY frontend ./s

EXPOSE 3000

CMD ["pnpm", "dev"]
