import { NextMiddleware } from "next/server";
import { LocalizedContent } from "../types";
import { getContent } from "../utils/getContent";
import { getLocale } from "../utils/getLocale";
import { I18nConfig, i18nMiddleware } from "./middleware";

export type I18nAPI<
  TLocale extends string[],
  TDefault extends TLocale[number],
> = Readonly<{
  locales: TLocale;
  defaultLocale: TDefault;
  middleware: (middleware?: NextMiddleware) => NextMiddleware;
  getLocale: () => Promise<TLocale[number]>;
  getContent: <T>(
    content: LocalizedContent<T, TLocale[number], TDefault>,
  ) => Promise<T>;
}>;

export const defineConfig = <
  TLocale extends string[],
  TDefault extends TLocale[number],
>(
  config: I18nConfig<TLocale, TDefault>,
): I18nAPI<TLocale, TDefault> =>
  ({
    ...config,
    middleware: (middleware?: NextMiddleware) =>
      i18nMiddleware(config, middleware),
    getLocale: getLocale<TLocale[number]>,
    getContent: <T>(content: LocalizedContent<T, TLocale[number], TDefault>) =>
      getContent(config.defaultLocale, content),
  }) as const;
