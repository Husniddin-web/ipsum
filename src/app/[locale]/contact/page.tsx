import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ContactForm } from '../../_components/contact-form';
import { PageShell } from '../../_components/page-shell';
import { BranchCards } from '../../_components/branch-cards';
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

  const branches = [
    {
      id: 'branch-1',
      badge: t('branch1_badge'),
      name: t('branch1_name'),
      fullName: t('branch1_fullName'),
      address: t('branch1_address'),
      hours: tCommon('contactInfo.hours'),
      phones: ['+998 (71) 203-93-00', '+998 (95) 199-93-01'],
      email: 'info@ipsumpathology.uz',
      telegram: '@ipsumuz_bot',
      telegramHref: 'https://t.me/ipsumuz_bot',
      mapQuery: 'Ташкент, ул. Богистон, 1',
      yandexQuery: 'Ташкент, Чиланзарский район, улица Богистон, 1',
    },
    {
      id: 'branch-2',
      badge: t('branch2_badge'),
      name: t('branch2_name'),
      fullName: t('branch2_fullName'),
      address: t('branch2_address'),
      hours: tCommon('contactInfo.hours'),
      phones: ['+998 (95) 199-93-01', '+998 (95) 199-93-04'],
      email: 'info@ipsumpathology.uz',
      telegram: '@ipsumuz_bot',
      telegramHref: 'https://t.me/ipsumuz_bot',
      mapQuery: 'Ташкент, ул. Арнасай, 17',
      yandexQuery: 'Ташкент, Чиланзарский район, улица Арнасай, 17',
    },
  ];

  return (
    <PageShell
      eyebrow={t('eyebrow')}
      heroVariant="contact"
      text={t('heroText')}
      title={t('heroTitle')}
    >
      {/* ── 1. Branches Section (First) ── */}
      <section className="section contact-branches-section">
        <div className="container">
          <div className="section-heading" data-aos="fade-up">
            <h2>{t('branchesTitle')}</h2>
          </div>

          <BranchCards branches={branches} />
        </div>
      </section>

      {/* ── 2. Contact Form & Map Section (Second) ── */}
      <section className="section contact-page-section">
        <div className="container contact-stack">
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
    </PageShell>
  );
}
