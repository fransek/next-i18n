// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import { render, renderHook, screen } from "@testing-library/react";
import { useParams } from "next/navigation";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { createI18nClient } from "./client";

vi.mock("next/navigation", () => ({
  useParams: vi.fn(),
}));

describe("createI18nClient", () => {
  const config = {
    defaultLocale: "en",
    locales: ["en", "es", "fr"],
  };

  const { Content, useContent, useLocale } = createI18nClient(config);

  describe("useLocale", () => {
    it("returns locale from params if valid", () => {
      vi.mocked(useParams).mockReturnValue({ locale: "es" });
      const { result } = renderHook(() => useLocale());
      expect(result.current).toBe("es");
    });

    it("returns default locale if param is invalid", () => {
      vi.mocked(useParams).mockReturnValue({ locale: "invalid" });
      const { result } = renderHook(() => useLocale());
      expect(result.current).toBe("en");
    });

    it("returns default locale if no locale param", () => {
      vi.mocked(useParams).mockReturnValue({});
      const { result } = renderHook(() => useLocale());
      expect(result.current).toBe("en");
    });
  });

  describe("useContent", () => {
    const content = {
      en: "Hello",
      es: "Hola",
      fr: "Bonjour",
    };

    it("returns content for current locale", () => {
      vi.mocked(useParams).mockReturnValue({ locale: "es" });
      const { result } = renderHook(() => useContent(content));
      expect(result.current).toBe("Hola");
    });

    it("returns content for default locale if current locale content missing", () => {
      vi.mocked(useParams).mockReturnValue({ locale: "es" });
      const { result } = renderHook(() => useContent({ en: "Hello" }));
      expect(result.current).toBe("Hello");
    });
  });

  describe("Content", () => {
    it("renders content for current locale", () => {
      vi.mocked(useParams).mockReturnValue({ locale: "fr" });
      render(
        <Content>
          {{
            en: "Hello",
            es: "Hola",
            fr: "Bonjour",
          }}
        </Content>,
      );
      expect(screen.getByText("Bonjour")).toBeInTheDocument();
    });
  });
});
