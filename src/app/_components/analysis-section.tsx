import Link from "next/link";
import Image from "next/image";

const directions = [
  {
    title: "Патоморфологическая лаборатория",
    text: "Полный цикл морфологической диагностики: гистология, цитология, интраоперационная экспресс-диагностика, иммуногистохимические исследования, молекулярная диагностика, цифровая патология.",
    image: "/g-1.jpeg",
  },
  {
    title: "Клинико-диагностическая лаборатория",
    text: "Комплекс современных лабораторных исследований: общеклинические, биохимические, гематологические, коагулологические, иммунологические, бактериологические, гормональные, молекулярно-генетические исследования, онкомаркеры и другие виды лабораторной диагностики.",
    image: "/g-2.jpeg",
  },
];

export function AnalysisSection() {
  return (
    <section className="section analysis-section" id="analysis">
      <div className="container">
        <div className="section-heading" data-aos="fade-up">
          <p className="eyebrow">Наши направления</p>
          <h2>Два ключевых направления лабораторной диагностики</h2>
          <p>
            Выберите направление, чтобы быстро перейти к нужной лабораторной
            услуге и получить понятную консультацию.
          </p>
        </div>

        <div className="direction-grid">
          {directions.map((direction, index) => (
            <article
              className="direction-card"
              data-aos={index === 0 ? "fade-right" : "fade-left"}
              data-aos-delay={index * 110}
              key={direction.title}
            >
              <figure>
                <Image
                  alt={direction.title}
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                  src={direction.image}
                />
              </figure>
              <div className="direction-card-body">
                <span className="analysis-label">Лабораторное направление</span>
                <h3>{direction.title}</h3>
                <p>{direction.text}</p>
                <Link href="/services">Подробнее</Link>
              </div>
            </article>
          ))}
        </div>

        <div className="analysis-more" data-aos="fade-up" data-aos-delay="160">
          <Link className="button button-primary" href="/services">
            Все услуги
          </Link>
        </div>
      </div>
    </section>
  );
}
