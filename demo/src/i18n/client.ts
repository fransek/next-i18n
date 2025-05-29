import { createI18nClient } from "@fransek/next-i18n/lib/core/client";
import i18nConfig from "./i18nConfig";

export const { useContent, useLocale } = createI18nClient(i18nConfig);
