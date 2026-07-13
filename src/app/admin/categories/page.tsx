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
import { useAdminCategories, useAdminDirections, useDeleteCategory } from '@/lib/api/admin-hooks';
import { useAdminUrlPagination } from '@/lib/admin/url-pagination';

export default function CategoriesPage() {
  const pagination = useAdminUrlPagination();
  const directionId = pagination.get('directionId');
  const params = { ...pagination.params, directionId: directionId || undefined };
  const directionsQuery = useAdminDirections({ limit: 100 });
  const categoriesQuery = useAdminCategories(params);
  const deleteMutation = useDeleteCategory();
  const items = categoriesQuery.data?.items ?? [];
  const directionName = (id: string) =>
    directionsQuery.data?.items.find((direction) => direction._id === id)?.name ?? '—';

  return (
    <>
      <div className="admin-page-head">
        <div>
          <span>Группы услуг</span>
          <h1>Категории</h1>
          <p>Категории внутри направлений для удобной навигации пациента.</p>
        </div>
        <Button asChild>
          <Link href="/admin/categories/new">
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
            onChange={(event) => pagination.setParam('directionId', event.target.value)}
          >
            <option value="">Все направления</option>
            {(directionsQuery.data?.items ?? []).map((direction) => (
              <option value={direction._id} key={direction._id}>
                {direction.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Направление</TableHead>
            <TableHead>Название</TableHead>
            <TableHead>Описание</TableHead>
            <TableHead>Услуги</TableHead>
            <TableHead>Порядок</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead className="text-right">Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categoriesQuery.isLoading && (
            <TableRow>
              <TableCell colSpan={7}>Загружаем категории...</TableCell>
            </TableRow>
          )}
          {items.map((item) => (
            <TableRow key={item._id}>
              <TableCell className="max-w-[260px] truncate">
                {directionName(item.directionId)}
              </TableCell>
              <TableCell>
                <b>{item.name}</b>
              </TableCell>
              <TableCell className="max-w-[460px] truncate text-[#758096]">
                {item.description || '—'}
              </TableCell>
              <TableCell>{item.serviceCount ?? 0}</TableCell>
              <TableCell>{item.order}</TableCell>
              <TableCell>
                <span className={`admin-status ${item.isActive ? 'active' : ''}`}>
                  {item.isActive ? 'Активно' : 'Скрыто'}
                </span>
              </TableCell>
              <TableCell>
                <div className="admin-row-actions">
                  <Button asChild variant="outline" size="icon">
                    <Link href={`/admin/categories/${item._id}/edit`}>
                      <Edit3 />
                    </Link>
                  </Button>
                  <DeleteAction
                    title="Удалить категорию?"
                    description={`Категория "${item.name}" будет удалена. Это действие нельзя отменить.`}
                    disabled={deleteMutation.isPending}
                    onConfirm={() => deleteMutation.mutate(item._id)}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {categoriesQuery.data && (
        <AdminPagination
          page={pagination.page}
          limit={pagination.limit}
          total={categoriesQuery.data.total}
          pages={categoriesQuery.data.pages}
          onPageChange={pagination.setPage}
          onLimitChange={pagination.setLimit}
        />
      )}
    </>
  );
}
