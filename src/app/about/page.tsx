import type { Metadata } from 'next';
import Image from 'next/image';
import {
  Award,
  ClipboardCheck,
  HeartPulse,
  Microscope,
  ShieldCheck,
  TestTube2,
  Workflow,
} from 'lucide-react';
import { PageShell } from '../_components/page-shell';
import { AppointmentDialog } from '../_components/appointment-dialog';
import { LicensesGallery } from '../_components/licenses-gallery';
import { PartnersSection } from '../_components/partners-section';
import { aboutStats, aboutValues, labHighlights } from '../_data/content';

export const metadata: Metadata = {
  title: 'О нас | IPSUM Pathology',
  description:
    'IPSUM Pathology - лаборатория и диагностический центр в Ташкенте с современными направлениями исследований.',
};

const valueIcons = [ShieldCheck, HeartPulse, Microscope];
const labProcess = [
  {
    title: 'Маршрут пациента',
    text: 'Администратор помогает выбрать направление, формат сдачи и удобное время.',
    icon: ClipboardCheck,
  },
  {
    title: 'Лабораторная обработка',
    text: 'Биоматериал проходит подготовку и исследование в контролируемой среде.',
    icon: TestTube2,
  },
  {
    title: 'Понятный результат',
    text: 'Ответы передаются онлайн или в филиале, чтобы врач и пациент могли быстро принять решение.',
    icon: Workflow,
  },
];
const corporateStories = [
  {
    eyebrow: 'Сервис',
    title: 'Пациент видит понятный путь с первого контакта',
    text: 'Мы уделяем внимание не только анализам, но и коммуникации: администратор помогает с записью, подготовкой и удобным форматом получения результата.',
    image: '/g-5.jpeg',
    alt: 'Администратор IPSUM Pathology принимает пациента',
  },
  {
    eyebrow: 'Лаборатория',
    title: 'Технологичная среда для надежной диагностики',
    text: 'Исследования проходят в лабораторной среде с современным оборудованием, где важны порядок, контроль и внимательная работа специалистов.',
    image: '/lab2.jpg',
    alt: 'Специалист IPSUM Pathology работает с лабораторным оборудованием',
  },
];

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="О нас"
      text="Мы объединяем лабораторную точность, технологичную среду и понятную коммуникацию с пациентом."
      title="IPSUM Pathology"
    >
      <section className="section about-story-section">
        <div className="container about-story-grid">
          <div className="about-story-copy" data-aos="fade-right">
            <p className="eyebrow">Миссия</p>
            <h2>Точность, которая помогает принимать решения</h2>
            <p>
              IPSUM Pathology создана для пациентов и врачей, которым важны надежные лабораторные
              данные, спокойный сервис и быстрый доступ к результатам. Мы делаем путь от записи до
              результата понятным и удобным.
            </p>
            <div className="about-highlights">
              {labHighlights.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
          <figure className="about-story-image" data-aos="fade-left">
            <Image
              alt="Сотрудник IPSUM Pathology в лаборатории"
              fill
              sizes="(max-width: 900px) 100vw, 48vw"
              src="/our_mission.jpg"
            />
          </figure>
        </div>
      </section>

      <section className="section about-corporate-section">
        <div className="container about-corporate-list">
          {corporateStories.map((story, index) => (
            <article
              className={`about-corporate-row${index % 2 === 1 ? ' reversed' : ''}`}
              data-aos={index % 2 === 1 ? 'fade-left' : 'fade-right'}
              data-aos-delay={index * 90}
              key={story.title}
            >
              <figure className="about-corporate-image">
                <Image
                  alt={story.alt}
                  fill
                  sizes="(max-width: 900px) 100vw, 48vw"
                  src={story.image}
                />
              </figure>
              <div className="about-corporate-copy">
                <p className="eyebrow">{story.eyebrow}</p>
                <h2>{story.title}</h2>
                <p>{story.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="about-stats-section">
        <div className="container about-stats-grid">
          {aboutStats.map((stat, index) => (
            <div
              className="about-stat"
              data-aos="zoom-in"
              data-aos-delay={index * 70}
              key={stat.value}
            >
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section about-values-section">
        <div className="container">
          <div className="section-heading" data-aos="fade-up">
            <p className="eyebrow">Подход</p>
            <h2>На чем держится доверие</h2>
          </div>
          <div className="about-values-grid">
            {aboutValues.map((value, index) => {
              const Icon = valueIcons[index] ?? Award;

              return (
                <article
                  className="about-value-card"
                  data-aos="fade-up"
                  data-aos-delay={index * 90}
                  key={value.title}
                >
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

      <section className="section about-route-section">
        <div className="container about-route-grid">
          <div className="about-route-copy" data-aos="fade-right">
            <p className="eyebrow">Как мы работаем</p>
            <h2>От записи до результата без лишней сложности</h2>
            <p>
              Мы строим сервис вокруг понятного пути пациента: минимум неопределенности, аккуратная
              коммуникация и прозрачные этапы лабораторной диагностики.
            </p>
          </div>
          <div className="about-route-cards">
            {labProcess.map((item, index) => {
              const Icon = item.icon;

              return (
                <article
                  className="about-route-card"
                  data-aos="fade-left"
                  data-aos-delay={index * 90}
                  key={item.title}
                >
                  <span className="about-route-number">{String(index + 1).padStart(2, '0')}</span>
                  <span className="about-route-icon" aria-hidden="true">
                    <Icon size={22} strokeWidth={2.3} />
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <PartnersSection />

      <LicensesGallery />

      <section className="about-cta-section">
        <div className="container about-cta">
          <div>
            <p className="eyebrow">Запись</p>
            <h2>Готовы сдать анализ?</h2>
          </div>
          <AppointmentDialog icon="message" label="Записаться" />
        </div>
      </section>
    </PageShell>
  );
}
