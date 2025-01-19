import i18n from "@/lib/i18n";
import { greeting } from "@/lib/text";

export const ServerLocale = async () => {
  const locale = await i18n.getLocale();
  const text = await i18n.getContent(greeting);

  return (
    <div>
      <h2 className="font-bold text-lg">Server component</h2>
      <div>Locale: {locale}</div>
      <div>{text}</div>
    </div>
  );
};
