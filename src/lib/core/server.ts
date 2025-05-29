import { NextMiddleware } from "next/server";
import { Locale, LocalizedContent } from "../types";
import { getContent } from "../utils/getContent";
import { getLocale } from "../utils/getLocale";
import { I18nConfig } from "./config";
import { i18nMiddleware } from "./middleware";

export type I18nServerClient<TConfig extends I18nConfig> = Readonly<{
  middleware: (middleware?: NextMiddleware) => NextMiddleware;
  getLocale: () => Promise<Locale<TConfig>>;
  getContent: <T>(content: LocalizedContent<TConfig, T>) => Promise<T>;
}>;

export const createI18nServerClient = <TConfig extends I18nConfig>(
  config: TConfig,
): I18nServerClient<TConfig> => ({
  middleware: (middleware) => i18nMiddleware(config, middleware),
  getLocale,
  getContent: (content) => getContent(config.defaultLocale, content),
});
