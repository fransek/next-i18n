import { createI18nClient } from "@fransek/next-i18n/lib/core/client";
import i18n from "./i18n";

export const { useContent, useLocale } = createI18nClient(i18n);
