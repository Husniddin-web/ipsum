import { AdminBreadcrumb } from '../../_components/admin-breadcrumb';
import { SectionForm } from '../_components/section-form';

export default function NewSectionPage() {
  return (
    <>
      <AdminBreadcrumb
        items={[{ label: 'Разделы', href: '/admin/sections' }, { label: 'Добавить' }]}
      />
      <div className="admin-page-head">
        <div>
          <span>Подразделы каталога</span>
          <h1>Новый раздел</h1>
          <p>Создайте подраздел внутри выбранной категории.</p>
        </div>
      </div>
      <SectionForm />
    </>
  );
}
