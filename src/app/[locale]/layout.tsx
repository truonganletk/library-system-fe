import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "@/components/provider/provider";
import { dir } from "i18next";
import i18nConfig from "@/libs/i18n/i18nConfig";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Library System",
  description: "Library System",
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return (
    <html
      lang={i18nConfig.locales.includes(locale) ? locale : i18nConfig.defaultLocale}
      dir={dir(
        i18nConfig.locales.includes(locale) ? locale : i18nConfig.defaultLocale
      )}
    >
      <body className={inter.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
