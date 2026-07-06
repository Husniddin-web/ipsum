import type { Metadata } from "next";
import { Search } from "lucide-react";
import { PageShell } from "../_components/page-shell";
import { ServiceCards } from "../_components/service-cards";

export const metadata: Metadata = {
  title: "Услуги | IPSUM Pathology",
  description:
    "Лабораторные анализы, биохимия, молекулярная генетика, цитогенетика и выездной забор в IPSUM Pathology.",
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
          <div className="search-strip services-search" role="search">
            <Search aria-hidden="true" size={22} strokeWidth={2.4} />
            <input
              aria-label="Поиск услуги"
              placeholder="Найдите анализ или направление"
              type="search"
            />
            <button type="button">Найти</button>
          </div>
          <ServiceCards linkHref="/contact" />
        </div>
      </section>
    </PageShell>
  );
}
