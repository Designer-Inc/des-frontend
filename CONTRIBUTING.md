# Contributing

## Що це

Мінімальний SvelteKit-каркас для DevOps. UI ще не реалізований; не додавайте продуктові сторінки без узгодження з контрактом.

## Локальний запуск

Потрібен backend на `http://localhost:8787`.

```bash
git clone git@github.com:Designer-Inc/des-frontend.git
bun install
bun run dev
```

Frontend: `http://localhost:5173`. Vite проксіює `/api` на `8787`.

```bash
bun run check
bun run build
```

Секрети локально не потрібні. У production `/api` проксіюється через Cloudflare service binding.

## PR-флоу

1. Гілка `feat/...`, `fix/...` або `chore/...`.
2. Pull request у `main`.
3. Зелений `check` (typecheck + build).
4. Maintainer review і merge.
5. Merge у `main` автоматично деплоїть `des-frontend`.

`main` захищений: потрібен PR, зелені перевірки `check` і review від CODEOWNER. Прямий push у `main` заблокований (admin може bypass).

## Контракт

- API і схема БД змінюються в `des-docs`, не тут.
- Frontend використовує `#lib` alias (SvelteKit 3), не `$lib`.
- Публічні сторінки мають бути SSR/SSG, редактор — CSR; деталі в `adr/0006-sveltekit-hybrid.md`.
