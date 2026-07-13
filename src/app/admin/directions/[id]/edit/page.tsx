'use client';

import { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AdminBreadcrumb } from '../../../_components/admin-breadcrumb';
import { DirectionForm } from '../../_components/direction-form';
import { adminApi } from '@/lib/api/services';

export default function EditDirectionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const directionQuery = useQuery({
    queryKey: ['admin', 'directions', id],
    queryFn: () => adminApi.direction(id),
  });

  return (
    <>
      <AdminBreadcrumb
        items={[{ label: 'Направления', href: '/admin/directions' }, { label: 'Редактировать' }]}
      />
      <div className="admin-page-head">
        <div>
          <span>Структура каталога</span>
          <h1>Редактировать направление</h1>
          <p>Измените название, описание, порядок или изображение.</p>
        </div>
      </div>
      {directionQuery.isLoading ? (
        <div className="admin-empty">Загружаем направление...</div>
      ) : directionQuery.data ? (
        <DirectionForm item={directionQuery.data} />
      ) : (
        <div className="admin-empty">Направление не найдено.</div>
      )}
    </>
  );
}
