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
  const { defaultLocale, locales, fallbackLocales } = config;

  const getLocale = async () => {
    const cookieStore = await cookies();
    const locale = cookieStore.get("locale")?.value;
    if (typeof locale === "string" && locales.includes(locale)) {
      return locale as Locale<TConfig>;
    }
    return defaultLocale as Locale<TConfig>;
  };

  const getContent = async <T>(content: LocalizedContent<TConfig, T>) => {
    const locale = await getLocale();
    if (locale in content) {
      return content[locale];
    }
    if (fallbackLocales && fallbackLocales[locale]) {
      const fallbackLocale = fallbackLocales[locale] as Locale<TConfig>;
      if (fallbackLocale in content) {
        return content[fallbackLocale];
      }
    }
    return content[defaultLocale as Locale<TConfig>];
  };

  return {
    middleware: (middleware) => i18nMiddleware(config, middleware),
    getLocale,
    getContent,
  };
};
