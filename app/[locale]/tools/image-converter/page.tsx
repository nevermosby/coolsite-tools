import {getTranslations} from 'next-intl/server';
import ImageConverter from "@/components/tools/ImageConverter";

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'ImageConverter'});
  return {
    title: `${t('title')} | Online Utilities`,
    description: t('description'),
  };
}

export default async function ImageConverterPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'ImageConverter'});

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
        <p className="text-muted-foreground">
          {t('description')}
        </p>
      </div>

      <ImageConverter locale={locale} />
    </div>
  );
}