import {getTranslations} from 'next-intl/server';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'About'});
  return {
    title: `${t('title')} | Online Utilities`,
    description: t('subtitle'),
  };
}

export default async function AboutPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'About'});

  return (
    <div className="max-w-3xl mx-auto py-12 space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
        <p className="text-xl text-muted-foreground">
          {t('subtitle')}
        </p>
      </div>

      <div className="prose prose-zinc dark:prose-invert max-w-none">
        <h2>{t('philosophyTitle')}</h2>
        <p>
          {t('philosophyIntro')}
        </p>
        <p>
          <strong>Online Utilities</strong> {t('philosophyIntro2')}
        </p>
        <ul>
          <li>
            <strong>{t('principles.privacy')}</strong>
          </li>
          <li>
            <strong>{t('principles.openSource')}</strong>
          </li>
          <li>
            <strong>{t('principles.efficient')}</strong>
          </li>
        </ul>

        <h2>{t('contactTitle')}</h2>
        <p>
          {t('contactIntro')}
        </p>
        <ul>
          <li>{t('githubIssue', {link: 'https://github.com/nevermosby/coolsite-tools/issues'})}</li>
        </ul>
      </div>
    </div>
  );
}
