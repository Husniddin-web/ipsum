import Link from 'next/link';
import Image from 'next/image';

const heroDirections = [
  {
    title: 'Патоморфологическая лаборатория',
    text: 'Полный цикл морфологической диагностики: гистология, цитология, интраоперационная экспресс-диагностика, иммуногистохимические исследования, молекулярная диагностика, цифровая патология.',
    image: '/g-1.jpeg',
  },
  {
    title: 'Клинико-диагностическая лаборатория',
    text: 'Комплекс современных лабораторных исследований: общеклинические, биохимические, гематологические, коагулологические, иммунологические, бактериологические, гормональные, молекулярно-генетические исследования, онкомаркеры и другие виды лабораторной диагностики.',
    image: '/g-2.jpeg',
  },
];

export function HeroSection() {
  return (
    <section className="hero-section" id="home">
      <div className="container hero-content">
        <div className="hero-info-card" data-aos="fade-up">
          <div>
            <p className="hero-kicker">IPSUM PATHOLOGY</p>
            <h1>Лаборатория, где точность помогает принимать решения</h1>
            <p>
              IPSUM Pathology объединяет патоморфологию, клинико-диагностические исследования и
              современный сервис, чтобы путь от записи до результата был понятным, быстрым и
              надежным.
            </p>
          </div>
        </div>

        <div className="hero-direction-grid">
          {heroDirections.map((direction, index) => (
            <article
              className="hero-direction-card"
              data-aos={index === 0 ? 'fade-right' : 'fade-left'}
              data-aos-delay={100 + index * 80}
              key={direction.title}
            >
              <figure>
                <Image
                  alt={direction.title}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 900px) 100vw, 50vw"
                  src={direction.image}
                />
              </figure>
              <div className="hero-direction-body">
                <span>Лабораторное направление</span>
                <h2>{direction.title}</h2>
                <p>{direction.text}</p>
                <Link href="/services">Подробнее</Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
