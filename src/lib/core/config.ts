export type I18nConfig<
  TLocale extends string[] = string[],
  TDefault extends TLocale[number] = TLocale[number],
> = {
  locales: Readonly<TLocale>;
  defaultLocale: TDefault;
};

export const defineI18nConfig = <
  TLocale extends string[],
  TDefault extends TLocale[number],
>(
  config: I18nConfig<TLocale, TDefault>,
): I18nConfig<TLocale, TDefault> => config;
