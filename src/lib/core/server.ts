import { NextMiddleware } from "next/server";
import { LocalizedContent } from "../types";
import { getContent } from "../utils/getContent";
import { getLocale } from "../utils/getLocale";
import { I18nConfig } from "./config";
import { i18nMiddleware } from "./middleware";

export type I18nServerClient<
  TLocale extends string[],
  TDefault extends TLocale[number],
> = Readonly<{
  middleware: (middleware?: NextMiddleware) => NextMiddleware;
  getLocale: () => Promise<TLocale[number]>;
  getContent: <T>(
    content: LocalizedContent<T, TLocale[number], TDefault>,
  ) => Promise<T>;
}>;

export const createI18nServerClient = <
  TLocale extends string[],
  TDefault extends TLocale[number],
>(
  config: I18nConfig<TLocale, TDefault>,
): I18nServerClient<TLocale, TDefault> =>
  ({
    middleware: (middleware?: NextMiddleware) =>
      i18nMiddleware(config, middleware),
    getLocale: getLocale<TLocale[number]>,
    getContent: <T>(content: LocalizedContent<T, TLocale[number], TDefault>) =>
      getContent(config.defaultLocale, content),
  }) as const;
