import { AdminBreadcrumb } from '../../_components/admin-breadcrumb';
import { CategoryForm } from '../_components/category-form';

export default function NewCategoryPage() {
  return (
    <>
      <AdminBreadcrumb
        items={[{ label: 'Категории', href: '/admin/categories' }, { label: 'Добавить' }]}
      />
      <div className="admin-page-head">
        <div>
          <span>Группы услуг</span>
          <h1>Новая категория</h1>
          <p>Создайте группу услуг внутри выбранного направления.</p>
        </div>
      </div>
      <CategoryForm />
    </>
  );
}
