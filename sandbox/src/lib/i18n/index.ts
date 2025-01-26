import { defineConfig, LocalizedContent } from "@fransek/next-i18n";

const i18n = defineConfig({
  locales: ["en", "sv", "es", "fr"],
  defaultLocale: "en",
});

export default i18n;

export type Localized<T = unknown> = LocalizedContent<
  T,
  (typeof i18n.locales)[number],
  typeof i18n.defaultLocale
>;
