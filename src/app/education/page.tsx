import type { Metadata } from 'next';
import Image from 'next/image';
import {
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock3,
  ExternalLink,
  FileCheck2,
  FileText,
  Globe2,
  GraduationCap,
  IdCard,
  MapPin,
  PhoneCall,
  Send,
  ShieldCheck,
  UsersRound,
} from 'lucide-react';
import { PageShell } from '../_components/page-shell';

export const metadata: Metadata = {
  title: 'Обучение | IPSUM Pathology',
  description:
    'Программа клинической ординатуры IPSUM Pathology по направлению патологическая анатомия на 2026/2027 учебный год.',
};

const features = [
  'Практическая подготовка под руководством опытных патоморфологов',
  'Иммуногистохимия, молекулярная диагностика и цифровая патология',
  'Междисциплинарная работа с врачами разных специальностей',
];

const admission = [
  ['Длительность обучения', '2 года'],
  ['Форма обучения', 'Очная на платно-контрактной основе'],
  ['Стоимость обучения', '30 000 000 сум за 1 учебный год'],
  ['Размер стипендии', '2 500 000 сум'],
];

const eligibleFaculties = [
  'Лечебное дело',
  'Профессиональное образование (Лечебное дело)',
  'Педиатрия',
];

const examRowsGeneral = [
  ['Терапия', '17', '1,1 балла', '18,7 баллов'],
  ['Хирургия', '17', '1,1 балла', '18,7 баллов'],
  ['Акушерство и гинекология', '16', '1,1 балла', '17,6 баллов'],
];

const examRowsPediatrics = [
  ['Педиатрия', '17', '1,1 балла', '18,7 баллов'],
  ['Детская хирургия', '17', '1,1 балла', '18,7 баллов'],
  ['Терапия', '16', '1,1 балла', '17,6 баллов'],
];

export default function EducationPage() {
  return (
    <PageShell
      eyebrow="Обучение"
      text="Клиническая ординатура по направлению «Патологическая анатомия» на 2026/2027 учебный год."
      title="Программа клинической ординатуры"
    >
      <section className="section education-section">
        <div className="container education-shell">
          {/* Main Intro Card */}
          <div className="education-intro-card" data-aos="fade-up">
            <div>
              <p className="eyebrow">IPSUM Pathology</p>
              <h2>Подготовка специалистов для точной лабораторной диагностики</h2>
              <p>
                Программа ориентирована на врачей, которые хотят освоить современные лабораторные
                методики, клиническую интерпретацию данных и практические навыки патоморфологической
                диагностики высшего уровня.
              </p>
            </div>
            <figure>
              <Image
                alt="Специалисты IPSUM Pathology в лаборатории"
                fill
                sizes="(max-width: 900px) 100vw, 34vw"
                src="/edu_main.jpg"
              />
            </figure>
          </div>

          {/* Features */}
          <div className="education-feature-grid">
            {features.map((feature, index) => (
              <article data-aos="fade-up" data-aos-delay={index * 50} key={feature}>
                <CheckCircle2 size={20} />
                <span>{feature}</span>
              </article>
            ))}
          </div>

          {/* Practical Training Photo Showcase */}
          <section className="education-gallery-section" data-aos="fade-up">
            <div className="education-gallery-head">
              <p className="eyebrow">Практическое обучение</p>
              <h2>Современная лабораторно-клиническая база</h2>
              <p>
                Ординаторы участвуют в реальных исследованиях, осваивают гистологическое,
                иммуногистохимическое и молекулярное оборудование нового поколения.
              </p>
            </div>
            <div className="education-gallery-grid">
              <figure className="education-gallery-card">
                <Image
                  alt="Разбор клинических случаев"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  src="/edu_gallery_1.jpg"
                />
                <figcaption>Разбор сложной патоморфологической диагностики</figcaption>
              </figure>
              <figure className="education-gallery-card">
                <Image
                  alt="Междисциплинарная работа"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  src="/edu_gallery_2.jpg"
                />
                <figcaption>Междисциплинарная работа специалистов</figcaption>
              </figure>
              <figure className="education-gallery-card">
                <Image
                  alt="Цифровая диагностика"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  src="/edu_gallery_3.jpg"
                />
                <figcaption>Автоматизированная цифровая диагностика</figcaption>
              </figure>
            </div>
          </section>

          {/* International Cooperation & Official Certificate */}
          <div className="education-two-col" data-aos="fade-up">
            <article className="education-info-card">
              <div className="education-card-header">
                <Globe2 className="education-card-icon" size={24} />
                <h3>Международное сотрудничество</h3>
              </div>
              <p>
                Наша лаборатория активно сотрудничает с ведущими медицинскими учреждениями и научными центрами из <strong>США, Турции и Индии</strong> в области патологии, гистологии и молекулярной диагностики. Это позволяет ординаторам получать знания международного уровня.
              </p>
            </article>

            <article className="education-info-card">
              <div className="education-card-header">
                <Award className="education-card-icon" size={24} />
                <h3>Диплом и трудоустройство</h3>
              </div>
              <p>
                По окончании клинической ординатуры выдается <strong>свидетельство государственного образца</strong>. Выпускники получают возможность успешного трудоустройства как в ведущих лабораториях страны, так и в международных диагностических центрах.
              </p>
            </article>
          </div>

          {/* Admission & How to Apply Grid */}
          <div className="education-two-col">
            <article className="education-panel" data-aos="fade-right">
              <span className="education-panel-icon">
                <GraduationCap size={24} />
              </span>
              <h2>Условия приёма</h2>
              <p>
                Направление: <strong>«Патологическая анатомия»</strong> (2026/2027 учебный год).
              </p>
              
              <div className="education-faculties">
                <span className="education-sublabel">Кто может поступить:</span>
                <ul>
                  {eligibleFaculties.map((faculty) => (
                    <li key={faculty}>
                      <CheckCircle2 size={16} />
                      <span>{faculty}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="education-facts">
                {admission.map(([label, value]) => (
                  <div key={label}>
                    <span>{label}</span>
                    <strong>{value}</strong>
                  </div>
                ))}
              </div>
            </article>

            <article className="education-panel education-panel-red" data-aos="fade-left">
              <span className="education-panel-icon">
                <FileText size={24} />
              </span>
              <h2>Подача документов онлайн</h2>
              <p>
                Подача документов осуществляется самостоятельно онлайн через официальный портал:
              </p>
              <div className="education-apply-link-box">
                <a
                  className="education-apply-btn"
                  href="https://medtoifa.ssv.uz/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span>Перейти на medtoifa.ssv.uz</span>
                  <ExternalLink size={18} />
                </a>
              </div>
              <p className="education-oneid-note">
                Для входа в систему используется единая система идентификации <strong>OneID</strong>.
              </p>
              <div className="education-warning-box">
                <strong>Важно! Одновременная подача заявлений по нескольким направлениям клинической ординатуры ЗАПРЕЩЕНА.</strong>
              </div>
              <div className="education-deadline-badge">
                <Calendar size={18} />
                <span>Срок подачи: <strong>до 23:59, 20 августа 2026 года</strong></span>
              </div>
            </article>
          </div>

          {/* Legal basis note */}
          <div className="education-legal-bar" data-aos="fade-up">
            <ShieldCheck size={22} />
            <p>
              Приём осуществляется в соответствии с Постановлением КМ РУз №319 от 18.12.2009 г. и Приказом Минздрава РУз №232 от 20.07.2026 г. «О мерах по организации приёма в клиническую ординатуру в 2026/2027 учебном году».
            </p>
          </div>

          {/* Exam Section & Tables */}
          <section className="education-exam" data-aos="fade-up">
            <div className="education-exam-head">
              <div>
                <p className="eyebrow">Экзамен</p>
                <h2>Формат и программа тестирования</h2>
              </div>
              <div className="education-exam-meta">
                <span>
                  <Clock3 size={17} />
                  50 минут
                </span>
                <span>
                  <BookOpen size={17} />
                  50 вопросов
                </span>
                <span>
                  <UsersRound size={17} />
                  Проходной балл: от 30% (16,5 б.)
                </span>
              </div>
            </div>

            <div className="education-exam-details-grid">
              <div className="education-exam-detail-item">
                <Calendar size={20} />
                <div>
                  <strong>Период проведения:</strong>
                  <p>С 25 по 30 августа 2026 года (тестирование в один этап)</p>
                </div>
              </div>

              <div className="education-exam-detail-item">
                <MapPin size={20} />
                <div>
                  <strong>Место проведения:</strong>
                  <p>Центр оценки квалификации медицинских работников и его филиалы</p>
                </div>
              </div>

              <div className="education-exam-detail-item">
                <IdCard size={20} />
                <div>
                  <strong>При себе иметь:</strong>
                  <p>Паспорт / ID-карта / Загранпаспорт / Водительские права</p>
                </div>
              </div>
            </div>

            {/* Table 1: General Medicine & Professional Ed */}
            <div className="education-table-section">
              <h3 className="education-table-title">
                <FileCheck2 size={20} />
                <span>1. Комплекс предметов для факультетов «Лечебное дело» и «Профессиональное образование (Лечебное дело)»</span>
              </h3>
              <div className="education-table-wrap">
                <table className="education-table">
                  <thead>
                    <tr>
                      <th>Название предметов</th>
                      <th>Количество заданий</th>
                      <th>Критерии оценивания</th>
                      <th>Максимальный балл</th>
                    </tr>
                  </thead>
                  <tbody>
                    {examRowsGeneral.map(([subject, tasks, criteria, max]) => (
                      <tr key={subject}>
                        <td><strong>{subject}</strong></td>
                        <td>{tasks}</td>
                        <td>{criteria}</td>
                        <td>{max}</td>
                      </tr>
                    ))}
                    <tr className="education-table-total">
                      <td><strong>Итого</strong></td>
                      <td><strong>50 вопросов</strong></td>
                      <td>—</td>
                      <td><strong>55,0 баллов (100%)</strong></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Table 2: Pediatrics */}
            <div className="education-table-section">
              <h3 className="education-table-title">
                <FileCheck2 size={20} />
                <span>2. Комплекс предметов для факультета «Педиатрическое дело»</span>
              </h3>
              <div className="education-table-wrap">
                <table className="education-table">
                  <thead>
                    <tr>
                      <th>Название предметов</th>
                      <th>Количество заданий</th>
                      <th>Критерии оценивания</th>
                      <th>Максимальный балл</th>
                    </tr>
                  </thead>
                  <tbody>
                    {examRowsPediatrics.map(([subject, tasks, criteria, max]) => (
                      <tr key={subject}>
                        <td><strong>{subject}</strong></td>
                        <td>{tasks}</td>
                        <td>{criteria}</td>
                        <td>{max}</td>
                      </tr>
                    ))}
                    <tr className="education-table-total">
                      <td><strong>Итого</strong></td>
                      <td><strong>50 вопросов</strong></td>
                      <td>—</td>
                      <td><strong>55,0 баллов (100%)</strong></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Call Center & Contact Section */}
          <section className="education-contact" data-aos="fade-up">
            <div>
              <p className="eyebrow">Приёмная комиссия</p>
              <h2>Call-центр ООО «IPSUM PATHOLOGY»</h2>
              <p className="education-contact-sub">
                Режим работы: Понедельник – Суббота (09:00 – 18:00), обед: 13:00 – 14:00
              </p>
            </div>
            <div className="education-contact-actions">
              <a className="education-phone-btn" href="tel:+998774803013">
                <PhoneCall size={18} />
                <span>+998 77 480 30 13</span>
              </a>
              <a
                className="education-telegram-btn"
                href="https://t.me/ipsum_study"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Send size={18} />
                <span>@ipsum_study</span>
              </a>
            </div>
          </section>
        </div>
      </section>
    </PageShell>
  );
}
