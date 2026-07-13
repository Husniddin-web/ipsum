'use client';

import { Edit3, Plus, Search } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
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
import { useAdminServices, useDeleteService } from '@/lib/api/admin-hooks';
import { useAdminUrlPagination } from '@/lib/admin/url-pagination';

export default function ServicesAdmin() {
  const pagination = useAdminUrlPagination();
  const [query, setQuery] = useState(pagination.get('search'));
  const servicesQuery = useAdminServices(pagination.params);
  const deleteMutation = useDeleteService();
  const items = servicesQuery.data?.items ?? [];

  return (
    <>
      <div className="admin-page-head">
        <div>
          <span>Лабораторный каталог</span>
          <h1>Услуги</h1>
          <p>Исследования без цен. Данные подготовки, метода и биоматериала.</p>
        </div>
        <Button asChild>
          <Link href="/admin/services/new">
            <Plus />
            Новая услуга
          </Link>
        </Button>
      </div>

      <div className="admin-search">
        <Search />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => event.key === 'Enter' && pagination.setParam('search', query)}
          placeholder="Название или код"
        />
        <Button
          disabled={servicesQuery.isFetching}
          onClick={() => pagination.setParam('search', query)}
        >
          {servicesQuery.isFetching ? 'Ищем...' : 'Найти'}
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Код</TableHead>
            <TableHead>Услуга</TableHead>
            <TableHead>Категория</TableHead>
            <TableHead>Биоматериал</TableHead>
            <TableHead>Метод / срок</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead className="text-right">Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {servicesQuery.isLoading && (
            <TableRow>
              <TableCell colSpan={7}>Загружаем услуги...</TableCell>
            </TableRow>
          )}
          {items.map((item) => (
            <TableRow key={item._id}>
              <TableCell>{item.code || '—'}</TableCell>
              <TableCell className="max-w-[360px]">
                <b className="line-clamp-2">{item.name}</b>
              </TableCell>
              <TableCell className="max-w-[240px] truncate">
                {typeof item.categoryId === 'object' ? item.categoryId.name : '—'}
              </TableCell>
              <TableCell>{item.biomaterial || '—'}</TableCell>
              <TableCell>
                {[item.method, item.duration].filter(Boolean).join(' · ') || '—'}
              </TableCell>
              <TableCell>
                <span className={`admin-status ${item.isActive ? 'active' : ''}`}>
                  {item.isActive ? 'Активно' : 'Скрыто'}
                </span>
              </TableCell>
              <TableCell>
                <div className="admin-row-actions">
                  <Button asChild variant="outline" size="icon">
                    <Link href={`/admin/services/${item._id}/edit`}>
                      <Edit3 />
                    </Link>
                  </Button>
                  <DeleteAction
                    title="Удалить услугу?"
                    description={`Услуга "${item.name}" будет удалена. Это действие нельзя отменить.`}
                    disabled={deleteMutation.isPending}
                    onConfirm={() => deleteMutation.mutate(item._id)}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {servicesQuery.data && (
        <AdminPagination
          page={pagination.page}
          limit={pagination.limit}
          total={servicesQuery.data.total}
          pages={servicesQuery.data.pages}
          onPageChange={pagination.setPage}
          onLimitChange={pagination.setLimit}
        />
      )}
    </>
  );
}
