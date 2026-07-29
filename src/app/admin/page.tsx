'use client';
import {
  Activity,
  CalendarDays,
  FileSpreadsheet,
  FlaskConical,
  FolderTree,
  Layers3,
  Route,
  TrendingUp,
} from 'lucide-react';
import Link from 'next/link';
import {
  useAdminAppointments,
  useAdminCategories,
  useAdminDirections,
  useAdminServices,
} from '@/lib/api/admin-hooks';

export default function AdminPage() {
  const directionsQ = useAdminDirections({ limit: 1 });
  const categoriesQ = useAdminCategories({ limit: 1 });
  const servicesQ = useAdminServices({ limit: 1 });
  const appointmentsQ = useAdminAppointments({ limit: 1, status: 'new' });
  const allAppointmentsQ = useAdminAppointments({ limit: 1 });

  const stats = [
    {
      label: 'Направления',
      value: directionsQ.data?.total ?? '—',
      icon: Route,
      href: '/admin/directions',
      color: 'red',
    },
    {
      label: 'Категории',
      value: categoriesQ.data?.total ?? '—',
      icon: FolderTree,
      href: '/admin/categories',
      color: 'blue',
    },
    {
      label: 'Услуги',
      value: servicesQ.data?.total ?? '—',
      icon: FlaskConical,
      href: '/admin/services',
      color: 'green',
    },
    {
      label: 'Новых заявок',
      value: appointmentsQ.data?.total ?? '—',
      icon: Activity,
      href: '/admin/appointments',
      color: 'orange',
      highlight: !!(appointmentsQ.data?.total && appointmentsQ.data.total > 0),
    },
  ];

  const navCards = [
    ['Направления', 'Основные лабораторные направления', '/admin/directions', Route],
    ['Категории', 'Группы услуг внутри направлений', '/admin/categories', FolderTree],
    ['Разделы', 'Подразделы категорий каталога', '/admin/sections', Layers3],
    ['Услуги', 'Карточки исследований и фильтры', '/admin/services', FlaskConical],
    ['Импорт Excel', 'Массовое обновление каталога', '/admin/imports', FileSpreadsheet],
    ['Заявки', `Всего обращений: ${allAppointmentsQ.data?.total ?? '…'}`, '/admin/appointments', CalendarDays],
  ] as const;

  return (
    <>
      <div className="admin-page-head">
        <div>
          <span>Рабочая область</span>
          <h1>Обзор системы</h1>
          <p>Каталог, импорт и обращения пациентов в одном месте.</p>
        </div>
      </div>

      {/* Live stats */}
      <div className="admin-stats-grid">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className={`admin-stat-card${stat.highlight ? ' highlight' : ''}`}
            >
              <span className={`admin-stat-icon color-${stat.color}`}>
                <Icon size={22} />
              </span>
              <div>
                <strong className="admin-stat-value">
                  {stat.value}
                </strong>
                <span className="admin-stat-label">{stat.label}</span>
              </div>
              {stat.highlight && (
                <span className="admin-stat-badge">Новые!</span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Quick navigation */}
      <div className="admin-section-title" style={{ marginTop: 36 }}>
        <h2>
          <TrendingUp size={16} />
          Быстрый доступ
        </h2>
      </div>
      <div className="admin-overview">
        {navCards.map(([title, text, href, Icon]) => (
          <Link href={href} key={href}>
            <Icon />
            <div>
              <h2>{title}</h2>
              <p>{text}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

