import { NextMiddleware } from "next/server";
import { LocalizedContent } from "../types";
import { getContent } from "../utils/getContent";
import { getLocale } from "../utils/getLocale";
import { I18nConfig } from "./config";
import { i18nMiddleware } from "./middleware";

export type I18nServerClient<TConfig extends I18nConfig<string[], string>> =
  Readonly<{
    middleware: (middleware?: NextMiddleware) => NextMiddleware;
    getLocale: () => Promise<TConfig["locales"][number]>;
    getContent: <T>(
      content: LocalizedContent<
        T,
        TConfig["locales"][number],
        TConfig["defaultLocale"]
      >,
    ) => Promise<T>;
  }>;

export const createI18nServerClient = <
  TConfig extends I18nConfig<string[], string>,
>(
  config: TConfig,
): I18nServerClient<TConfig> => ({
  middleware: (middleware) => i18nMiddleware(config, middleware),
  getLocale,
  getContent: (content) => getContent(config.defaultLocale, content),
});
