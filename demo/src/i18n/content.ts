import { LocalizedContent } from "@fransek/next-i18n/lib/types";
import i18nConfig from "./i18nConfig";

const en = {
  greeting: "Hello world!",
};

const it: typeof en = {
  greeting: "Ciao mondo!",
};

const sv: typeof en = {
  greeting: "Hej världen!",
};

export default {
  en,
  it,
  sv,
} satisfies LocalizedContent<typeof i18nConfig>;
