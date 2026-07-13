'use client';

import { Edit3, Plus } from 'lucide-react';
import Link from 'next/link';
import { AdminPagination } from '../_components/admin-pagination';
import { DeleteAction } from '../_components/delete-action';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  useAdminCategories,
  useAdminDirections,
  useAdminSections,
  useDeleteSection,
} from '@/lib/api/admin-hooks';
import { useAdminUrlPagination } from '@/lib/admin/url-pagination';

export default function SectionsPage() {
  const pagination = useAdminUrlPagination();
  const directionId = pagination.get('directionId');
  const categoryId = pagination.get('categoryId');
  const sectionParams = {
    ...pagination.params,
    directionId: directionId || undefined,
    categoryId: categoryId || undefined,
  };
  const directionsQuery = useAdminDirections({ limit: 100 });
  const categoriesQuery = useAdminCategories({ directionId: directionId || undefined, limit: 100 });
  const sectionsQuery = useAdminSections(sectionParams);
  const deleteMutation = useDeleteSection();
  const items = sectionsQuery.data?.items ?? [];
  const categoryName = (id: string) =>
    categoriesQuery.data?.items.find((category) => category._id === id)?.name ?? '—';

  return (
    <>
      <div className="admin-page-head">
        <div>
          <span>Подразделы каталога</span>
          <h1>Разделы</h1>
          <p>Разделы помогают аккуратно сгруппировать услуги внутри категории.</p>
        </div>
        <Button asChild>
          <Link href="/admin/sections/new">
            <Plus />
            Добавить
          </Link>
        </Button>
      </div>

      <div className="admin-filterbar">
        <label>
          Направление
          <select
            value={directionId}
            onChange={(event) =>
              pagination.setParams({ directionId: event.target.value, categoryId: undefined }, true)
            }
          >
            <option value="">Все направления</option>
            {(directionsQuery.data?.items ?? []).map((direction) => (
              <option value={direction._id} key={direction._id}>
                {direction.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Категория
          <select
            value={categoryId}
            onChange={(event) => pagination.setParam('categoryId', event.target.value)}
          >
            <option value="">Все категории</option>
            {(categoriesQuery.data?.items ?? []).map((category) => (
              <option value={category._id} key={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Категория</TableHead>
            <TableHead>Название</TableHead>
            <TableHead>Описание</TableHead>
            <TableHead>Порядок</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead className="text-right">Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sectionsQuery.isLoading && (
            <TableRow>
              <TableCell colSpan={6}>Загружаем разделы...</TableCell>
            </TableRow>
          )}
          {items.map((item) => (
            <TableRow key={item._id}>
              <TableCell className="max-w-[260px] truncate">
                {categoryName(item.categoryId)}
              </TableCell>
              <TableCell>
                <b>{item.name}</b>
              </TableCell>
              <TableCell className="max-w-[460px] truncate text-[#758096]">
                {item.description || '—'}
              </TableCell>
              <TableCell>{item.order}</TableCell>
              <TableCell>
                <span className={`admin-status ${item.isActive ? 'active' : ''}`}>
                  {item.isActive ? 'Активно' : 'Скрыто'}
                </span>
              </TableCell>
              <TableCell>
                <div className="admin-row-actions">
                  <Button asChild variant="outline" size="icon">
                    <Link href={`/admin/sections/${item._id}/edit`}>
                      <Edit3 />
                    </Link>
                  </Button>
                  <DeleteAction
                    title="Удалить раздел?"
                    description={`Раздел "${item.name}" будет удалён. Это действие нельзя отменить.`}
                    disabled={deleteMutation.isPending}
                    onConfirm={() => deleteMutation.mutate(item._id)}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {sectionsQuery.data && (
        <AdminPagination
          page={pagination.page}
          limit={pagination.limit}
          total={sectionsQuery.data.total}
          pages={sectionsQuery.data.pages}
          onPageChange={pagination.setPage}
          onLimitChange={pagination.setLimit}
        />
      )}
    </>
  );
}
