FROM oven/bun:1 AS install
WORKDIR /app
COPY package.json bun.lock /
RUN bun install --frozen-lockfile
COPY . .
ARG VITE_SUPABASE_URL
ENV NODE_ENV=production
RUN --mount=type=secret,id=VITE_SUPABASE_ANON_KEY,env=VITE_SUPABASE_ANON_KEY \
    bun run build

    

FROM caddy:2.11.2-alpine
COPY --from=install /app/dist /usr/share/caddy/
COPY Caddyfile /etc/caddy/
EXPOSE 80 443
CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile"]