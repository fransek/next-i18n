export const isValidLocale = (
  validLocales: Readonly<string[]>,
  locale?: string,
) => !!locale && validLocales.includes(locale);
