import { LocalizedContent } from "@fransek/next-i18n/lib/types";
import i18nConfig from "./i18nConfig";

const formatDate = (date: Date, locale: string) =>
  new Intl.DateTimeFormat(locale, {
    dateStyle: "full",
  }).format(date);

interface Content {
  greeting: string;
  date: string;
}

export default (({ locale }) => ({
  "en-US": {
    greeting: "Hello world!",
    date: `Today's date is ${formatDate(new Date(), locale)}`,
  },
  it: {
    greeting: "Ciao mondo!",
    date: `La data di oggi è ${formatDate(new Date(), locale)}`,
  },
  sv: {
    greeting: "Hej världen!",
    date: `Dagens datum är ${formatDate(new Date(), locale)}`,
  },
})) satisfies LocalizedContent<typeof i18nConfig, Content>;
