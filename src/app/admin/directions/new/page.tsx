import { AdminBreadcrumb } from '../../_components/admin-breadcrumb';
import { DirectionForm } from '../_components/direction-form';

export default function NewDirectionPage() {
  return (
    <>
      <AdminBreadcrumb
        items={[{ label: 'Направления', href: '/admin/directions' }, { label: 'Добавить' }]}
      />
      <div className="admin-page-head">
        <div>
          <span>Структура каталога</span>
          <h1>Новое направление</h1>
          <p>Создайте лабораторное направление для публичного каталога.</p>
        </div>
      </div>
      <DirectionForm />
    </>
  );
}
