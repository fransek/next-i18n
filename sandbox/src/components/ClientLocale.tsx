"use client";

import { useLocale } from "@fransek/next-i18n";

export const ClientLocale = () => {
  const locale = useLocale();
  return <div>Client: {locale}</div>;
};
