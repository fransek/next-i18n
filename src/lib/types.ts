import { I18nConfig } from "./core/config";

export type LocalizedContent<TConfig extends I18nConfig, TContent = unknown> = {
  [locale in DefaultLocale<TConfig>]: TContent;
} & {
  [locale in Locale<TConfig>]?: TContent;
};

export type Locale<TConfig extends I18nConfig> = TConfig["locales"][number];

export type DefaultLocale<TConfig extends I18nConfig> =
  TConfig["defaultLocale"];
