"use client";

import { useContent, useLocale } from "@/i18n/client";
import content from "@/i18n/content";

export const ClientComponent = () => {
  const text = useContent(content);
  const locale = useLocale();

  return (
    <h3>
      {locale}: {text.greeting}
    </h3>
  );
};
