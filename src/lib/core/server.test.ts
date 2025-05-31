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
    fallbackLocales: {
      es: "fr",
    },
  };

  const mockCookieStore = {
    get: vi.fn(),
  };

  const { getContent, getLocale, middleware } =
    createI18nServerClient(mockConfig);

  beforeEach(() => {
    vi.clearAllMocks();
    (cookies as Mock).mockResolvedValue(mockCookieStore);
  });

  describe("getLocale", () => {
    it("should return locale from cookie if valid", async () => {
      mockCookieStore.get.mockReturnValue({ value: "es" });
      const locale = await getLocale();
      expect(locale).toBe("es");
    });

    it("should return default locale if cookie is invalid", async () => {
      mockCookieStore.get.mockReturnValue({ value: "invalid" });
      const locale = await getLocale();
      expect(locale).toBe("en");
    });

    it("should return default locale if no cookie exists", async () => {
      mockCookieStore.get.mockReturnValue(undefined);
      const locale = await getLocale();
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
      const content = await getContent(mockContent);
      expect(content).toBe("Hola");
    });

    it("should return content for fallback locale if current locale content missing", async () => {
      mockCookieStore.get.mockReturnValue({ value: "es" });
      const content = await getContent({ en: "Hello", fr: "Bonjour" });
      expect(content).toBe("Bonjour");
    });

    it("should return content for default locale if current locale and fallback locale content missing", async () => {
      mockCookieStore.get.mockReturnValue({ value: "es" });
      const content = await getContent({ en: "Hello" });
      expect(content).toBe("Hello");
    });

    it("should return content for current locale with context function", async () => {
      mockCookieStore.get.mockReturnValue({ value: "en" });
      const content = await getContent(({ locale }) => ({
        en: locale,
      }));
      expect(content).toBe("en");
    });
  });

  describe("middleware", () => {
    it("should call i18nMiddleware with config and middleware", () => {
      const mockMiddleware = vi.fn();
      middleware(mockMiddleware);
      expect(i18nMiddleware).toHaveBeenCalledWith(mockConfig, mockMiddleware);
    });
  });
});
