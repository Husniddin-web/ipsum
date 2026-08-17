import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('common');

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '70vh',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '2rem',
      }}
    >
      <h1 style={{ fontSize: '4rem', fontWeight: 800, color: '#0d2240', marginBottom: '1rem' }}>
        {t('notFound.title')}
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#64748b', marginBottom: '2rem' }}>
        {t('notFound.heading')}
      </p>
      <Link href="/" className="button button-primary">
        {t('notFound.homeBtn')}
      </Link>
    </div>
  );
}
