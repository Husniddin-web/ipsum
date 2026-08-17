'use client';

import { ClipboardList, FileCheck2, MapPin } from 'lucide-react';
import { useTranslations } from 'next-intl';

const stepIcons = [ClipboardList, MapPin, FileCheck2];

export function ProcessSection() {
  const t = useTranslations('home');

  const processSteps = [
    {
      number: '01',
      title: t('process.s1_title'),
      text: t('process.s1_text'),
    },
    {
      number: '02',
      title: t('process.s2_title'),
      text: t('process.s2_text'),
    },
    {
      number: '03',
      title: t('process.s3_title'),
      text: t('process.s3_text'),
    },
  ];

  return (
    <section className="section process-section" id="process">
      <div className="process-decoration top-left" aria-hidden="true" />
      <div className="process-decoration bottom-right" aria-hidden="true" />
      <div className="container">
        <div className="section-heading process-heading" data-aos="fade-up">
          <p className="eyebrow">{t('process.eyebrow')}</p>
          <h2>{t('process.title')}</h2>
          <p>{t('process.subtitle')}</p>
        </div>
        <div className="steps-grid">
          {processSteps.map((step, index) => {
            const Icon = stepIcons[index];

            return (
              <article
                className="step-card"
                data-aos="fade-up"
                data-aos-delay={index * 100}
                key={step.number}
              >
                <div className="step-card-head">
                  <span className="step-number">{step.number}</span>
                  <span className="step-icon" aria-hidden="true">
                    <Icon size={24} strokeWidth={2.3} />
                  </span>
                </div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
