import content from "@/i18n/content";
import { getContent, getLocale } from "@/i18n/server";

export const ServerComponent = async () => {
  const { greeting, date } = await getContent(content);
  const locale = await getLocale();

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
