"use client";

import { useContent, useLocale } from "@/lib/i18n/client";
import { greeting } from "@/lib/text";

export const ClientLocale = () => {
  const locale = useLocale();
  const text = useContent(greeting);

  return (
    <div>
      <h2 className="font-bold text-lg">Client component</h2>
      <div>Locale: {locale}</div>
      <div>{text}</div>
    </div>
  );
};
