import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageShell } from '../../_components/page-shell';
import { ServiceCatalog } from '../../_components/catalog/service-catalog';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'services' });
  return {
    title: `${t('eyebrow')} | IPSUM Pathology`,
    description: t('heroText'),
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('services');

  return (
    <PageShell
      eyebrow={t('eyebrow')}
      heroVariant="services"
      text={t('heroText')}
      title={t('heroTitle')}
    >
      <section className="section services-page-section">
        <div className="container">
          <Suspense fallback={<div className="catalog-empty">{t('loading')}</div>}>
            <ServiceCatalog />
          </Suspense>
        </div>
      </section>
    </PageShell>
  );
}
