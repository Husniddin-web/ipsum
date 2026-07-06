import { Search } from "lucide-react";
import { ServiceCards } from "./service-cards";

export function AnalysisSection() {
  return (
    <section className="section analysis-section" id="analysis">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">Направления диагностики</p>
          <h2>Анализы, которые легко выбрать и удобно сдать</h2>
          <p>
            Выберите направление, оставьте заявку и получите подсказку по
            подготовке, срокам и удобному способу сдачи биоматериала.
          </p>
        </div>

        <div className="search-strip" role="search">
          <Search aria-hidden="true" size={22} strokeWidth={2.4} />
          <input
            aria-label="Поиск анализа"
            placeholder="Введите название анализа или направления"
            type="search"
          />
          <button type="button">Найти</button>
        </div>

        <ServiceCards />
      </div>
    </section>
  );
}
