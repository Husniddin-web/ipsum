import Image from 'next/image';

const galleryItems = [
  {
    src: '/new_gallery_featured.jpg',
    title: 'Современное оборудование',
    label: 'Лаборатория',
    className: 'featured',
  },
  {
    src: '/new_gallery_wide.jpg',
    title: 'Патоморфологическая лаборатория IPSUM',
    label: 'Локация',
    className: 'wide',
  },
  {
    src: '/new_gallery_tall.jpg',
    title: 'Контроль процесса',
    label: 'Диагностика',
    className: 'tall',
  },
  {
    src: '/new_gallery_small1.jpg',
    title: 'Забота о пациентах',
    label: 'Пациенты',
    className: 'small top',
  },
  {
    src: '/new_gallery_small2.jpg',
    title: 'Точные результаты',
    label: 'Анализ',
    className: 'small bottom',
  },
];

export function GallerySection() {
  return (
    <section className="section lab-section" id="lab">
      <div className="container">
        <div className="section-heading align-left" data-aos="fade-up">
          <p className="eyebrow">Лаборатория</p>
          <h2>Технологичная среда для точных лабораторных исследований</h2>
          <p>
            Современная диагностика требует аккуратной работы с биоматериалом, контроля качества и
            понятной коммуникации с пациентом.
          </p>
        </div>
        <div className="gallery-grid">
          {galleryItems.map((item, index) => (
            <figure
              className={`gallery-item ${item.className}`}
              data-aos="zoom-in"
              data-aos-delay={index * 70}
              key={item.src}
            >
              <Image
                alt={item.title}
                fill
                sizes={
                  item.className.includes('featured')
                    ? '(max-width: 900px) 100vw, 50vw'
                    : '(max-width: 900px) 100vw, 35vw'
                }
                src={item.src}
              />
              <figcaption>
                <p>{item.label}</p>
                <h3>{item.title}</h3>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
