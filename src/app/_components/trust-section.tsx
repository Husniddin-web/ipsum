'use client';

import { Activity, Gauge, MessageCircle, ShieldCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { AppointmentDialog } from './appointment-dialog';

export function TrustSection() {
  const t = useTranslations('home');

  const trustFeatures = [
    {
      title: t('trust.f1_title'),
      text: t('trust.f1_text'),
      icon: Activity,
    },
    {
      title: t('trust.f2_title'),
      text: t('trust.f2_text'),
      icon: Gauge,
    },
    {
      title: t('trust.f3_title'),
      text: t('trust.f3_text'),
      icon: ShieldCheck,
    },
    {
      title: t('trust.f4_title'),
      text: t('trust.f4_text'),
      icon: MessageCircle,
    },
  ];

  return (
    <section className="trust-section" id="about">
      <div className="trust-glow" aria-hidden="true" />
      <div className="container trust-grid">
        <div data-aos="fade-right">
          <p className="eyebrow">{t('trust.eyebrow')}</p>
          <h2>{t('trust.title')}</h2>
        </div>
        <div className="trust-copy" data-aos="fade-left" data-aos-delay="120">
          <p>{t('trust.text')}</p>
          <ul className="trust-features">
            {trustFeatures.map((item, index) => (
              <li data-aos="fade-up" data-aos-delay={index * 80} key={item.title}>
                <span className="trust-feature-icon" aria-hidden="true">
                  <item.icon size={19} strokeWidth={2.4} />
                </span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
          <AppointmentDialog icon="message" label={t('trust.cta')} variant="dark" />
        </div>
      </div>
    </section>
  );
}
