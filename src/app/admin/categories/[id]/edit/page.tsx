'use client';

import { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AdminBreadcrumb } from '../../../_components/admin-breadcrumb';
import { CategoryForm } from '../../_components/category-form';
import { adminApi } from '@/lib/api/services';

export default function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const categoryQuery = useQuery({
    queryKey: ['admin', 'categories', id],
    queryFn: () => adminApi.category(id),
  });

  return (
    <>
      <AdminBreadcrumb
        items={[{ label: 'Категории', href: '/admin/categories' }, { label: 'Редактировать' }]}
      />
      <div className="admin-page-head">
        <div>
          <span>Группы услуг</span>
          <h1>Редактировать категорию</h1>
          <p>Измените направление, название, порядок или описание.</p>
        </div>
      </div>
      {categoryQuery.isLoading ? (
        <div className="admin-empty">Загружаем категорию...</div>
      ) : categoryQuery.data ? (
        <CategoryForm item={categoryQuery.data} />
      ) : (
        <div className="admin-empty">Категория не найдена.</div>
      )}
    </>
  );
}
