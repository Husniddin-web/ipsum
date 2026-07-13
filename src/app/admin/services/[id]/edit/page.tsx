'use client';

import { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AdminBreadcrumb } from '../../../_components/admin-breadcrumb';
import { ServiceForm } from '../../_components/service-form';
import { adminApi } from '@/lib/api/services';

export default function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const serviceQuery = useQuery({
    queryKey: ['admin', 'services', id],
    queryFn: () => adminApi.service(id),
  });

  return (
    <>
      <AdminBreadcrumb
        items={[{ label: 'Услуги', href: '/admin/services' }, { label: 'Редактировать' }]}
      />
      <div className="admin-page-head">
        <div>
          <span>Лабораторный каталог</span>
          <h1>Редактировать услугу</h1>
          <p>Измените параметры исследования, подготовку или изображение.</p>
        </div>
      </div>
      {serviceQuery.isLoading ? (
        <div className="admin-empty">Загружаем услугу...</div>
      ) : serviceQuery.data ? (
        <ServiceForm item={serviceQuery.data} />
      ) : (
        <div className="admin-empty">Услуга не найдена.</div>
      )}
    </>
  );
}
