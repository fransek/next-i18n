import { cookies } from "next/headers";
import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import { i18nMiddleware } from "./middleware";
import { createI18nServerClient } from "./server";

vi.mock("next/headers", () => ({
  cookies: vi.fn(),
}));

vi.mock("./middleware", () => ({
  i18nMiddleware: vi.fn(),
}));

describe("createI18nServerClient", () => {
  const mockConfig = {
    defaultLocale: "en",
    locales: ["en", "es", "fr"],
  };

  const mockCookieStore = {
    get: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (cookies as Mock).mockResolvedValue(mockCookieStore);
  });

  describe("getLocale", () => {
    it("should return locale from cookie if valid", async () => {
      mockCookieStore.get.mockReturnValue({ value: "es" });
      const client = createI18nServerClient(mockConfig);
      const locale = await client.getLocale();
      expect(locale).toBe("es");
    });

    it("should return default locale if cookie is invalid", async () => {
      mockCookieStore.get.mockReturnValue({ value: "invalid" });
      const client = createI18nServerClient(mockConfig);
      const locale = await client.getLocale();
      expect(locale).toBe("en");
    });

    it("should return default locale if no cookie exists", async () => {
      mockCookieStore.get.mockReturnValue(undefined);
      const client = createI18nServerClient(mockConfig);
      const locale = await client.getLocale();
      expect(locale).toBe("en");
    });
  });

  describe("getContent", () => {
    const mockContent = {
      en: "Hello",
      es: "Hola",
      fr: "Bonjour",
    };

    it("should return content for current locale", async () => {
      mockCookieStore.get.mockReturnValue({ value: "es" });
      const client = createI18nServerClient(mockConfig);
      const content = await client.getContent(mockContent);
      expect(content).toBe("Hola");
    });

    it("should fallback to default locale content if locale content not found", async () => {
      mockCookieStore.get.mockReturnValue({ value: "es" });
      const client = createI18nServerClient(mockConfig);
      const content = await client.getContent({ en: "Hello" });
      expect(content).toBe("Hello");
    });
  });

  describe("middleware", () => {
    it("should call i18nMiddleware with config and middleware", () => {
      const mockMiddleware = vi.fn();
      const client = createI18nServerClient(mockConfig);
      client.middleware(mockMiddleware);
      expect(i18nMiddleware).toHaveBeenCalledWith(mockConfig, mockMiddleware);
    });
  });
});
