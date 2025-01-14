import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";
import { i18nMiddleware } from "./middleware";

describe("i18nMiddleware", () => {
  const locales = ["en", "fr", "es"] as const;
  const defaultLocale = "en";
  const middleware = i18nMiddleware({ locales, default: defaultLocale });

  const createRequest = (
    url: string,
    headers: Record<string, string> = {},
    cookies: Record<string, string> = {},
  ) => {
    const request = new NextRequest(new URL(url));
    Object.entries(headers).forEach(([key, value]) =>
      request.headers.set(key, value),
    );
    Object.entries(cookies).forEach(([key, value]) =>
      request.cookies.set(key, value),
    );
    return request;
  };

  it("should set locale cookie if valid locale is in URL", () => {
    const request = createRequest("http://example.com/fr/some-path");
    const response = middleware(request);

    expect(request.cookies.get("locale")?.value).toBe("fr");
    expect(response.cookies.get("locale")?.value).toBe("fr");
  });

  it("should redirect to locale from cookie if valid and not in URL", () => {
    const request = createRequest(
      "http://example.com/some-path",
      {},
      { locale: "es" },
    );
    const response = middleware(request);

    expect(response.headers.get("location")).toBe(
      "http://example.com/es/some-path",
    );
  });

  it("should redirect to locale from accept-language header if valid and not in URL or cookie", () => {
    const request = createRequest("http://example.com/some-path", {
      "accept-language": "de,es-ES;q=0.9,en;q=0.8",
    });
    const response = middleware(request);

    expect(response.headers.get("location")).toBe(
      "http://example.com/es/some-path",
    );
  });

  it("should redirect to default locale if no valid locale is set in URL, cookie, or accept-language header", () => {
    const request = createRequest("http://example.com/some-path");
    const response = middleware(request);

    expect(response.headers.get("location")).toBe(
      "http://example.com/en/some-path",
    );
  });
});
