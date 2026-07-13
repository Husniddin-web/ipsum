'use client';
import {
  CalendarDays,
  FileSpreadsheet,
  FlaskConical,
  FolderTree,
  Layers3,
  Route,
} from 'lucide-react';
import Link from 'next/link';
const cards = [
  ['Направления', 'Основные лабораторные направления', '/admin/directions', Route],
  ['Категории', 'Группы услуг внутри направлений', '/admin/categories', FolderTree],
  ['Разделы', 'Подразделы категорий каталога', '/admin/sections', Layers3],
  ['Услуги', 'Карточки исследований и фильтры', '/admin/services', FlaskConical],
  ['Импорт Excel', 'Массовое обновление каталога', '/admin/imports', FileSpreadsheet],
  ['Заявки', 'Обработка обращений пациентов', '/admin/appointments', CalendarDays],
] as const;
export default function AdminPage() {
  return (
    <>
      <div className="admin-page-head">
        <div>
          <span>Рабочая область</span>
          <h1>Обзор системы</h1>
          <p>Каталог, импорт и обращения пациентов в одном месте.</p>
        </div>
      </div>
      <div className="admin-overview">
        {cards.map(([title, text, href, Icon]) => (
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
