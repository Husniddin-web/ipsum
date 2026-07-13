'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useAdminDirections, useCreateCategory, useUpdateCategory } from '@/lib/api/admin-hooks';
import type { Category } from '@/lib/api/types';
import { formBoolean, formNumber, formString, withRequired } from '@/lib/admin/form';

export function CategoryForm({ item }: { item?: Category }) {
  const router = useRouter();
  const directionsQuery = useAdminDirections({ limit: 100 });
  const createMutation = useCreateCategory();
  const updateMutation = useUpdateCategory();
  const isSaving = createMutation.isPending || updateMutation.isPending;

  return (
    <form
      className="admin-inline-form"
      onSubmit={async (event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const payload = withRequired({
          directionId: formString(form, 'directionId'),
          name: formString(form, 'name'),
          description: formString(form, 'description'),
          order: formNumber(form, 'order'),
          isActive: formBoolean(form, 'isActive'),
        });

        if (item) await updateMutation.mutateAsync({ id: item._id, payload });
        else await createMutation.mutateAsync(payload);
        router.push('/admin/categories');
      }}
    >
      <label className="span-4">
        Направление
        <select name="directionId" required defaultValue={String(item?.directionId ?? '')}>
          <option value="">Выберите направление</option>
          {(directionsQuery.data?.items ?? []).map((direction) => (
            <option value={direction._id} key={direction._id}>
              {direction.name}
            </option>
          ))}
        </select>
      </label>
      <label className="span-5">
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
          <Link href="/admin/categories">Отмена</Link>
        </Button>
        <Button type="submit" disabled={isSaving}>
          {isSaving ? 'Сохраняем...' : 'Сохранить'}
        </Button>
      </div>
    </form>
  );
}
