'use client';

import { Edit3, Plus } from 'lucide-react';
import Image from 'next/image';
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
import { useAdminCategories, useAdminDirections, useDeleteDirection } from '@/lib/api/admin-hooks';
import { useAdminUrlPagination } from '@/lib/admin/url-pagination';

export default function DirectionsPage() {
  const pagination = useAdminUrlPagination();
  const directionsQuery = useAdminDirections(pagination.params);
  const categoriesQuery = useAdminCategories({ limit: 100 });
  const deleteMutation = useDeleteDirection();
  const items = directionsQuery.data?.items ?? [];
  const categoryCount = (directionId: string, apiCount?: number) =>
    apiCount ||
    (categoriesQuery.data?.items ?? []).filter((category) => category.directionId === directionId)
      .length;

  return (
    <>
      <div className="admin-page-head">
        <div>
          <span>Структура каталога</span>
          <h1>Направления</h1>
          <p>Три основные лаборатории и их публичное отображение.</p>
        </div>
        <Button asChild>
          <Link href="/admin/directions/new">
            <Plus />
            Добавить
          </Link>
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Изображение</TableHead>
            <TableHead>Название</TableHead>
            <TableHead>Описание</TableHead>
            <TableHead>Категории</TableHead>
            <TableHead>Порядок</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead className="text-right">Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {directionsQuery.isLoading && (
            <TableRow>
              <TableCell colSpan={7}>Загружаем направления...</TableCell>
            </TableRow>
          )}
          {items.map((item) => (
            <TableRow key={item._id}>
              <TableCell>
                <span className="admin-table-image">
                  {item.image ? (
                    <Image src={item.image} alt="" fill sizes="96px" unoptimized />
                  ) : (
                    '—'
                  )}
                </span>
              </TableCell>
              <TableCell>
                <b>{item.name}</b>
              </TableCell>
              <TableCell className="max-w-[420px] truncate text-[#758096]">
                {item.shortDescription || item.description || '—'}
              </TableCell>
              <TableCell>{categoryCount(item._id, item.categoryCount)}</TableCell>
              <TableCell>{item.order}</TableCell>
              <TableCell>
                <span className={`admin-status ${item.isActive ? 'active' : ''}`}>
                  {item.isActive ? 'Активно' : 'Скрыто'}
                </span>
              </TableCell>
              <TableCell>
                <div className="admin-row-actions">
                  <Button asChild variant="outline" size="icon">
                    <Link href={`/admin/directions/${item._id}/edit`}>
                      <Edit3 />
                    </Link>
                  </Button>
                  <DeleteAction
                    title="Удалить направление?"
                    description={`Направление "${item.name}" будет удалено. Это действие нельзя отменить.`}
                    disabled={deleteMutation.isPending}
                    onConfirm={() => deleteMutation.mutate(item._id)}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {directionsQuery.data && (
        <AdminPagination
          page={pagination.page}
          limit={pagination.limit}
          total={directionsQuery.data.total}
          pages={directionsQuery.data.pages}
          onPageChange={pagination.setPage}
          onLimitChange={pagination.setLimit}
        />
      )}
    </>
  );
}
