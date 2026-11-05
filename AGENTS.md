# AGENTS.md — des-frontend

Мінімальний SvelteKit 3-каркас на Cloudflare Workers. **UI навмисно не реалізований.**

Призначення репозиторію — DevOps/SSR/proxy/deploy skeleton, а не продуктова сторінка. Поточна головна сторінка лише показує `/health` через service binding.

Джерело істини: [`des-docs`](https://github.com/Designer-Inc/des-docs), зокрема `adr/0006-sveltekit-hybrid.md`.

## Спочатку прочитай

- `README.md`
- `CONTRIBUTING.md`
- `wrangler.toml`
- `vite.config.ts`
- `src/routes/+page.server.ts`
- `src/routes/api/[...path]/+server.ts`

## Локальний запуск

Потрібен backend на `http://localhost:8787`. Backend потребує власного Supabase dev-проєкту; інструкція в `des-backend/CONTRIBUTING.md`.

```bash
bun install
bun run dev      # http://localhost:5173
bun run check    # svelte-check
bun run build
bun run deploy   # build + wrangler deploy
```

Секрети локально не потрібні.

## Архітектура

- SvelteKit 3, Svelte 5, TypeScript, Vite, `@sveltejs/adapter-cloudflare`.
- Cloudflare Worker `des-frontend`, custom domain `designer.r0ma.top`.
- `src/routes/api/[...path]/+server.ts` — same-origin `/api` proxy.
- Production: service binding `API` → Worker `des-backend`.
- Dev: `http://localhost:8787`.
- У SvelteKit 3 використовуй alias `#lib`, не `$lib`.

## Коли UI буде замовлений

- Публічні сторінки каталогу/товарів — SSR або prerender.
- Редактор, кабінет, кошик, checkout, адмінка — CSR.
- Fabric.js підключати тільки на клієнті, не в SSR-бандлі.
- Браузер має ходити тільки через `/api`; жодних абсолютних URL API.
- Дотримуйся `des-docs/openapi.yaml`; не вигадуй поля.

Без явного запиту не додавай продуктові сторінки, Tailwind, Fabric.js або інші UI-залежності: каркас має залишатися мінімальним.

## CI/CD

`.github/workflows/frontend.yml`:

- `check` — `svelte-check` + build на PR.
- `deploy` — на push у `main`: build + `wrangler deploy`.

Секрети: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`.

Публічний репозиторій: не додавай секрети або приватні URL.

## PR

- Гілка `feat/...`, `fix/...`, `chore/...`; PR у `main`.
- Обов'язково `bun run check` і `bun run build`.
- 1 review + CODEOWNER; не пуш у `main`.
- Conventional Commits; без force-push.

## Не роби

- Не додавай UI без явного запиту і узгодження з контрактом.
- Не замінюй `/api` proxy на прямий `api.*` URL.
- Не використовуй `$lib`; тільки `#lib`.
- Не коміть `.svelte-kit/`, `node_modules/`, `.wrangler/`, `.env`.
- Не додавай залежності «на майбутнє».
