import { locale } from "@fransek/next-i18n";

export const ServerLocale = async () => {
  return <div>Server: {await locale()}</div>;
};
