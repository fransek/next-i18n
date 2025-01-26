import { useContent } from "../hooks/useContent";
import { useLocale } from "../hooks/useLocale";
import { LocalizedContent } from "../types";
import { I18nConfig } from "./middleware";

export type I18nHooks<
  TLocale extends string[],
  TDefault extends TLocale[number],
> = Readonly<{
  useLocale: () => TLocale[number];
  useContent: <T>(content: LocalizedContent<T, TLocale[number], TDefault>) => T;
}>;

export const createHooks = <
  TLocale extends string[],
  TDefault extends TLocale[number],
>(
  config: I18nConfig<TLocale, TDefault>,
): I18nHooks<TLocale, TDefault> =>
  ({
    useLocale: useLocale<TLocale[number]>,
    useContent: <T>(content: LocalizedContent<T, TLocale[number], TDefault>) =>
      useContent(config.defaultLocale, content),
  }) as const;
