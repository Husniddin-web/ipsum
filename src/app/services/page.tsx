import type { Metadata } from 'next';
import { Suspense } from 'react';
import { PageShell } from '../_components/page-shell';
import { ServiceCatalog } from '../_components/catalog/service-catalog';

export const metadata: Metadata = {
  title: 'Услуги | IPSUM Pathology',
  description:
    'Лабораторные анализы, биохимия, молекулярная генетика, цитогенетика и выездной забор в IPSUM Pathology.',
};

export default function ServicesPage() {
  return (
    <PageShell
      eyebrow="Услуги"
      heroVariant="services"
      text="Выберите направление диагностики, уточните подготовку и оставьте заявку на удобное время."
      title="Услуги лаборатории"
    >
      <section className="section services-page-section">
        <div className="container">
          <Suspense fallback={<div className="catalog-empty">Загружаем каталог...</div>}>
            <ServiceCatalog />
          </Suspense>
        </div>
      </section>
    </PageShell>
  );
}
