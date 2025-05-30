import { cookies } from "next/headers";
import { NextMiddleware } from "next/server";
import { Locale, LocalizedContent } from "../types";
import { I18nConfig } from "./config";
import { i18nMiddleware } from "./middleware";

export type I18nServerClient<TConfig extends I18nConfig> = Readonly<{
  middleware: (middleware?: NextMiddleware) => NextMiddleware;
  getLocale: () => Promise<Locale<TConfig>>;
  getContent: <T>(content: LocalizedContent<TConfig, T>) => Promise<T>;
}>;

export const createI18nServerClient = <TConfig extends I18nConfig>(
  config: TConfig,
): I18nServerClient<TConfig> => {
  const getLocale = async () => {
    const cookieStore = await cookies();
    const locale = cookieStore.get("locale")?.value;
    if (typeof locale === "string" && config.locales.includes(locale)) {
      return locale as Locale<TConfig>;
    }
    return config.defaultLocale as Locale<TConfig>;
  };

  const getContent = async <T>(content: LocalizedContent<TConfig, T>) => {
    const locale = await getLocale();
    if (locale in content) {
      return content[locale];
    }
    return content[config.defaultLocale as Locale<TConfig>];
  };

  return {
    middleware: (middleware) => i18nMiddleware(config, middleware),
    getLocale,
    getContent,
  };
};
