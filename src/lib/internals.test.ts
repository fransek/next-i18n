import { describe, expect, it } from "vitest";
import { isValidLocale } from "./internals";

describe("isValidLocale", () => {
  it("should return true for valid locale", () => {
    const locales = ["en", "fr", "es"];
    expect(isValidLocale(locales, "en")).toBe(true);
  });

  it("should return false for invalid locale", () => {
    const locales = ["en", "fr", "es"];
    expect(isValidLocale(locales, "de")).toBe(false);
  });

  it("should return false for undefined locale", () => {
    const locales = ["en", "fr", "es"];
    expect(isValidLocale(locales, undefined)).toBe(false);
  });
});
