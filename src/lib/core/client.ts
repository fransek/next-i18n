import { useContent } from "../hooks/useContent";
import { useLocale } from "../hooks/useLocale";
import { LocalizedContent } from "../types";
import { I18nConfig } from "./config";

export type I18nClient<TConfig extends I18nConfig<string[], string>> =
  Readonly<{
    useLocale: () => TConfig["locales"][number];
    useContent: <T>(
      content: LocalizedContent<
        T,
        TConfig["locales"][number],
        TConfig["defaultLocale"]
      >,
    ) => T;
  }>;

export const createI18nClient = <TConfig extends I18nConfig<string[], string>>(
  config: TConfig,
): I18nClient<TConfig> => ({
  useLocale,
  useContent: (content) => useContent(config.defaultLocale, content),
});
