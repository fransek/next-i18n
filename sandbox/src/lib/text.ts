import i18n from "./i18n";

export const greeting = {
  en: "Hello",
  sv: "Hej",
  es: "Hola",
  fr: "Bonjour",
} satisfies Record<typeof i18n.$locale, string>;
