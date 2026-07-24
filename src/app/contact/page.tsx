import type { Metadata } from 'next';
import { Mail, MapPin, Phone } from 'lucide-react';
import { ContactForm } from '../_components/contact-form';
import { PageShell } from '../_components/page-shell';
import { contactInfo } from '../_data/content';

export const metadata: Metadata = {
  title: 'Контакты | IPSUM Pathology',
  description: 'Свяжитесь с IPSUM Pathology: телефон, email, адрес, форма записи и карта.',
};

const contactCards = [
  {
    icon: Mail,
    label: 'Напишите нам',
    value: contactInfo.email,
    action: 'Отправить email',
    href: contactInfo.emailHref,
  },
  {
    icon: Phone,
    label: 'Позвоните нам',
    value: contactInfo.phone,
    action: 'Позвонить',
    href: contactInfo.phoneHref,
  },
  {
    icon: MapPin,
    label: 'Приезжайте к нам',
    value: contactInfo.address,
    action: contactInfo.hours,
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
                <p className="eyebrow">Форма связи</p>
                <h2>Оставьте заявку</h2>
                <p>
                  Мы свяжемся с вами, уточним направление диагностики и удобное время для сдачи
                  анализа.
                </p>
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
