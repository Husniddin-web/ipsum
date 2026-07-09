import {
  ClipboardCheck,
  Dna,
  FlaskConical,
  Home,
  Microscope,
  Sparkles,
} from "lucide-react";
import { analysisCategories } from "../_data/content";

const icons = {
  cells: Sparkles,
  clipboard: ClipboardCheck,
  dna: Dna,
  flask: FlaskConical,
  home: Home,
  microscope: Microscope,
};

type ServiceCardsProps = {
  linkHref?: string;
};

export function ServiceCards({ linkHref = "/contact" }: ServiceCardsProps) {
  return (
    <div className="analysis-grid">
      {analysisCategories.map((category, index) => {
        const Icon = icons[category.icon as keyof typeof icons];

        return (
          <article
            className={`analysis-card tone-${category.tone}`}
            data-aos="fade-up"
            data-aos-delay={(index % 3) * 90}
            key={category.title}
          >
            <div className="analysis-card-top">
              <span className="analysis-icon" aria-hidden="true">
                <Icon size={24} strokeWidth={2.2} />
              </span>
              <span className="analysis-count">
                <strong>{category.count}</strong>
                <span>видов</span>
              </span>
            </div>
            <span className="analysis-label">Лабораторное направление</span>
            <h3>{category.title}</h3>
            <p>{category.description}</p>
            <a href={linkHref}>Подробнее</a>
          </article>
        );
      })}
    </div>
  );
}
