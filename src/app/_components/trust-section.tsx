import { Activity, Gauge, MessageCircle, ShieldCheck } from 'lucide-react';
import { AppointmentDialog } from './appointment-dialog';

const trustFeatures = [
  {
    title: 'Патология и диагностика',
    text: 'Клинические, патологические и молекулярные исследования в одной системе.',
    icon: Activity,
  },
  {
    title: 'Современное оборудование',
    text: 'Лабораторная среда для стабильных и воспроизводимых результатов.',
    icon: Gauge,
  },
  {
    title: 'Контроль качества',
    text: 'Внимание к каждому этапу: от забора биоматериала до выдачи результата.',
    icon: ShieldCheck,
  },
  {
    title: 'Связь с пациентом',
    text: 'Понятная запись, консультация администратора и удобный доступ к ответам.',
    icon: MessageCircle,
  },
];

export function TrustSection() {
  return (
    <section className="trust-section" id="about">
      <div className="trust-glow" aria-hidden="true" />
      <div className="container trust-grid">
        <div data-aos="fade-right">
          <p className="eyebrow">Почему IPSUM</p>
          <h2>Точность, скорость и доверие</h2>
        </div>
        <div className="trust-copy" data-aos="fade-left" data-aos-delay="120">
          <p>
            IPSUM Pathology объединяет лабораторную диагностику, патологию и современные
            молекулярные методы, чтобы результаты были полезны врачу и понятны пациенту.
          </p>
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
          <AppointmentDialog icon="message" label="Получить консультацию" variant="dark" />
        </div>
      </div>
    </section>
  );
}
