import { getLocale } from "./getLocale";

export const getContent = async <TLocale extends string, TContent>(
  content: Record<TLocale, TContent>,
) => {
  return content[await getLocale<TLocale>()];
};
