import { ClipboardList, FileCheck2, MapPin } from 'lucide-react';
import { processSteps } from '../_data/content';

const stepIcons = [ClipboardList, MapPin, FileCheck2];

export function ProcessSection() {
  return (
    <section className="section process-section" id="process">
      <div className="process-decoration top-left" aria-hidden="true" />
      <div className="process-decoration bottom-right" aria-hidden="true" />
      <div className="container">
        <div className="section-heading process-heading" data-aos="fade-up">
          <p className="eyebrow">Как это работает</p>
          <h2>Сдать анализы просто</h2>
          <p>От заявки до результата - понятный путь без лишних действий.</p>
        </div>
        <div className="steps-grid">
          {processSteps.map((step, index) => {
            const Icon = stepIcons[index];

            return (
              <article
                className="step-card"
                data-aos="fade-up"
                data-aos-delay={index * 100}
                key={step.number}
              >
                <div className="step-card-head">
                  <span className="step-number">{step.number}</span>
                  <span className="step-icon" aria-hidden="true">
                    <Icon size={24} strokeWidth={2.3} />
                  </span>
                </div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
