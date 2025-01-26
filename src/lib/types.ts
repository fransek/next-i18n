export type LocalizedContent<
  TContent,
  TLocale extends string,
  TDefault extends TLocale,
> = {
  [locale in TDefault]: TContent;
} & {
  [locale in TLocale]?: TContent;
};
