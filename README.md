# @fransekman/store

```ts
import { i18nMiddleware } from "@fransekman/next-i18n";

export default i18nMiddleware({
    locales: ["en", "sv", "es", "fr"] as const,
    default: "en",
});
```

## locale()

The locale function returns the current locale on the server.

## useLocale()

The useLocale hook returns the current locale on the client.
