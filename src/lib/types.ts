import { GenericI18nConfig } from "./core/config";

export type LocalizedContent<
  TConfig extends GenericI18nConfig,
  TContent = unknown,
> = {
  [locale in DefaultLocale<TConfig>]: TContent;
} & {
  [locale in Locale<TConfig>]?: TContent;
};

export type Locale<TConfig extends GenericI18nConfig> =
  TConfig["locales"][number];

export type DefaultLocale<TConfig extends GenericI18nConfig> =
  TConfig["defaultLocale"];
