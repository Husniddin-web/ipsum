'use client';

import { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AdminBreadcrumb } from '../../../_components/admin-breadcrumb';
import { SectionForm } from '../../_components/section-form';
import { adminApi } from '@/lib/api/services';

export default function EditSectionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const sectionQuery = useQuery({
    queryKey: ['admin', 'sections', id],
    queryFn: () => adminApi.section(id),
  });

  return (
    <>
      <AdminBreadcrumb
        items={[{ label: 'Разделы', href: '/admin/sections' }, { label: 'Редактировать' }]}
      />
      <div className="admin-page-head">
        <div>
          <span>Подразделы каталога</span>
          <h1>Редактировать раздел</h1>
          <p>Измените категорию, название, порядок или описание.</p>
        </div>
      </div>
      {sectionQuery.isLoading ? (
        <div className="admin-empty">Загружаем раздел...</div>
      ) : sectionQuery.data ? (
        <SectionForm item={sectionQuery.data} />
      ) : (
        <div className="admin-empty">Раздел не найден.</div>
      )}
    </>
  );
}
