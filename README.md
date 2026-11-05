# des-frontend

Мінімальний SvelteKit-каркас для DevOps: SSR, same-origin `/api` proxy на `des-backend`, деплой на Cloudflare Workers.

UI ще не реалізований. Головна сторінка показує відповідь `/health` і потрібна лише для перевірки, що SSR і service binding працюють.

## Локально

Потрібен backend на `http://localhost:8787`.

```bash
bun install
bun run dev
```

Frontend: `http://localhost:5173`. Vite проксіює `/api` на backend.

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
