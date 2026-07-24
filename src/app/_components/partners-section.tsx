import Image from 'next/image';
import { ArrowUpRight, Handshake } from 'lucide-react';
import { partnerMentions, partners } from '../_data/content';

export function PartnersSection() {
  return (
    <section className="section partners-section">
      <div className="container partners-shell">
        <div className="partners-heading" data-aos="fade-up">
          <div>
            <p className="eyebrow">Наши партнеры</p>
            <h2>Международная экспертиза для точной диагностики</h2>
          </div>
          <p>
            IPSUM Pathology сотрудничает с ведущими компаниями и экспертами в области медицины,
            биотехнологий и лабораторной диагностики. Это помогает внедрять передовые методики,
            повышать качество исследований и применять лучшие мировые практики в ежедневной работе.
          </p>
        </div>

        <div className="partners-grid">
          {partners.map((partner, index) => (
            <article
              className="partner-card"
              data-aos="fade-up"
              data-aos-delay={index * 90}
              key={partner.name}
            >
              <div className="partner-logo-wrap">
                <Image
                  alt={partner.name}
                  className="partner-logo"
                  fill
                  sizes="(max-width: 760px) 100vw, 30vw"
                  src={partner.image}
                />
              </div>
              <div className="partner-card-body">
                <span>
                  <Handshake size={15} />
                  {partner.country}
                </span>
                <h3>{partner.name}</h3>
                <p>{partner.text}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="partners-mentions" data-aos="fade-up">
          <span className="partners-mentions-title">
            <ArrowUpRight size={16} />
            Также сотрудничаем
          </span>
          <div>
            {partnerMentions.map((name) => (
              <span key={name}>{name}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
