import { i18nMiddleware } from "@fransek/next-i18n";

export default i18nMiddleware({
  locales: ["en", "sv", "es", "fr"] as const,
  default: "en",
});

export const config = {
  matcher: [
    "/((?!_next|manifest\\.json|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
