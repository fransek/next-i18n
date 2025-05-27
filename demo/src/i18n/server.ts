import { createI18nServerClient } from "@fransek/next-i18n/lib/core/server";
import i18nConfig from "./i18nConfig";

export const { getContent, getLocale, middleware } =
  createI18nServerClient(i18nConfig);
