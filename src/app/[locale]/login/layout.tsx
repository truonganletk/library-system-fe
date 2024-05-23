import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/provider/translations-provider";
import * as React from "react";

export interface ILoginLayoutProps {
  params: { locale: string };
  children: React.ReactNode;
}

const i18nNamespaces = ["login"];

export default async function LoginLayout({
  params: { locale },
  children,
}: ILoginLayoutProps) {
  const { resources } = await initTranslations(locale, i18nNamespaces);
  
  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      {children}
    </TranslationsProvider>
  );
}
