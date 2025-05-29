import { GenericI18nConfig } from "../core/config";
import { DefaultLocale, Locale, LocalizedContent } from "../types";
import { useLocale } from "./useLocale";

export const useContent = <TConfig extends GenericI18nConfig, TContent>(
  defaultLocale: DefaultLocale<TConfig>,
  content: LocalizedContent<TConfig, TContent>,
) => {
  const locale = useLocale<Locale<TConfig>>();
  if (locale in content) {
    return content[locale];
  }
  return content[defaultLocale];
};
