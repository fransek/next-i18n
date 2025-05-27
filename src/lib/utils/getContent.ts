import { GenericI18nConfig } from "../core/config";
import { DefaultLocale, Locale, LocalizedContent } from "../types";
import { getLocale } from "./getLocale";

export const getContent = async <TContent, TConfig extends GenericI18nConfig>(
  defaultLocale: DefaultLocale<TConfig>,
  content: LocalizedContent<TConfig, TContent>,
) => {
  const locale = await getLocale<Locale<TConfig>>();
  if (locale in content) {
    return content[locale];
  }
  return content[defaultLocale];
};
