import { useLocale } from "./useLocale";

export const useContent = <TLocale extends string, TContent>(
  content: Record<TLocale, TContent>,
) => {
  const locale = useLocale<TLocale>();
  return content[locale];
};
