import { Locale, LocalizedContent } from "@fransek/next-i18n/lib/types";
import i18nConfig from "./i18nConfig";

const formatDate = (date: Date, locale: string) =>
  new Intl.DateTimeFormat(locale, {
    dateStyle: "full",
  }).format(date);

interface Content {
  greeting: string;
  date: string;
}

const en = (locale: Locale<typeof i18nConfig>): Content => ({
  greeting: "Hello world!",
  date: `Today's date is ${formatDate(new Date(), locale)}`,
});

export default {
  "en-US": en("en-US"),
  "en-GB": en("en-GB"),
  it: {
    greeting: "Ciao mondo!",
    date: `La data di oggi è ${formatDate(new Date(), "it")}`,
  },
  sv: {
    greeting: "Hej världen!",
    date: `Dagens datum är ${formatDate(new Date(), "sv")}`,
  },
} satisfies LocalizedContent<typeof i18nConfig, Content>;
