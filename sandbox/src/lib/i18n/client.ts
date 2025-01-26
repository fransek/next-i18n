import { createHooks } from "@fransek/next-i18n";
import i18n from ".";

export const { useContent, useLocale } = createHooks(i18n);
