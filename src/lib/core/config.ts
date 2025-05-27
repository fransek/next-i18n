import { Prettify } from "../internals/internals";
import { LocalizedContent } from "../types";

export type I18nConfig<
  TLocale extends string[] = string[],
  TDefault extends TLocale[number] = TLocale[number],
> = {
  locales: Readonly<TLocale>;
  defaultLocale: TDefault;
};

type I18nConfigReturnType<
  TLocale extends string[] = string[],
  TDefault extends TLocale[number] = TLocale[number],
> = Readonly<
  I18nConfig<TLocale, TDefault> & {
    inferLocale: TLocale[number];
    inferContent: Prettify<
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      LocalizedContent<any, TLocale[number], TDefault>
    >;
  }
>;

export const defineI18nConfig = <
  TLocale extends string[],
  TDefault extends TLocale[number],
>(
  config: I18nConfig<TLocale, TDefault>,
) => config as I18nConfigReturnType<TLocale, TDefault>;
