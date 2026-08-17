'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

export function GallerySection() {
  const t = useTranslations('home');

  const galleryItems = [
    {
      src: '/new_gallery_featured.jpg',
      title: t('gallery.i1_title'),
      label: t('gallery.i1_label'),
      className: 'featured',
    },
    {
      src: '/new_gallery_wide.jpg',
      title: t('gallery.i2_title'),
      label: t('gallery.i2_label'),
      className: 'wide',
    },
    {
      src: '/new_gallery_tall.jpg',
      title: t('gallery.i3_title'),
      label: t('gallery.i3_label'),
      className: 'tall',
    },
    {
      src: '/new_gallery_small1.jpg',
      title: t('gallery.i4_title'),
      label: t('gallery.i4_label'),
      className: 'small top',
    },
    {
      src: '/new_gallery_small2.jpg',
      title: t('gallery.i5_title'),
      label: t('gallery.i5_label'),
      className: 'small bottom',
    },
  ];

  return (
    <section className="section lab-section" id="lab">
      <div className="container">
        <div className="section-heading align-left" data-aos="fade-up">
          <p className="eyebrow">{t('gallery.eyebrow')}</p>
          <h2>{t('gallery.title')}</h2>
          <p>{t('gallery.desc')}</p>
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
