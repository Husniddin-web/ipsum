import Image from "next/image";
import { contactInfo, navigation } from "../_data/content";
import { AppointmentDialog } from "./appointment-dialog";

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
            Лаборатория и диагностический центр в Ташкенте. Анализы,
            патологические исследования и выездной забор.
          </p>
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
