import type { Metadata } from 'next';
import { Mail, MapPin, Phone, Building2, Send } from 'lucide-react';
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
    icon: Send,
    label: 'Telegram бот',
    value: '@ipsumuz_bot',
    action: 'Написать в бот',
    href: 'https://t.me/ipsumuz_bot',
  },
  {
    icon: MapPin,
    label: 'Приезжайте к нам',
    value: contactInfo.address,
    action: contactInfo.hours,
  },
];

const branches = [
  {
    name: 'Ташкентский городской филиал',
    fullName:
      'Республиканского специализированного научно-практического медицинского центра онкологии и радиологии',
    address: 'г. Ташкент, Чиланзарский район, ул. Богистон, 1',
    phones: ['+998 (71) 203-93-00', '+998 (95) 199-93-01'],
    email: 'info@ipsumpathology.uz',
    mapQuery: 'Богистон 1, Ташкент',
  },
  {
    name: 'Научно-практический медицинский центр',
    fullName: 'детской онкологии, гематологии и иммунологии',
    address: 'г. Ташкент, Чиланзарский район, ул. Арнасай, 17',
    phones: ['+998 (95) 199-93-01', '+998 (95) 199-93-04'],
    email: 'info@ipsumpathology.uz',
    mapQuery: 'Арнасай 17, Ташкент',
  },
];

export default function ContactPage() {
  return (
    <PageShell
      eyebrow="Контакты"
      heroVariant="contact"
      text="Запишитесь на анализ, уточните услугу или задайте вопрос администратору."
      title="Свяжитесь с IPSUM PATHOLOGY"
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

      {/* Branches / Filiallar Section */}
      <section className="section contact-branches-section">
        <div className="container">
          <div className="section-heading" data-aos="fade-up">
            <p className="eyebrow">Филиалы</p>
            <h2>Наши медицинские центры</h2>
            <p>
              IPSUM Pathology работает в двух специализированных медицинских центрах Ташкента,
              обеспечивая высококачественную лабораторную диагностику.
            </p>
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
                  Показать на карте
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
