import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
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
import { PageShell } from '../../_components/page-shell';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'education' });
  return {
    title: `${t('eyebrow')} | IPSUM Pathology`,
    description: t('text'),
  };
}

export default async function EducationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('education');

  const features = [
    t('features.f1'),
    t('features.f2'),
    t('features.f3'),
  ];

  const admission = [
    [t('admission.duration'), t('admission.durationVal')],
    [t('admission.form'), t('admission.formVal')],
    [t('admission.fee'), t('admission.feeVal')],
    [t('admission.stipend'), t('admission.stipendVal')],
  ];

  const eligibleFaculties = [
    t('admission.f1'),
    t('admission.f2'),
    t('admission.f3'),
  ];

  const examRowsGeneral = [
    [t('exam.therapy'), '17', `1,1 ${t('exam.pointsUnit')}`, `18,7 ${t('exam.pointsUnit')}`],
    [t('exam.surgery'), '17', `1,1 ${t('exam.pointsUnit')}`, `18,7 ${t('exam.pointsUnit')}`],
    [t('exam.obstetrics'), '16', `1,1 ${t('exam.pointsUnit')}`, `17,6 ${t('exam.pointsUnit')}`],
  ];

  const examRowsPediatrics = [
    [t('exam.pediatrics'), '17', `1,1 ${t('exam.pointsUnit')}`, `18,7 ${t('exam.pointsUnit')}`],
    [t('exam.pediatricSurgery'), '17', `1,1 ${t('exam.pointsUnit')}`, `18,7 ${t('exam.pointsUnit')}`],
    [t('exam.therapy'), '16', `1,1 ${t('exam.pointsUnit')}`, `17,6 ${t('exam.pointsUnit')}`],
  ];

  return (
    <PageShell
      eyebrow={t('eyebrow')}
      text={t('text')}
      title={t('title')}
    >
      <section className="section education-section">
        <div className="container education-shell">
          <div className="education-intro-card" data-aos="fade-up">
            <div>
              <p className="eyebrow">{t('intro.eyebrow')}</p>
              <h2>{t('intro.title')}</h2>
              <p>{t('intro.desc')}</p>
            </div>
            <figure>
              <Image
                alt="IPSUM Pathology Education"
                fill
                sizes="(max-width: 900px) 100vw, 34vw"
                src="/edu_main.jpg"
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

          <section className="education-gallery-section" data-aos="fade-up">
            <div className="education-gallery-head">
              <p className="eyebrow">{t('gallery.eyebrow')}</p>
              <h2>{t('gallery.title')}</h2>
              <p>{t('gallery.desc')}</p>
            </div>
            <div className="education-gallery-grid">
              <figure className="education-gallery-card">
                <Image
                  alt="Clinical cases analysis"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  src="/edu_gallery_1.jpg"
                />
                <figcaption>{t('gallery.g1')}</figcaption>
              </figure>
              <figure className="education-gallery-card">
                <Image
                  alt="Interdisciplinary collaboration"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  src="/edu_gallery_2.jpg"
                />
                <figcaption>{t('gallery.g2')}</figcaption>
              </figure>
              <figure className="education-gallery-card">
                <Image
                  alt="Digital pathology"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  src="/edu_gallery_3.jpg"
                />
                <figcaption>{t('gallery.g3')}</figcaption>
              </figure>
            </div>
          </section>

          <div className="education-two-col" data-aos="fade-up">
            <article className="education-info-card">
              <div className="education-card-header">
                <Globe2 className="education-card-icon" size={24} />
                <h3>{t('international.title')}</h3>
              </div>
              <p>{t('international.desc')}</p>
            </article>

            <article className="education-info-card">
              <div className="education-card-header">
                <Award className="education-card-icon" size={24} />
                <h3>{t('diploma.title')}</h3>
              </div>
              <p>{t('diploma.desc')}</p>
            </article>
          </div>

          <div className="education-two-col">
            <article className="education-panel" data-aos="fade-right">
              <span className="education-panel-icon">
                <GraduationCap size={24} />
              </span>
              <h2>{t('admission.title')}</h2>
              <p>{t('admission.directionLabel')}</p>

              <div className="education-faculties">
                <span className="education-sublabel">{t('admission.facultiesTitle')}</span>
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
              <h2>{t('onlineApply.title')}</h2>
              <p>{t('onlineApply.desc')}</p>
              <div className="education-apply-link-box">
                <a
                  className="education-apply-btn"
                  href="https://medtoifa.ssv.uz/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span>{t('onlineApply.btnText')}</span>
                  <ExternalLink size={18} />
                </a>
              </div>
              <p className="education-oneid-note">{t('onlineApply.oneidNote')}</p>
              <div className="education-warning-box">
                <strong>{t('onlineApply.warning')}</strong>
              </div>
              <div className="education-deadline-badge">
                <Calendar size={18} />
                <span>{t('onlineApply.deadline')}</span>
              </div>
            </article>
          </div>

          <div className="education-legal-bar" data-aos="fade-up">
            <ShieldCheck size={22} />
            <p>{t('legalNote')}</p>
          </div>

          <section className="education-exam" data-aos="fade-up">
            <div className="education-exam-head">
              <div>
                <p className="eyebrow">{t('exam.eyebrow')}</p>
                <h2>{t('exam.title')}</h2>
              </div>
              <div className="education-exam-meta">
                <span>
                  <Clock3 size={17} />
                  {t('exam.duration')}
                </span>
                <span>
                  <BookOpen size={17} />
                  {t('exam.questions')}
                </span>
                <span>
                  <UsersRound size={17} />
                  {t('exam.passScore')}
                </span>
              </div>
            </div>

            <div className="education-exam-details-grid">
              <div className="education-exam-detail-item">
                <Calendar size={20} />
                <div>
                  <strong>{t('exam.periodLabel')}</strong>
                  <p>{t('exam.periodVal')}</p>
                </div>
              </div>

              <div className="education-exam-detail-item">
                <MapPin size={20} />
                <div>
                  <strong>{t('exam.locationLabel')}</strong>
                  <p>{t('exam.locationVal')}</p>
                </div>
              </div>

              <div className="education-exam-detail-item">
                <IdCard size={20} />
                <div>
                  <strong>{t('exam.idLabel')}</strong>
                  <p>{t('exam.idVal')}</p>
                </div>
              </div>
            </div>

            <div className="education-table-section">
              <h3 className="education-table-title">
                <FileCheck2 size={20} />
                <span>{t('exam.table1Title')}</span>
              </h3>
              <div className="education-table-wrap">
                <table className="education-table">
                  <thead>
                    <tr>
                      <th>{t('exam.colSubject')}</th>
                      <th>{t('exam.colTasks')}</th>
                      <th>{t('exam.colCriteria')}</th>
                      <th>{t('exam.colMax')}</th>
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
                      <td><strong>{t('exam.totalLabel')}</strong></td>
                      <td><strong>{t('exam.totalQuestions')}</strong></td>
                      <td>—</td>
                      <td><strong>{t('exam.totalPoints')}</strong></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="education-table-section">
              <h3 className="education-table-title">
                <FileCheck2 size={20} />
                <span>{t('exam.table2Title')}</span>
              </h3>
              <div className="education-table-wrap">
                <table className="education-table">
                  <thead>
                    <tr>
                      <th>{t('exam.colSubject')}</th>
                      <th>{t('exam.colTasks')}</th>
                      <th>{t('exam.colCriteria')}</th>
                      <th>{t('exam.colMax')}</th>
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
                      <td><strong>{t('exam.totalLabel')}</strong></td>
                      <td><strong>{t('exam.totalQuestions')}</strong></td>
                      <td>—</td>
                      <td><strong>{t('exam.totalPoints')}</strong></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section className="education-contact" data-aos="fade-up">
            <div>
              <p className="eyebrow">{t('contact.eyebrow')}</p>
              <h2>{t('contact.title')}</h2>
              <p className="education-contact-sub">{t('contact.hours')}</p>
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
