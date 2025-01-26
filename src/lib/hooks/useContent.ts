import { LocalizedContent } from "../types";
import { useLocale } from "./useLocale";

export const useContent = <
  TContent,
  TLocale extends string,
  TDefault extends TLocale,
>(
  defaultLocale: TDefault,
  content: LocalizedContent<TContent, TLocale, TDefault>,
) => {
  const locale = useLocale<TLocale>();
  if (locale in content) {
    return content[locale];
  }
  return content[defaultLocale];
};
