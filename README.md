# des-frontend

SvelteKit 3 + Svelte 5 + Tailwind CSS + Fabric.js 6 на Cloudflare Workers.

## Що є

- SSR landing, каталог і картка товару.
- CSR редактор на Fabric.js 6.
- Same-origin `/api/*` proxy на `des-backend` через Cloudflare service binding.
- Login/refresh через HttpOnly cookie `Path=/`.
- SEO: meta, canonical, JSON-LD, `sitemap.xml`, `robots.txt`.

## Локальна розробка

Потрібен запущений backend на `http://localhost:8787`.

```bash
bun install
bun run dev
```

Vite проксіює `/api` на `http://localhost:8787`. Frontend: `http://localhost:5173`.

```bash
bun run check
bun run build
```

## Деплой

```bash
bun run deploy
```

Cloudflare Worker `des-frontend`, custom domain `designer.r0ma.top`. У `wrangler.toml` є service binding `API` на Worker `des-backend`.

## CI/CD

`.github/workflows/frontend.yml`: `check` + `build` на push/PR, `deploy` на push у `main`.

Потрібні GitHub Secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

## Контракт

Джерело істини: [Designer-Inc/des-docs](https://github.com/Designer-Inc/des-docs), зокрема `adr/0006-sveltekit-hybrid.md`.
