import {getTranslations} from 'next-intl/server';
import LLMPriceComparison from "@/components/tools/LLMPriceComparison";

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'LLMPriceComparison'});
  return {
    title: `${t('title')} | Online Utilities`,
    description: t('description'),
  };
}

export default async function LLMPriceComparisonPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'LLMPriceComparison'});

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
        <p className="text-muted-foreground">
          {t('description')}
        </p>
      </div>

      <LLMPriceComparison locale={locale} />

      <div className="prose prose-zinc dark:prose-invert max-w-none pt-8 border-t">
        <h2>LLM Pricing {t('stats.providers')}</h2>
        <ul>
          <li><strong>{t('monthly')}</strong>: {t('LLMPriceComparison.stats.providers')}</li>
          <li><strong>{t('quarterly')}</strong>: {t('LLMPriceComparison.stats.plans')}</li>
          <li><strong>{t('yearly')}</strong>: {t('LLMPriceComparison.stats.currentDisplay')}</li>
        </ul>
      </div>
    </div>
  );
}