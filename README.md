# Заметки + Todo (тестовое)

SPA на **Nuxt 4** + **Nuxt UI** + **Pinia**. Хранение данных (**localStorage**). Две основные страницы: список заметок и создание/редактирование (`/notes/[id]`, для новой — `new`).

- **Структура** — ориентир FSD: `entities`, `features`, `widgets`, `pages`, `shared`.
- **История undo/redo** в редакторе ограничена по числу снапшотов: константа **`MAX_EDITOR_HISTORY_STEPS`** в `app/features/note-editor/model/useEditorHistory.ts` (сейчас **20**).

### Стили (Tailwind → SCSS)

Изначально разметка и внешний вид приложения реализованы **на Tailwind**

В **последнем коммите** (в рамках приведения к формулировке задания про SCSS) вёрстка страниц и компонентов **переделана на `scoped` SCSS**

## Запуск

```bash
pnpm install
pnpm dev
```

Откроется `http://localhost:3000`.

## Docker

Сборка и запуск в Docker (порт **3000**):

```bash
docker compose up
```
