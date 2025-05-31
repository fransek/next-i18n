import { getContent, getLocale } from "@/i18n/server";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const generateMetadata = async () =>
  await getContent<Metadata>({
    "en-US": {
      title: "Demo | English (US)",
    },
    "en-GB": {
      title: "Demo | English (UK)",
    },
    it: {
      title: "Demo | Italiano",
    },
    sv: {
      title: "Demo | Svenska",
    },
  });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={await getLocale()}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
