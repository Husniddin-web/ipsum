'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ImageUpload } from '../../_components/image-upload';
import { useCreateDirection, useUpdateDirection } from '@/lib/api/admin-hooks';
import type { Direction } from '@/lib/api/types';
import { formBoolean, formNumber, formString, withRequired } from '@/lib/admin/form';

export function DirectionForm({ item }: { item?: Direction }) {
  const router = useRouter();
  const createMutation = useCreateDirection();
  const updateMutation = useUpdateDirection();
  const isSaving = createMutation.isPending || updateMutation.isPending;

  return (
    <form
      className="admin-inline-form"
      onSubmit={async (event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const payload = withRequired({
          name: formString(form, 'name'),
          shortDescription: formString(form, 'shortDescription'),
          description: formString(form, 'description'),
          image: formString(form, 'image'),
          order: formNumber(form, 'order'),
          isActive: formBoolean(form, 'isActive'),
        });

        if (item) await updateMutation.mutateAsync({ id: item._id, payload });
        else await createMutation.mutateAsync(payload);
        router.push('/admin/directions');
      }}
    >
      <label className="span-5">
        Название
        <input name="name" required defaultValue={item?.name ?? ''} />
      </label>
      <label className="span-3">
        Порядок
        <input name="order" type="number" min="0" defaultValue={item?.order ?? 0} />
      </label>
      <label className="admin-check admin-check-card span-4">
        <Checkbox name="isActive" defaultChecked={item?.isActive ?? true} />
        Показывать на сайте
      </label>
      <label className="span-6">
        Краткое описание
        <input name="shortDescription" defaultValue={item?.shortDescription ?? ''} />
      </label>
      <label className="span-6">
        Описание
        <textarea name="description" rows={3} defaultValue={item?.description ?? ''} />
      </label>
      <ImageUpload
        key={item?._id ?? 'new-direction'}
        label="Изображение направления"
        defaultValue={item?.image ?? ''}
      />
      <div className="admin-form-actions">
        <Button asChild variant="secondary" disabled={isSaving}>
          <Link href="/admin/directions">Отмена</Link>
        </Button>
        <Button type="submit" disabled={isSaving}>
          {isSaving ? 'Сохраняем...' : 'Сохранить'}
        </Button>
      </div>
    </form>
  );
}
