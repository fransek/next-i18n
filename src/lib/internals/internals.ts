import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";

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
