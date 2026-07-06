import { AppointmentDialog } from "./appointment-dialog";

export function HeroSection() {
  return (
    <section className="hero-section" id="home">
      <div className="hero-bg" />
      <div className="container hero-content">
        <div className="hero-copy">
          <p className="hero-kicker">IPSUM PATHOLOGY</p>
          <h1>Диагностика, которой доверяют.</h1>
          <p className="hero-lead">
            Анализы, патология и молекулярные исследования в современной
            лаборатории.
          </p>
          <div className="hero-actions">
            <AppointmentDialog label="Сдать анализ" />
            <a className="button button-hero-secondary" href="#analysis">
              Услуги
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
