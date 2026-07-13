import type { Metadata } from 'next';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { ContactForm } from '../_components/contact-form';
import { PageShell } from '../_components/page-shell';
import { contactInfo } from '../_data/content';

export const metadata: Metadata = {
  title: 'Контакты | IPSUM Pathology',
  description: 'Свяжитесь с IPSUM Pathology: телефон, email, адрес, форма записи и карта.',
};

const contactCards = [
  {
    icon: Phone,
    label: 'Телефон',
    value: contactInfo.phone,
    href: contactInfo.phoneHref,
  },
  {
    icon: Mail,
    label: 'Email',
    value: contactInfo.email,
    href: contactInfo.emailHref,
  },
  {
    icon: MapPin,
    label: 'Адрес',
    value: contactInfo.address,
  },
  {
    icon: Clock,
    label: 'Время работы',
    value: contactInfo.hours,
  },
];

export default function ContactPage() {
  return (
    <PageShell
      eyebrow="Контакты"
      heroVariant="contact"
      text="Запишитесь на анализ, уточните услугу или задайте вопрос администратору."
      title="Свяжитесь с IPSUM Pathology"
    >
      <section className="section contact-page-section">
        <div className="container contact-layout">
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

          <div className="contact-form-card">
            <div className="form-heading">
              <p className="eyebrow">Форма связи</p>
              <h2>Оставьте заявку</h2>
              <p>
                Мы свяжемся с вами, уточним направление диагностики и удобное время для сдачи
                анализа.
              </p>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="map-section">
        <div className="container">
          <iframe
            allowFullScreen
            className="map-frame"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={contactInfo.mapSrc}
            title={contactInfo.mapTitle}
          />
        </div>
      </section>
    </PageShell>
  );
}
