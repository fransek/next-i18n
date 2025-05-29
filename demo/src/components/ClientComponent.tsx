"use client";

import { useContent, useLocale } from "@/i18n/client";
import content from "@/i18n/content";

export const ClientComponent = () => {
  const { greeting } = useContent(content);
  const locale = useLocale();

  return (
    <h3>
      {locale}: {greeting}
    </h3>
  );
};
