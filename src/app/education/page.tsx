import type { Metadata } from 'next';
import Image from 'next/image';
import { BookOpen, CheckCircle2, Clock3, FileText, GraduationCap, UsersRound } from 'lucide-react';
import { PageShell } from '../_components/page-shell';
import { contactInfo } from '../_data/content';

export const metadata: Metadata = {
  title: 'Обучение | IPSUM Pathology',
  description:
    'Программа клинической ординатуры IPSUM Pathology по направлению патологическая анатомия.',
};

const features = [
  'Практическая подготовка под руководством опытных патоморфологов',
  'Иммуногистохимия, молекулярная диагностика и цифровая патология',
  'Междисциплинарная работа с врачами разных специальностей',
];

const admission = [
  ['Длительность обучения', '2 года'],
  ['Форма обучения', 'очная на платно-контрактной основе'],
  ['Стоимость обучения', '30 000 000 сум за один учебный год'],
  ['Размер стипендии', '2 500 000 сум'],
];

const examRows = [
  ['Терапия', '17', '1,1 балла', '18,7 баллов'],
  ['Хирургия', '17', '1,1 балла', '18,7 баллов'],
  ['Акушерство и гинекология', '16', '1,1 балла', '17,6 баллов'],
  ['Итого', '50', '', '55,0 баллов'],
];

export default function EducationPage() {
  return (
    <PageShell
      eyebrow="Обучение"
      text="Клиническая ординатура для специалистов, которые хотят работать с современными диагностическими технологиями в патоморфологии."
      title="Программа клинической ординатуры"
    >
      <section className="section education-section">
        <div className="container education-shell">
          <div className="education-intro-card" data-aos="fade-up">
            <div>
              <p className="eyebrow">IPSUM Pathology</p>
              <h2>Подготовка специалистов для точной лабораторной диагностики</h2>
              <p>
                Программа ориентирована на врачей, которые хотят освоить современные лабораторные
                методики, клиническую интерпретацию данных и практические навыки патоморфологической
                диагностики.
              </p>
            </div>
            <figure>
              <Image
                alt="Специалисты IPSUM Pathology в лаборатории"
                fill
                sizes="(max-width: 900px) 100vw, 34vw"
                src="/g-14.jpeg"
              />
            </figure>
          </div>

          <div className="education-feature-grid">
            {features.map((feature, index) => (
              <article data-aos="fade-up" data-aos-delay={index * 50} key={feature}>
                <CheckCircle2 size={20} />
                <span>{feature}</span>
              </article>
            ))}
          </div>

          <div className="education-two-col">
            <article className="education-panel" data-aos="fade-right">
              <span className="education-panel-icon">
                <GraduationCap size={24} />
              </span>
              <h2>Условия приёма</h2>
              <p>
                Направление: «Патологическая анатомия». Поступить могут выпускники факультетов
                «Лечебное дело» и «Педиатрия».
              </p>
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
              <h2>Как подать документы</h2>
              <p>
                Подайте документы онлайн через medtoifa.ssv.uz с использованием OneID.
              </p>
              <strong>Важно: подача на несколько направлений одновременно запрещена.</strong>
            </article>
          </div>

          <section className="education-exam" data-aos="fade-up">
            <div className="education-exam-head">
              <div>
                <p className="eyebrow">Экзамен</p>
                <h2>Формат и критерии тестирования</h2>
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
                  проходной балл от 30%
                </span>
              </div>
            </div>
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
                  {examRows.map(([subject, tasks, criteria, max]) => (
                    <tr key={subject}>
                      <td>{subject}</td>
                      <td>{tasks}</td>
                      <td>{criteria}</td>
                      <td>{max}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="education-contact" data-aos="fade-up">
            <div>
              <p className="eyebrow">Контакты</p>
              <h2>Остались вопросы по обучению?</h2>
            </div>
            <a href={contactInfo.phoneHref}>{contactInfo.phone}</a>
          </section>
        </div>
      </section>
    </PageShell>
  );
}
