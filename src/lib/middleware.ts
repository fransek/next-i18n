import { NextRequest, NextResponse } from "next/server";
import { isValidLocale } from "./internals";

interface Options<T extends Readonly<string[]>> {
  locales: T;
  default: T[number];
}

export const i18nMiddleware =
  <T extends Readonly<string[]>>({
    locales,
    default: defaultLocale,
  }: Options<T>) =>
  (request: NextRequest, response?: NextResponse): NextResponse => {
    response ||= NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    const { pathname } = request.nextUrl;
    const localeParam = pathname.split("/")[1];

    // if the locale param is valid, set the cookies
    if (isValidLocale(locales, localeParam)) {
      request.cookies.set("locale", localeParam);
      response.cookies.set("locale", localeParam);
      return NextResponse.next({
        headers: response.headers,
        request: {
          headers: request.headers,
        },
      });
    }

    const localeCookie = request.cookies.get("locale")?.value;

    // if the cookie is set and valid, but the locale is not in the URL, redirect to the correct locale
    if (isValidLocale(locales, localeCookie)) {
      request.nextUrl.pathname = `/${localeCookie}${pathname}`;
      response = NextResponse.redirect(request.nextUrl, {
        headers: response.headers,
      });
      return response;
    }

    // if no locale is set through the URL or cookies, check the accept-language header
    const acceptedLocales = request.headers
      .get("accept-language")
      ?.split(",")
      .map((locale) => locale.slice(0, 2));

    if (acceptedLocales) {
      for (const acceptedLocale of acceptedLocales) {
        if (isValidLocale(locales, acceptedLocale)) {
          request.nextUrl.pathname = `/${acceptedLocale}${pathname}`;
          return NextResponse.redirect(request.nextUrl, {
            headers: response.headers,
          });
        }
      }
    }

    // if no locale is set in the URL, cookie or accept-language header, redirect to the default locale
    request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
    return NextResponse.redirect(request.nextUrl, {
      headers: response.headers,
    });
  };
