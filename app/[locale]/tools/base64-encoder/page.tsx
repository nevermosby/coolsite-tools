import {getTranslations} from 'next-intl/server';
import Base64Encoder from "@/components/tools/Base64Encoder";

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Base64Encoder'});
  return {
    title: `${t('title')} | Online Utilities`,
    description: t('description'),
  };
}

export default async function Base64EncoderPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Base64Encoder'});

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
        <p className="text-muted-foreground">
          {t('description')}
        </p>
      </div>

      <Base64Encoder locale={locale} />
    </div>
  );
}