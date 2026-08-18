'use client';

import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { usePublicCatalog } from '@/lib/api/public-hooks';

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

function getLocalizedDirection(
  name: string,
  shortDesc: string | undefined,
  t: (key: string) => string
): { title: string; text: string } {
  const lower = (name || '').toLowerCase();
  if (lower.includes('патоморфолог') || lower.includes('pathomorph') || lower.includes('patomorfolog')) {
    return {
      title: t('hero.defaultDirections.pathomorphology.title'),
      text: t('hero.defaultDirections.pathomorphology.text'),
    };
  }
  if (lower.includes('клиник') || lower.includes('clinic') || lower.includes('klinik')) {
    return {
      title: t('hero.defaultDirections.clinical.title'),
      text: t('hero.defaultDirections.clinical.text'),
    };
  }
  if (lower.includes('ngs')) {
    return {
      title: t('hero.defaultDirections.ngs.title'),
      text: t('hero.defaultDirections.ngs.text'),
    };
  }
  if (lower.includes('пцр') || lower.includes('pcr') || lower.includes('pzr')) {
    return {
      title: t('hero.defaultDirections.pcr.title'),
      text: t('hero.defaultDirections.pcr.text'),
    };
  }
  if (lower.includes('цитогенет') || lower.includes('cytogenet') || lower.includes('fish') || lower.includes('sitogenet')) {
    return {
      title: t('hero.defaultDirections.cytogenetics.title'),
      text: t('hero.defaultDirections.cytogenetics.text'),
    };
  }
  if (lower.includes('цитометр') || lower.includes('cytometr') || lower.includes('sitometr')) {
    return {
      title: t('hero.defaultDirections.cytometry.title'),
      text: t('hero.defaultDirections.cytometry.text'),
    };
  }
  return {
    title: name,
    text: shortDesc || '',
  };
}

export function HeroSection() {
  const t = useTranslations('home');
  const { data: catalogData } = usePublicCatalog();

  const defaultDirections = [
    {
      title: t('hero.defaultDirections.pathomorphology.title'),
      text: t('hero.defaultDirections.pathomorphology.text'),
      image: '/g-pathology.jpg',
    },
    {
      title: t('hero.defaultDirections.clinical.title'),
      text: t('hero.defaultDirections.clinical.text'),
      image: '/g-clinical.jpg',
    },
    {
      title: t('hero.defaultDirections.ngs.title'),
      text: t('hero.defaultDirections.ngs.text'),
      image: '/g-ngs.jpg',
    },
    {
      title: t('hero.defaultDirections.pcr.title'),
      text: t('hero.defaultDirections.pcr.text'),
      image: '/g-pcr.jpg',
    },
    {
      title: t('hero.defaultDirections.cytogenetics.title'),
      text: t('hero.defaultDirections.cytogenetics.text'),
      image: '/g-cytogenetics.jpg',
    },
    {
      title: t('hero.defaultDirections.cytometry.title'),
      text: t('hero.defaultDirections.cytometry.text'),
      image: '/g-cytometry.jpg',
    },
  ];

  const heroDirections =
    catalogData && catalogData.length > 0
      ? catalogData.map((item, index) => {
          const localized = getLocalizedDirection(item.name, item.shortDescription || item.description, t);
          return {
            id: item._id,
            title: localized.title,
            text: localized.text || item.shortDescription || item.description || '',
            image: formatImageUrl(item.image, defaultDirections[index % defaultDirections.length].image),
            href: `/services?directionId=${item._id}`,
          };
        })
      : defaultDirections.map((dir) => ({
          ...dir,
          href: `/services?search=${encodeURIComponent(dir.title)}`,
        }));

  return (
    <section className="hero-section" id="home">
      <div className="container hero-content">
        <div className="hero-info-card" data-aos="fade-up">
          <div>
            <p className="hero-kicker">{t('hero.kicker')}</p>
            <h1>{t('hero.title')}</h1>
            <p>{t('hero.desc')}</p>
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
                <span>{t('hero.badge')}</span>
                <h2>
                  <Link href={direction.href} style={{ color: 'inherit', textDecoration: 'none' }}>
                    {direction.title}
                  </Link>
                </h2>
                <p>{direction.text}</p>
                <Link href={direction.href}>{t('hero.more')}</Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
