import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";
import { I18nConfig } from "../core/config";
import { Locale, LocalizedContent } from "../types";

export const isValidLocale = (
  validLocales: Readonly<string[]>,
  locale?: string,
) => !!locale && validLocales.includes(locale);

export const executeMiddleware = async (
  middleware: NextMiddleware | undefined,
  request: NextRequest,
  event: NextFetchEvent,
): Promise<NextResponse> => {
  const res = await middleware?.(request, event);

  if (!res) {
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }

  return NextResponse.next(res);
};

export const detectPreferredLocale = (
  request: NextRequest,
  locales: readonly string[],
) => {
  const acceptedLocales = request.headers
    .get("accept-language")
    ?.split(",")
    .map((locale) => locale.split(";")[0]);

  if (acceptedLocales) {
    for (const acceptedLocale of acceptedLocales) {
      if (isValidLocale(locales, acceptedLocale)) {
        return acceptedLocale;
      }
      const lang = acceptedLocale.split("-")[0];
      if (isValidLocale(locales, lang)) {
        return lang;
      }
      for (const locale of locales) {
        if (locale.startsWith(acceptedLocale)) {
          return locale;
        }
      }
    }
  }
  return undefined;
};

export const getLocalizedContent = <TConfig extends I18nConfig, T>(
  { fallbackLocales, defaultLocale }: TConfig,
  content: LocalizedContent<TConfig, T>,
  locale: Locale<TConfig>,
) => {
  const resolvedContent =
    typeof content === "function" ? content({ locale }) : content;
  if (locale in resolvedContent) {
    return resolvedContent[locale];
  }
  if (fallbackLocales && fallbackLocales[locale]) {
    const fallbackLocale = fallbackLocales[locale] as Locale<TConfig>;
    if (fallbackLocale in resolvedContent) {
      return resolvedContent[fallbackLocale];
    }
  }
  return resolvedContent[defaultLocale as Locale<TConfig>];
};
