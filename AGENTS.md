# AGENTS.md — des-frontend

## Призначення файлу

Цей файл описує, **як агенти працюють з репозиторієм**. Це не звіт про поточний стан, не список сторінок і не changelog.

Не оновлюй цей файл під кожну фічу, версію або зміну UI. Актуальний стан читай у:

- `README.md`
- `CONTRIBUTING.md`
- `package.json`
- `src/routes/`
- `wrangler.toml`
- [`des-docs`](https://github.com/Designer-Inc/des-docs), зокрема `adr/0006-sveltekit-hybrid.md`

`des-frontend` — frontend-застосунок. Джерело істини API, схеми та продуктових правил — `des-docs`. Не вигадуй поля API або бізнес-логіку.

## Спочатку прочитай

- `README.md`
- `CONTRIBUTING.md`
- `adr/0006-sveltekit-hybrid.md` у `des-docs`
- `package.json`
- `wrangler.toml`
- `vite.config.ts`
- `src/routes/api/[...path]/+server.ts`

Не покладайся на цей файл як на джерело поточного стану або переліку сторінок.

## Локальна розробка

- Використовуй Bun і наявний lockfile.
- Потрібен запущений backend на `http://localhost:8787`.
- Backend потребує власного Supabase dev-проєкту; інструкція в `des-backend/CONTRIBUTING.md`.
- Секрети локально не потрібні.
- Використовуй scripts з `package.json`:

```bash
bun install
bun run dev
bun run check
bun run build
bun run deploy
```

## Архітектурні правила

- Браузер ходить тільки на same-origin `/api`. Жодних абсолютних URL API у клієнтському коді.
- `/api` проксіюється server-side на backend: service binding у production, `localhost` у dev. Не обходь proxy.
- Публічні сторінки — SSR або prerender; редактор і приватні сторінки — CSR. Дотримуйся `ADR-0006`.
- Fabric.js та інші browser-only бібліотеки не повинні потрапляти в SSR-бандл.
- Використовуй module alias, налаштований у проєкті (`package.json`/`tsconfig`). Не додавай другий alias.
- Не додавай нові залежності, UI-бібліотеки або продуктові сторінки без явного запиту й узгодження з контрактом.
- Тримай каркас мінімальним; не додавай код «на майбутнє».

## CI/CD

- Workflow: `.github/workflows/frontend.yml`.
- PR: typecheck/build без production-секретів.
- Merge у `main`: build і deploy Worker.
- Секрети описані в `README.md`. Не друкуй їх і не коміть.
- Не пуш у `main`: працюй через PR, green checks і review/CODEOWNER.
- Conventional Commits. Без force-push.

Якщо PR з форка, workflows можуть вимагати ручного approve від maintainer.

## Безпека

Репозиторій публічний. Не додавай секрети, токени, приватні URL або персональні дані.

## Заборонено

- Додавати продуктові сторінки/UI без явного запиту й контракту.
- Замінювати `/api` proxy на прямий API URL.
- Вводити другий module alias.
- Додавати залежності «на майбутнє».
- Комітити `.svelte-kit/`, `node_modules/`, `.wrangler/`, build-артефакти.
- Пушити в `main`, робити force-push або переписувати теги.
- Дублювати в цьому файлі поточний список сторінок, версії або статус фіч.
