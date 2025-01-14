# @fransek/next-i18n

[![Version](https://img.shields.io/npm/v/@fransek/next-i18n)](https://npmjs.com/package/@fransek/next-i18n)
[![Downloads](https://img.shields.io/npm/dm/@fransek/next-i18n.svg)](https://npmjs.com/package/@fransek/next-i18n)
[![Minzipped size](https://img.shields.io/bundlephobia/minzip/@fransek/next-i18n)](https://bundlephobia.com/package/@fransek/next-i18n)

A simple i18n library for Next.js.

## Setup

```bash
npm i @fransek/next-i18n
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
