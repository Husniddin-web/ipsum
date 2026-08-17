'use client';

import Image from 'next/image';
import { Handshake } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function PartnersSection() {
  const t = useTranslations('home');

  const partnerList = [
    {
      key: 'cleveland',
      name: 'Cleveland Clinic',
      image: '/partner_cleveland_clinic.png',
      country: t('partners.items.cleveland.country'),
      text: t('partners.items.cleveland.text'),
    },
    {
      key: 'roche',
      name: 'Hoffmann-La Roche',
      image: '/partner_roche.png',
      country: t('partners.items.roche.country'),
      text: t('partners.items.roche.text'),
    },
    {
      key: 'centogene',
      name: 'CENTOGENE',
      image: '/partner_centogene.png',
      country: t('partners.items.centogene.country'),
      text: t('partners.items.centogene.text'),
    },
    {
      key: 'core',
      name: 'Core Diagnostics',
      image: '/partner_core_diagnostics.png',
      country: t('partners.items.core.country'),
      text: t('partners.items.core.text'),
    },
    {
      key: 'foundation',
      name: 'Foundation Medicine',
      abbr: 'FMI',
      color: '#1a365d',
      country: t('partners.items.foundation.country'),
      text: t('partners.items.foundation.text'),
    },
    {
      key: 'onecell',
      name: 'OneCell',
      abbr: 'OneCell',
      color: '#0d5c75',
      country: t('partners.items.onecell.country'),
      text: t('partners.items.onecell.text'),
    },
    {
      key: 'memorial',
      name: 'Memorial',
      abbr: 'Memorial',
      color: '#8b0000',
      country: t('partners.items.memorial.country'),
      text: t('partners.items.memorial.text'),
    },
  ];

  return (
    <section className="section partners-section">
      <div className="container partners-shell">
        <div className="partners-heading" data-aos="fade-up">
          <div>
            <p className="eyebrow">{t('partners.eyebrow')}</p>
            <h2>{t('partners.title')}</h2>
          </div>
          <p>{t('partners.desc')}</p>
        </div>

        <div className="partners-grid">
          {partnerList.map((partner, index) => (
            <article
              className="partner-card"
              data-aos="fade-up"
              data-aos-delay={index * 70}
              key={partner.name}
            >
              <div className="partner-logo-wrap">
                {partner.image ? (
                  <Image
                    alt={partner.name}
                    className="partner-logo"
                    fill
                    sizes="(max-width: 760px) 100vw, 30vw"
                    src={partner.image}
                  />
                ) : (
                  <div
                    className="partner-logo-abbr"
                    style={{ background: partner.color ?? '#0d2240' }}
                  >
                    <span>{partner.abbr}</span>
                  </div>
                )}
              </div>
              <div className="partner-card-body">
                <span>
                  <Handshake size={15} />
                  {partner.country}
                </span>
                <h3>{partner.name}</h3>
                <p>{partner.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
