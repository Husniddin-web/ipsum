import { labHighlights } from "../_data/content";
import { AppointmentDialog } from "./appointment-dialog";

export function TrustSection() {
  return (
    <section className="trust-section" id="about">
      <div className="container trust-grid">
        <div>
          <p className="eyebrow">Почему IPSUM</p>
          <h2>Лаборатория, где важны точность, скорость и спокойствие пациента</h2>
        </div>
        <div className="trust-copy">
          <p>
            IPSUM Pathology объединяет лабораторную диагностику, патологию и
            современные молекулярные методы, чтобы результаты были полезны врачу
            и понятны пациенту.
          </p>
          <ul>
            {labHighlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <AppointmentDialog label="Получить консультацию" variant="dark" />
        </div>
      </div>
    </section>
  );
}
