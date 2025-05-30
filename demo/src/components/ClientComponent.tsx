"use client";

import { useContent, useLocale } from "@/i18n/client";
import content from "@/i18n/content";

export const ClientComponent = () => {
  const { greeting, date } = useContent(content);
  const locale = useLocale();

  return (
    <div>
      <h3>{greeting}</h3>
      <p>{date}</p>
      <p>
        {new Intl.NumberFormat(locale, {
          style: "currency",
          currency: "EUR",
        }).format(1234567.89)}
      </p>
    </div>
  );
};
