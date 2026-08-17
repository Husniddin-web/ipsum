'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function LicensesGallery() {
  const t = useTranslations('about');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const licenses = [
    {
      src: '/cert-3.jpg',
      title: t('licenses.l1_title'),
      description: t('licenses.l1_desc'),
    },
    {
      src: '/cert-guvohnoma.jpg',
      title: t('licenses.l2_title'),
      description: t('licenses.l2_desc'),
    },
    {
      src: '/cert-1.jpg',
      title: t('licenses.l3_title'),
      description: t('licenses.l3_desc'),
    },
  ];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIndex !== null) {
      setActiveIndex((activeIndex - 1 + licenses.length) % licenses.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIndex !== null) {
      setActiveIndex((activeIndex + 1) % licenses.length);
    }
  };

  return (
    <section className="section licenses-section">
      <div className="container">
        <div className="section-heading" data-aos="fade-up">
          <p className="eyebrow">{t('licenses.eyebrow')}</p>
          <h2>{t('licenses.title')}</h2>
          <p>{t('licenses.desc')}</p>
        </div>

        <div className="licenses-grid">
          {licenses.map((item, index) => (
            <article
              className="license-card"
              data-aos="fade-up"
              data-aos-delay={index * 100}
              key={item.src}
              onClick={() => setActiveIndex(index)}
            >
              <div className="license-image-wrapper">
                <Image
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                  src={item.src}
                  className="license-thumbnail"
                />
                <div className="license-overlay">
                  <ZoomIn size={28} className="zoom-icon" />
                </div>
              </div>
              <div className="license-info">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeIndex !== null && (
        <div
          className="lightbox-backdrop"
          onClick={() => setActiveIndex(null)}
          role="presentation"
        >
          <button
            className="lightbox-close"
            onClick={() => setActiveIndex(null)}
            aria-label={t('licenses.close')}
          >
            <X size={24} />
          </button>

          <button className="lightbox-nav prev" onClick={handlePrev} aria-label={t('licenses.prev')}>
            <ChevronLeft size={32} />
          </button>

          <div className="lightbox-content" onClick={(e) => e.stopPropagation()} role="presentation">
            <figure className="lightbox-figure">
              <div className="lightbox-image-wrapper">
                <Image
                  alt={licenses[activeIndex].title}
                  fill
                  sizes="90vw"
                  src={licenses[activeIndex].src}
                  className="lightbox-image"
                  priority
                />
              </div>
              <figcaption className="lightbox-caption">
                <h3>{licenses[activeIndex].title}</h3>
                <p>{licenses[activeIndex].description}</p>
              </figcaption>
            </figure>
          </div>

          <button className="lightbox-nav next" onClick={handleNext} aria-label={t('licenses.next')}>
            <ChevronRight size={32} />
          </button>
        </div>
      )}
    </section>
  );
}
