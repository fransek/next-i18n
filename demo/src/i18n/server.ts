import { createI18nServerClient } from "@fransek/next-i18n/lib/core/server";
import i18n from "./i18n";

export const { getContent, getLocale, middleware } =
  createI18nServerClient(i18n);
