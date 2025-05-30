import { useParams } from "next/navigation";
import React, { ReactNode } from "react";
import { Locale, LocalizedContent } from "../types";
import { I18nConfig } from "./config";

export type I18nClient<TConfig extends I18nConfig> = Readonly<{
  useLocale: () => Locale<TConfig>;
  useContent: <T>(content: LocalizedContent<TConfig, T>) => T;
  Content: React.FC<{ children: LocalizedContent<TConfig, ReactNode> }>;
}>;

export const createI18nClient = <TConfig extends I18nConfig>({
  defaultLocale,
  locales,
}: TConfig): I18nClient<TConfig> => {
  const useLocale = () => {
    const { locale } = useParams();
    if (typeof locale === "string" && locales.includes(locale)) {
      return locale as Locale<TConfig>;
    }
    return defaultLocale as Locale<TConfig>;
  };

  const useContent = <T>(content: LocalizedContent<TConfig, T>) => {
    const locale = useLocale();
    if (locale in content) {
      return content[locale];
    }
    return content[defaultLocale as Locale<TConfig>];
  };

  const Content: React.FC<{
    children: LocalizedContent<TConfig, React.ReactNode>;
  }> = ({ children }) => {
    return useContent(children);
  };

  return {
    useLocale,
    useContent,
    Content,
  };
};
