"use client";

import i18n from "@/lib/i18n";
import { greeting } from "@/lib/text";

export const ClientLocale = () => {
  const locale = i18n.useLocale();
  const text = i18n.useContent(greeting);

  return (
    <div>
      <h2 className="font-bold text-lg">Client component</h2>
      <div>Locale: {locale}</div>
      <div>{text}</div>
    </div>
  );
};
