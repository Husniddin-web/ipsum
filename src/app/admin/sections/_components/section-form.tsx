'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  useAdminCategories,
  useAdminDirections,
  useCreateSection,
  useUpdateSection,
} from '@/lib/api/admin-hooks';
import type { Section } from '@/lib/api/types';
import { formBoolean, formNumber, formString, withRequired } from '@/lib/admin/form';

export function SectionForm({ item }: { item?: Section }) {
  const router = useRouter();
  const [directionId, setDirectionId] = useState(String(item?.directionId ?? ''));
  const directionsQuery = useAdminDirections({ limit: 100 });
  const categoriesQuery = useAdminCategories({ directionId: directionId || undefined, limit: 100 });
  const createMutation = useCreateSection();
  const updateMutation = useUpdateSection();
  const isSaving = createMutation.isPending || updateMutation.isPending;

  return (
    <form
      className="admin-inline-form"
      onSubmit={async (event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const payload = withRequired({
          directionId: formString(form, 'directionId'),
          categoryId: formString(form, 'categoryId'),
          name: formString(form, 'name'),
          description: formString(form, 'description'),
          order: formNumber(form, 'order'),
          isActive: formBoolean(form, 'isActive'),
        });

        if (item) await updateMutation.mutateAsync({ id: item._id, payload });
        else await createMutation.mutateAsync(payload);
        router.push('/admin/sections');
      }}
    >
      <label className="span-4">
        Направление
        <select
          name="directionId"
          required
          value={directionId}
          onChange={(event) => setDirectionId(event.target.value)}
        >
          <option value="">Выберите направление</option>
          {(directionsQuery.data?.items ?? []).map((direction) => (
            <option value={direction._id} key={direction._id}>
              {direction.name}
            </option>
          ))}
        </select>
      </label>
      <label className="span-4">
        Категория
        <select name="categoryId" required defaultValue={String(item?.categoryId ?? '')}>
          <option value="">Выберите категорию</option>
          {(categoriesQuery.data?.items ?? []).map((category) => (
            <option value={category._id} key={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </label>
      <label className="span-4">
        Название
        <input name="name" required defaultValue={item?.name ?? ''} />
      </label>
      <label className="span-3">
        Порядок
        <input name="order" type="number" min="0" defaultValue={item?.order ?? 0} />
      </label>
      <label className="span-8">
        Описание
        <textarea name="description" rows={3} defaultValue={item?.description ?? ''} />
      </label>
      <label className="admin-check admin-check-card span-4">
        <Checkbox name="isActive" defaultChecked={item?.isActive ?? true} />
        Показывать на сайте
      </label>
      <div className="admin-form-actions">
        <Button asChild variant="secondary" disabled={isSaving}>
          <Link href="/admin/sections">Отмена</Link>
        </Button>
        <Button type="submit" disabled={isSaving}>
          {isSaving ? 'Сохраняем...' : 'Сохранить'}
        </Button>
      </div>
    </form>
  );
}
