'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ImageUpload } from '../../_components/image-upload';
import {
  useAdminCategories,
  useAdminDirections,
  useAdminSections,
  useCreateService,
  useUpdateService,
} from '@/lib/api/admin-hooks';
import type { EntityRef, LabService } from '@/lib/api/types';
import { formBoolean, formString, withRequired } from '@/lib/admin/form';

const refId = (value?: EntityRef | string) => (typeof value === 'object' ? value._id : value || '');

export function ServiceForm({ item }: { item?: LabService }) {
  const router = useRouter();
  const [directionId, setDirectionId] = useState(refId(item?.directionId));
  const [categoryId, setCategoryId] = useState(refId(item?.categoryId));
  const directionsQuery = useAdminDirections({ limit: 100 });
  const categoriesQuery = useAdminCategories({ directionId: directionId || undefined, limit: 100 });
  const sectionsQuery = useAdminSections({ categoryId: categoryId || undefined, limit: 100 });
  const createMutation = useCreateService();
  const updateMutation = useUpdateService();
  const isSaving = createMutation.isPending || updateMutation.isPending;

  return (
    <form
      className="admin-inline-form admin-service-form"
      onSubmit={async (event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const payload = withRequired({
          directionId: formString(form, 'directionId'),
          categoryId: formString(form, 'categoryId'),
          sectionId: formString(form, 'sectionId'),
          code: formString(form, 'code'),
          name: formString(form, 'name'),
          method: formString(form, 'method'),
          biomaterial: formString(form, 'biomaterial'),
          tube: formString(form, 'tube'),
          duration: formString(form, 'duration'),
          image: formString(form, 'image'),
          description: formString(form, 'description'),
          preparation: formString(form, 'preparation'),
          resultFormat: formString(form, 'resultFormat'),
          isPopular: formBoolean(form, 'isPopular'),
          isPackage: formBoolean(form, 'isPackage'),
          isActive: formBoolean(form, 'isActive'),
        });

        if (item) await updateMutation.mutateAsync({ id: item._id, payload });
        else await createMutation.mutateAsync(payload);
        router.push('/admin/services');
      }}
    >
      <label className="span-4">
        Направление
        <select
          name="directionId"
          required
          value={directionId}
          onChange={(event) => {
            setDirectionId(event.target.value);
            setCategoryId('');
          }}
        >
          <option value="">Выберите</option>
          {(directionsQuery.data?.items ?? []).map((direction) => (
            <option value={direction._id} key={direction._id}>
              {direction.name}
            </option>
          ))}
        </select>
      </label>
      <label className="span-4">
        Категория
        <select
          name="categoryId"
          required
          value={categoryId}
          onChange={(event) => setCategoryId(event.target.value)}
        >
          <option value="">Выберите</option>
          {(categoriesQuery.data?.items ?? []).map((category) => (
            <option value={category._id} key={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </label>
      <label className="span-4">
        Раздел
        <select name="sectionId" defaultValue={refId(item?.sectionId)}>
          <option value="">Без раздела</option>
          {(sectionsQuery.data?.items ?? []).map((section) => (
            <option value={section._id} key={section._id}>
              {section.name}
            </option>
          ))}
        </select>
      </label>
      <label className="span-8">
        Название
        <input name="name" required defaultValue={item?.name ?? ''} />
      </label>
      <label className="span-4">
        Код
        <input name="code" defaultValue={item?.code ?? ''} />
      </label>
      <label className="span-3">
        Метод
        <input name="method" defaultValue={item?.method ?? ''} />
      </label>
      <label className="span-3">
        Биоматериал
        <input name="biomaterial" defaultValue={item?.biomaterial ?? ''} />
      </label>
      <label className="span-3">
        Пробирка
        <input name="tube" defaultValue={item?.tube ?? ''} />
      </label>
      <label className="span-3">
        Срок
        <input name="duration" defaultValue={item?.duration ?? ''} />
      </label>
      <label className="span-6">
        Описание
        <textarea name="description" rows={3} defaultValue={item?.description ?? ''} />
      </label>
      <label className="span-6">
        Подготовка
        <textarea name="preparation" rows={3} defaultValue={item?.preparation ?? ''} />
      </label>
      <label className="span-4">
        Формат результата
        <input name="resultFormat" defaultValue={item?.resultFormat ?? ''} />
      </label>
      <div className="admin-check-grid span-8">
        <label className="admin-check admin-check-card">
          <Checkbox name="isPopular" defaultChecked={item?.isPopular ?? false} />
          Популярная
        </label>
        <label className="admin-check admin-check-card">
          <Checkbox name="isPackage" defaultChecked={item?.isPackage ?? false} />
          Пакет
        </label>
        <label className="admin-check admin-check-card">
          <Checkbox name="isActive" defaultChecked={item?.isActive ?? true} />
          Активна
        </label>
      </div>
      <ImageUpload
        key={item?._id ?? 'new-service'}
        label="Изображение услуги"
        defaultValue={item?.image ?? ''}
      />
      <div className="admin-form-actions">
        <Button asChild variant="secondary" disabled={isSaving}>
          <Link href="/admin/services">Отмена</Link>
        </Button>
        <Button type="submit" disabled={isSaving}>
          {isSaving ? 'Сохраняем...' : 'Сохранить'}
        </Button>
      </div>
    </form>
  );
}
