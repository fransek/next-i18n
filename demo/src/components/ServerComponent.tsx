import content from "@/i18n/content";
import { getContent, getLocale } from "@/i18n/server";

export const ServerComponent = async () => {
  const { greeting } = await getContent(content);
  const locale = await getLocale();

  return (
    <h3>
      {locale}: {greeting}
    </h3>
  );
};
