import { NextMiddleware } from "next/server";
import { useContent } from "../hooks/useContent";
import { useLocale } from "../hooks/useLocale";
import { getContent } from "../utils/getContent";
import { getLocale } from "../utils/getLocale";
import { I18nConfig, i18nMiddleware } from "./middleware";

export const defineConfig = <T extends string[], U extends T[number]>(
  config: I18nConfig<T, U>,
) => {
  type Locale = T[number];

  type Localized<T> = {
    [key in Locale]: T;
  };

  return {
    locales: config.locales,
    defaultLocale: config.default,
    middleware: (middleware?: NextMiddleware) =>
      i18nMiddleware(config, middleware),
    getLocale: getLocale<Locale>,
    getContent: <TContent>(content: Localized<TContent>) =>
      getContent<Locale, TContent>(content),
    useLocale: useLocale<Locale>,
    useContent: <TContent>(content: Localized<TContent>) =>
      useContent<Locale, TContent>(content),
    $locale: undefined as unknown as Locale,
  };
};
