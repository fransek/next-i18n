import { Localized } from "./i18n";

export const greeting = {
  en: "Hello",
  sv: "Hej",
  es: "Hola",
  fr: "Bonjour",
} as const satisfies Localized<string>;
