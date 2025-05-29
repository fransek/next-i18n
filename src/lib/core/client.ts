import { useContent } from "../hooks/useContent";
import { useLocale } from "../hooks/useLocale";
import { Locale, LocalizedContent } from "../types";
import { GenericI18nConfig } from "./config";

export type I18nClient<TConfig extends GenericI18nConfig> = Readonly<{
  useLocale: () => Locale<TConfig>;
  useContent: <T>(content: LocalizedContent<TConfig, T>) => T;
}>;

export const createI18nClient = <TConfig extends GenericI18nConfig>(
  config: TConfig,
): I18nClient<TConfig> => ({
  useLocale,
  useContent: (content) => useContent(config.defaultLocale, content),
});
