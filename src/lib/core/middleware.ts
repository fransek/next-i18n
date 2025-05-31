import { NextMiddleware, NextResponse } from "next/server";
import {
  detectPreferredLocale,
  executeMiddleware,
  isValidLocale,
} from "../internals/internals";
import { I18nConfig } from "./config";

export const i18nMiddleware = <TConfig extends I18nConfig>(
  { locales, defaultLocale }: TConfig,
  middleware?: NextMiddleware,
) =>
  (async (request, event): Promise<NextResponse> => {
    const response = await executeMiddleware(middleware, request, event);

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
      return NextResponse.redirect(request.nextUrl, {
        headers: response.headers,
      });
    }

    // if no locale is set through the URL or cookies, check the accept-language header
    const preferredLocale = detectPreferredLocale(request, locales);
    if (preferredLocale) {
      request.nextUrl.pathname = `/${preferredLocale}${pathname}`;
      return NextResponse.redirect(request.nextUrl, {
        headers: response.headers,
      });
    }

    // if no locale is set in the URL, cookie or accept-language header, redirect to the default locale
    request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
    return NextResponse.redirect(request.nextUrl, {
      headers: response.headers,
    });
  }) satisfies NextMiddleware;
