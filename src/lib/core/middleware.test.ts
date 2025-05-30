import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { describe, expect, it, vi } from "vitest";
import { i18nMiddleware } from "./middleware";

describe("i18nMiddleware", () => {
  const locales = ["en", "fr", "es", "nl-NL"];
  const defaultLocale = "en";
  const middleware = i18nMiddleware({ locales, defaultLocale }, () => {
    const response = NextResponse.next();
    response.cookies.set("foo", "bar");
    return response;
  });
  const event = {} as NextFetchEvent;

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

  it("should set locale cookie if valid locale is in URL", async () => {
    const request = createRequest("http://example.com/fr/some-path");
    const response = await middleware(request, event);

    expect(request.cookies.get("locale")?.value).toBe("fr");
    expect(response.cookies.get("locale")?.value).toBe("fr");
  });

  it("should redirect to locale from cookie if valid and not in URL", async () => {
    const request = createRequest(
      "http://example.com/some-path",
      {},
      { locale: "es" },
    );
    const response = await middleware(request, event);

    expect(response.headers.get("location")).toBe(
      "http://example.com/es/some-path",
    );
  });

  it("should redirect to locale from accept-language header if valid and not in URL or cookie", async () => {
    const request = createRequest("http://example.com/some-path", {
      "accept-language": "de,es;q=0.9,en;q=0.8",
    });
    const response = await middleware(request, event);

    expect(response.headers.get("location")).toBe(
      "http://example.com/es/some-path",
    );
  });

  it("should redirect to locale from accept-language header without region if valid and not in URL or cookie", async () => {
    const request = createRequest("http://example.com/some-path", {
      "accept-language": "de,es-ES;q=0.9,en;q=0.8",
    });
    const response = await middleware(request, event);

    expect(response.headers.get("location")).toBe(
      "http://example.com/es/some-path",
    );
  });

  it("should redirect to locale from accept-language header with region if valid and not in URL or cookie", async () => {
    const request = createRequest("http://example.com/some-path", {
      "accept-language": "de,nl;q=0.9,en;q=0.8",
    });
    const response = await middleware(request, event);

    expect(response.headers.get("location")).toBe(
      "http://example.com/nl-NL/some-path",
    );
  });

  it("should redirect to default locale if no valid locale is set in URL, cookie, or accept-language header", async () => {
    const request = createRequest("http://example.com/some-path");
    const response = await middleware(request, event);

    expect(response.headers.get("location")).toBe(
      "http://example.com/en/some-path",
    );
  });

  it("should handle chained middleware", async () => {
    const request = createRequest("http://example.com/some-path");
    const response = await middleware(request, event);

    expect(response.cookies.get("foo")?.value).toBe("bar");
  });

  it("should handle chained middleware that does not return a response", async () => {
    const fn = vi.fn();
    const middleware = i18nMiddleware({ locales, defaultLocale }, fn);

    const request = createRequest("http://example.com/some-path");
    await middleware(request, event);

    expect(fn).toHaveBeenCalled();
  });
});
