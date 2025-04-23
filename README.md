# @fransek/next-i18n

[![Version](https://img.shields.io/npm/v/@fransek/next-i18n)](https://npmjs.com/package/@fransek/next-i18n)
[![Downloads](https://img.shields.io/npm/dm/@fransek/next-i18n.svg)](https://npmjs.com/package/@fransek/next-i18n)
[![Minzipped size](https://img.shields.io/bundlephobia/minzip/@fransek/next-i18n)](https://bundlephobia.com/package/@fransek/next-i18n)

A simple i18n library for Next.js.

## Setup

1. Install the package:

```bash
npm i @fransek/next-i18n
# or
yarn add @fransek/next-i18n
# or
pnpm add @fransek/next-i18n
```

2. Create a config file somewhere in your project, e.g. `src/lib/i18n.ts`:

```ts
import { createHooks, defineConfig } from "@fransek/next-i18n";

export const i18n = defineConfig({
  locales: ["en", "sv"],
  defaultLocale: "en",
});

export const { useContent, useLocale } = createHooks(i18n);
```

3. Add a middleware.ts file to your src directory and structure your files like this:

```
src/
|-- app/
|   |-- [locale]/
|   |   |-- layout.tsx
|   |   |-- page.tsx
|-- middleware.ts
```

4. Add the following code to your middleware.ts file:

```ts
import { i18n } from "./lib/i18n";

export default i18n.middleware();

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
```

5. Add `lang={await i18n.getLocale()}` to the `<html>` tag in your layout.tsx file:

```tsx
import { i18n } from "@/lib/i18n";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={await i18n.getLocale()}>
      <body>{children}</body>
    </html>
  );
}
```

## Localized content

### Server components

```tsx
import { i18n } from "@/lib/i18n";

export default async function ServerComponent() {
  const { greeting } = await i18n.getContent({
    en: {
      greeting: "Hello world",
    },
    sv: {
      greeting: "Hej världen",
    },
  });

  return <h1>{greeting}</h1>;
}
```

### Client components

```tsx
"use client";

import { useContent } from "@/lib/i18n";

export const ClientComponent = () => {
  const { greeting } = useContent({
    en: {
      greeting: "Hello world",
    },
    sv: {
      greeting: "Hej världen",
    },
  });

  return <h1>{greeting}</h1>;
};
```
