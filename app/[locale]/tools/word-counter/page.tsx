import {getTranslations} from 'next-intl/server';
import WordCounter from "@/components/tools/WordCounter";

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'WordCounter'});
  return {
    title: `${t('title')} | Online Utilities`,
    description: t('description'),
  };
}

export default async function WordCounterPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'WordCounter'});

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
        <p className="text-muted-foreground">
          {t('description')}
        </p>
      </div>

      <WordCounter locale={locale} />
    </div>
  );
}