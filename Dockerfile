ARG node_base_image=node:24-alpine
ARG nginx_base_image=nginxinc/nginx-unprivileged:alpine

FROM ${node_base_image} AS build
ARG VERSION=v0.0.0-dev
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME/bin:$PATH"
RUN corepack enable
WORKDIR /usr/local/src/app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY . .

RUN pnpm run build

FROM ${nginx_base_image} AS runtime

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/local/src/app/out /usr/share/nginx/html

EXPOSE 8080
