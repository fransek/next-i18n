import { LocalizedContent } from "../types";
import { getLocale } from "./getLocale";

export const getContent = async <
  TContent,
  TLocale extends string,
  TDefault extends TLocale,
>(
  defaultLocale: TDefault,
  content: LocalizedContent<TContent, TLocale, TDefault>,
) => {
  const locale = await getLocale<TLocale>();
  if (locale in content) {
    return content[locale];
  }
  return content[defaultLocale];
};
