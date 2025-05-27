export const isValidLocale = (
  validLocales: Readonly<string[]>,
  locale?: string,
) => !!locale && validLocales.includes(locale);

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};
