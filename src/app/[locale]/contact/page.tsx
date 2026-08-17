import type { Metadata } from 'next';
import { Mail, MapPin, Phone, Building2, Send } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ContactForm } from '../../_components/contact-form';
import { PageShell } from '../../_components/page-shell';
import { contactInfo } from '../../_data/content';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  return {
    title: `${t('eyebrow')} | IPSUM Pathology`,
    description: t('heroText'),
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('contact');
  const tCommon = await getTranslations('common');

  const contactCards = [
    {
      icon: Mail,
      label: t('emailLabel'),
      value: contactInfo.email,
      action: t('emailAction'),
      href: contactInfo.emailHref,
    },
    {
      icon: Phone,
      label: t('phoneLabel'),
      value: contactInfo.phone,
      action: t('phoneAction'),
      href: contactInfo.phoneHref,
    },
    {
      icon: Send,
      label: t('telegramLabel'),
      value: '@ipsumuz_bot',
      action: t('telegramAction'),
      href: 'https://t.me/ipsumuz_bot',
    },
    {
      icon: MapPin,
      label: t('addressLabel'),
      value: tCommon('contactInfo.address'),
      action: tCommon('contactInfo.hours'),
    },
  ];

  const branches = [
    {
      name: t('branch1_name'),
      fullName: t('branch1_fullName'),
      address: t('branch1_address'),
      phones: ['+998 (71) 203-93-00', '+998 (95) 199-93-01'],
      email: 'info@ipsumpathology.uz',
      mapQuery: 'Богистон 1, Ташкент',
    },
    {
      name: t('branch2_name'),
      fullName: t('branch2_fullName'),
      address: t('branch2_address'),
      phones: ['+998 (95) 199-93-01', '+998 (95) 199-93-04'],
      email: 'info@ipsumpathology.uz',
      mapQuery: 'Арнасай 17, Ташкент',
    },
  ];

  return (
    <PageShell
      eyebrow={t('eyebrow')}
      heroVariant="contact"
      text={t('heroText')}
      title={t('heroTitle')}
    >
      <section className="section contact-page-section">
        <div className="container contact-stack">
          <div className="contact-info-grid">
            {contactCards.map((card) => {
              const Icon = card.icon;
              const content = (
                <>
                  <span aria-hidden="true">
                    <Icon size={23} strokeWidth={2.2} />
                  </span>
                  <p>{card.label}</p>
                  <strong>{card.value}</strong>
                  <em>{card.action}</em>
                </>
              );

              return card.href ? (
                <a className="contact-info-card" href={card.href} key={card.label}>
                  {content}
                </a>
              ) : (
                <div className="contact-info-card" key={card.label}>
                  {content}
                </div>
              );
            })}
          </div>

          <div className="contact-main-grid">
            <div className="contact-form-card">
              <div className="form-heading">
                <p className="eyebrow">{t('formEyebrow')}</p>
                <h2>{t('formTitle')}</h2>
                <p>{t('formDesc')}</p>
              </div>
              <ContactForm />
            </div>

            <div className="contact-map-card">
              <iframe
                allowFullScreen
                className="map-frame"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                src={contactInfo.mapSrc}
                title={contactInfo.mapTitle}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section contact-branches-section">
        <div className="container">
          <div className="section-heading" data-aos="fade-up">
            <p className="eyebrow">{t('branchesEyebrow')}</p>
            <h2>{t('branchesTitle')}</h2>
            <p>{t('branchesDesc')}</p>
          </div>

          <div className="branches-grid">
            {branches.map((branch, index) => (
              <article
                className="branch-card"
                data-aos="fade-up"
                data-aos-delay={index * 100}
                key={branch.name}
              >
                <div className="branch-card-header">
                  <span className="branch-icon">
                    <Building2 size={22} strokeWidth={2} />
                  </span>
                  <div>
                    <h3>{branch.name}</h3>
                    <p className="branch-subtitle">{branch.fullName}</p>
                  </div>
                </div>

                <div className="branch-card-body">
                  <div className="branch-info-row">
                    <MapPin size={16} strokeWidth={2} />
                    <span>{branch.address}</span>
                  </div>

                  <div className="branch-phones">
                    {branch.phones.map((phone) => (
                      <a
                        className="branch-phone-link"
                        href={`tel:${phone.replace(/[^+\d]/g, '')}`}
                        key={phone}
                      >
                        <Phone size={15} strokeWidth={2} />
                        {phone}
                      </a>
                    ))}
                  </div>

                  <a className="branch-email-link" href={`mailto:${branch.email}`}>
                    <Mail size={15} strokeWidth={2} />
                    {branch.email}
                  </a>
                </div>

                <a
                  className="branch-map-btn"
                  href={`https://maps.google.com/?q=${encodeURIComponent(branch.mapQuery)}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {t('showOnMap')}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
