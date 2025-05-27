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

2. Create a config file somewhere in your project, e.g. `src/i18n/i18nConfig.ts`:

```ts
import { defineI18nConfig } from "@fransek/next-i18n";

export default defineI18nConfig({
  locales: ["en", "it", "sv"],
  defaultLocale: "en",
});
```

3. Create a file for the server client, e.g. `src/i18n/server.ts`:

```ts
import { createI18nServerClient } from "@fransek/next-i18n";
import i18nConfig from "./i18nConfig";

export const { getContent, getLocale, middleware } =
  createI18nServerClient(i18nConfig);
```

4. Create a file for the browser client, e.g. `src/i18n/client.ts`:

```ts
import { createI18nClient } from "@fransek/next-i18n";
import i18nConfig from "./i18nConfig";

export const { useContent, useLocale } = createI18nClient(i18nConfig);
```

5. Add a middleware.ts file to your src directory and organize your files like this:

```
src/
|-- app/
|   |-- [locale]/
|   |   |-- layout.tsx
|   |   |-- page.tsx
|-- middleware.ts
```

6. Add the following code to your middleware.ts file:

```ts
import { middleware } from "./i18n/server";

export default middleware();

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
```

7. Add `lang={await getLocale()}` to the `<html>` tag in your layout.tsx file:

```tsx
import { getLocale } from "@/i18n/server";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={await getLocale()}>
      <body>{children}</body>
    </html>
  );
}
```
