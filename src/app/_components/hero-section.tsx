'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePublicCatalog } from '@/lib/api/public-hooks';

const defaultDirections = [
  {
    title: 'Патоморфологическая лаборатория',
    text: 'Полный цикл морфологической диагностики: гистология, цитология, интраоперационная экспресс-диагностика, иммуногистохимические исследования, молекулярная диагностика, цифровая патология.',
    image: '/g-pathology.jpg',
  },
  {
    title: 'Клинико-диагностическая лаборатория',
    text: 'Комплекс современных лабораторных исследований: общеклинические, биохимические, гематологические, коагулологические, иммунологические, бактериологические, гормональные, молекулярно-генетические исследования, онкомаркеры и другие виды лабораторной диагностики.',
    image: '/g-clinical.jpg',
  },
  {
    title: 'NGS',
    text: 'Полный цикл высокопроизводительного секвенирования: таргетные и полногеномные панели, секвенирование экзома и транскриптома, жидкостная биопсия, биоинформатический анализ и интерпретация вариантов, подготовка клинических заключений.',
    image: '/g-ngs.jpg',
  },
  {
    title: 'RT-PCR',
    text: 'Полный цикл ПЦР-диагностики в реальном времени: количественная и качественная детекция мутаций и транслокаций, оценка экспрессии генов, мониторинг минимальной остаточной болезни, диагностика инфекционных и вирусных агентов, контроль качества образцов.',
    image: '/g-pcr.jpg',
  },
  {
    title: 'Цитогенетика и FISH',
    text: 'Полный цикл цитогенетической диагностики: классическое кариотипирование, FISH-исследования на нативных и парафиновых образцах, выявление хромосомных транслокаций, делеций и амплификаций, диагностика гематологических и солидных опухолей.',
    image: '/g-cytogenetics.jpg',
  },
  {
    title: 'Цитометрия',
    text: 'Полный цикл проточной цитометрии: иммунофенотипирование гематологических образований, оценка минимальной остаточной болезни, анализ клеточного цикла и ДНК-плоидности, диагностика лейкозов и лимфом, многоцветное панельное тестирование.',
    image: '/g-cytometry.jpg',
  },
];

function formatImageUrl(imagePath?: string | null, fallbackPath?: string): string {
  if (!imagePath || typeof imagePath !== 'string' || !imagePath.trim()) {
    return fallbackPath || '/g-pathology.jpg';
  }
  let src = imagePath.trim();
  if (typeof window !== 'undefined' && window.location.protocol === 'https:' && src.startsWith('http://')) {
    src = src.replace('http://', 'https://');
  }
  return src;
}

export function HeroSection() {
  const { data: catalogData } = usePublicCatalog();

  const heroDirections =
    catalogData && catalogData.length > 0
      ? catalogData.map((item, index) => ({
          id: item._id,
          title: item.name,
          text: item.shortDescription || item.description || '',
          image: formatImageUrl(item.image, defaultDirections[index % defaultDirections.length].image),
          href: `/services?directionId=${item._id}`,
        }))
      : defaultDirections.map((dir) => ({
          ...dir,
          href: `/services?search=${encodeURIComponent(dir.title)}`,
        }));

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
              data-aos="fade-up"
              data-aos-delay={80 + (index % 3) * 80}
              key={direction.title}
            >
              <figure>
                <Link href={direction.href} style={{ display: 'block', width: '100%', height: '100%' }}>
                  <Image
                    alt={direction.title}
                    fill
                    priority={index < 3}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    src={direction.image}
                    unoptimized
                  />
                </Link>
              </figure>
              <div className="hero-direction-body">
                <span>Лабораторное направление</span>
                <h2>
                  <Link href={direction.href} style={{ color: 'inherit', textDecoration: 'none' }}>
                    {direction.title}
                  </Link>
                </h2>
                <p>{direction.text}</p>
                <Link href={direction.href}>Подробнее &rarr;</Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
