"use client";

import { useLocale } from "@fransek/next-i18n";

export const Locale = () => {
  const locale = useLocale();
  return <div>Client: {locale}</div>;
};
