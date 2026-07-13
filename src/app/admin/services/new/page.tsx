import { AdminBreadcrumb } from '../../_components/admin-breadcrumb';
import { ServiceForm } from '../_components/service-form';

export default function NewServicePage() {
  return (
    <>
      <AdminBreadcrumb
        items={[{ label: 'Услуги', href: '/admin/services' }, { label: 'Добавить' }]}
      />
      <div className="admin-page-head">
        <div>
          <span>Лабораторный каталог</span>
          <h1>Новая услуга</h1>
          <p>Создайте карточку исследования без цены.</p>
        </div>
      </div>
      <ServiceForm />
    </>
  );
}
