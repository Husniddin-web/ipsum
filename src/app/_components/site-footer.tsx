import Image from 'next/image';
import { contactInfo, navigation } from '../_data/content';
import { AppointmentDialog } from './appointment-dialog';

export function SiteFooter() {
  return (
    <footer className="site-footer" id="contacts">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Image
            alt="IPSUM Pathology"
            className="footer-logo"
            height={48}
            src="/logo.png"
            width={190}
          />
          <p>
            Лаборатория и диагностический центр в Ташкенте. Анализы, патологические исследования и
            выездной забор.
          </p>
          <div className="footer-socials">
            <a
              href="https://www.facebook.com/ipsumpathology/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/ipsumpathology/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
          </div>
        </div>
        <div>
          <h3>Навигация</h3>
          <nav aria-label="Навигация в подвале">
            {navigation.map((item) => (
              <a href={item.href} key={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
        </div>
        <div>
          <h3>Контакты</h3>
          <address>
            <a href={contactInfo.phoneHref}>{contactInfo.phone}</a>
            <a href={contactInfo.emailHref}>{contactInfo.email}</a>
            <span>{contactInfo.address}</span>
            <span>{contactInfo.hours}</span>
          </address>
        </div>
        <div className="footer-cta">
          <h3>Нужна помощь?</h3>
          <p>Оставьте заявку, и мы поможем выбрать нужное исследование.</p>
          <AppointmentDialog icon="message" label="Оставить заявку" />
        </div>
      </div>
      <div className="container footer-bottom">
        <span>IPSUM Pathology, 2026</span>
        <span>Лаборатория и диагностика</span>
      </div>
    </footer>
  );
}
