FROM node:16 AS builder

ARG graphql_endpoint
ARG graphql_endpoint_ws

# ビルドには devDependencies もインストールする必要があるため
ENV NODE_ENV=development

# 環境変数
ENV NEXT_PUBLIC_GRAPHQL_ENDPOINT=$graphql_endpoint
ENV NEXT_PUBLIC_GRAPHQL_ENDPOINT_WS=$graphql_endpoint_ws

WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build


FROM node:16-stretch-slim AS runner
ENV NODE_ENV=production

WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
# NODE_ENV=productionにしてyarn install(npm install)するとdevDependenciesがインストールされない
RUN yarn install
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
CMD ["yarn", "start"]
