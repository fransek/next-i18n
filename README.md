# @fransek/next-i18n

## Setup

```bash
npm install @fransek/next-i18n
```

```ts
// middleware.ts
import { i18nMiddleware } from "@fransek/next-i18n";

export default i18nMiddleware({
  locales: ["en", "sv", "es", "fr"] as const,
  default: "en",
});
```

```
src/
|-- app/
|   |-- [locale]/
|   |   |-- layout.tsx
|   |   |-- page.tsx
|-- middleware.ts
```

## locale()

Returns the current locale on the server.

## useLocale()

Returns the current locale on the client.
