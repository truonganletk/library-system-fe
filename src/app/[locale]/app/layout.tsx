import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/provider/translations-provider";
import AppLayout from "@/layouts/app.layout";
import * as React from "react";

export interface IAppProps {
  params: { locale: string };
  children: React.ReactNode;
}

const i18nNamespaces = ["app"];

export default async function App({ params: { locale }, children }: IAppProps) {
  const { resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <AppLayout>{children}</AppLayout>      
    </TranslationsProvider>
  );
}
