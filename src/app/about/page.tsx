import type { Metadata } from "next";
import Image from "next/image";
import { Award, HeartPulse, Microscope, ShieldCheck } from "lucide-react";
import { PageShell } from "../_components/page-shell";
import { AppointmentDialog } from "../_components/appointment-dialog";
import { aboutStats, aboutValues, labHighlights } from "../_data/content";

export const metadata: Metadata = {
  title: "О нас | IPSUM Pathology",
  description:
    "IPSUM Pathology - лаборатория и диагностический центр в Ташкенте с современными направлениями исследований.",
};

const valueIcons = [ShieldCheck, HeartPulse, Microscope];

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="О нас"
      text="Мы объединяем лабораторную точность, технологичную среду и понятную коммуникацию с пациентом."
      title="IPSUM Pathology"
    >
      <section className="section about-story-section">
        <div className="container about-story-grid">
          <div className="about-story-copy">
            <p className="eyebrow">Миссия</p>
            <h2>Точность, которая помогает принимать решения</h2>
            <p>
              IPSUM Pathology создана для пациентов и врачей, которым важны
              надежные лабораторные данные, спокойный сервис и быстрый доступ к
              результатам. Мы делаем путь от записи до результата понятным и
              удобным.
            </p>
            <div className="about-highlights">
              {labHighlights.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
          <figure className="about-story-image">
            <Image
              alt="Сотрудник IPSUM Pathology в лаборатории"
              fill
              sizes="(max-width: 900px) 100vw, 48vw"
              src="/g-1.jpeg"
            />
          </figure>
        </div>
      </section>

      <section className="about-stats-section">
        <div className="container about-stats-grid">
          {aboutStats.map((stat) => (
            <div className="about-stat" key={stat.value}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section about-values-section">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Подход</p>
            <h2>На чем держится доверие</h2>
          </div>
          <div className="about-values-grid">
            {aboutValues.map((value, index) => {
              const Icon = valueIcons[index] ?? Award;

              return (
                <article className="about-value-card" key={value.title}>
                  <span aria-hidden="true">
                    <Icon size={25} strokeWidth={2.2} />
                  </span>
                  <h3>{value.title}</h3>
                  <p>{value.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="about-cta-section">
        <div className="container about-cta">
          <div>
            <p className="eyebrow">Запись</p>
            <h2>Готовы сдать анализ?</h2>
          </div>
          <AppointmentDialog label="Записаться" />
        </div>
      </section>
    </PageShell>
  );
}
