import { useContent } from "../hooks/useContent";
import { useLocale } from "../hooks/useLocale";
import { LocalizedContent } from "../types";
import { I18nConfig } from "./config";

export type I18nClient<
  TLocale extends string[],
  TDefault extends TLocale[number],
> = Readonly<{
  useLocale: () => TLocale[number];
  useContent: <T>(content: LocalizedContent<T, TLocale[number], TDefault>) => T;
}>;

export const createI18nClient = <
  TLocale extends string[],
  TDefault extends TLocale[number],
>(
  config: I18nConfig<TLocale, TDefault>,
): I18nClient<TLocale, TDefault> =>
  ({
    useLocale: useLocale<TLocale[number]>,
    useContent: <T>(content: LocalizedContent<T, TLocale[number], TDefault>) =>
      useContent(config.defaultLocale, content),
  }) as const;
