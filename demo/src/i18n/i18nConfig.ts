import { defineI18nConfig } from "@fransek/next-i18n/lib/core/config";

export default defineI18nConfig({
  locales: ["en-US", "en-GB", "it", "sv"],
  defaultLocale: "en-US",
  fallbackLocales: {
    "en-GB": "en-US",
  },
});
