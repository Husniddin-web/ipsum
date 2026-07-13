'use client';

import { FileSpreadsheet, Upload } from 'lucide-react';
import { AdminPagination } from '../_components/admin-pagination';
import { useAdminDirections, useAdminImports, useImportServices } from '@/lib/api/admin-hooks';
import { useAdminUrlPagination } from '@/lib/admin/url-pagination';

export default function ImportsPage() {
  const pagination = useAdminUrlPagination();
  const directionsQuery = useAdminDirections();
  const importsQuery = useAdminImports(pagination.params);
  const importMutation = useImportServices();
  const history = importsQuery.data?.items ?? [];

  return (
    <>
      <div className="admin-page-head">
        <div>
          <span>Массовое обновление</span>
          <h1>Импорт Excel</h1>
          <p>Категории, разделы и услуги создаются из листов. Столбцы цен игнорируются.</p>
        </div>
      </div>
      <form
        className="admin-import-card"
        onSubmit={async (event) => {
          event.preventDefault();
          const form = new FormData(event.currentTarget);
          const file = form.get('file');
          if (!(file instanceof File) || !file.size) return;
          await importMutation.mutateAsync({
            file,
            directionId: String(form.get('directionId')),
          });
          event.currentTarget.reset();
        }}
      >
        <span>
          <FileSpreadsheet />
        </span>
        <div>
          <h2>Загрузите прайс-лист XLSX</h2>
          <p>До 15 МБ. Повторная загрузка обновит найденные услуги.</p>
        </div>
        <label>
          Направление
          <select name="directionId" required disabled={directionsQuery.isLoading}>
            <option value="">Выберите лабораторию</option>
            {(directionsQuery.data?.items ?? []).map((item) => (
              <option value={item._id} key={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
        <input
          name="file"
          type="file"
          accept=".xlsx,.xls"
          required
          disabled={importMutation.isPending}
        />
        <button disabled={importMutation.isPending}>
          <Upload />
          {importMutation.isPending ? 'Импортируем...' : 'Начать импорт'}
        </button>
      </form>
      <div className="admin-section-title">
        <h2>История импорта</h2>
      </div>
      <div className="admin-list compact">
        {importsQuery.isLoading && <div className="admin-empty">Загружаем историю...</div>}
        {history.map((item) => (
          <article key={String(item._id)}>
            <span className="admin-list-icon">
              <FileSpreadsheet />
            </span>
            <div>
              <h2>{String(item.fileName)}</h2>
              <p>
                Создано услуг: {String(item.createdServices ?? 0)} · Обновлено:{' '}
                {String(item.updatedServices ?? 0)}
              </p>
            </div>
            <span className={`admin-status ${item.status === 'success' ? 'active' : ''}`}>
              {item.status === 'success' ? 'Готово' : String(item.status)}
            </span>
          </article>
        ))}
      </div>
      {importsQuery.data && (
        <AdminPagination
          page={pagination.page}
          limit={pagination.limit}
          total={importsQuery.data.total}
          pages={importsQuery.data.pages}
          onPageChange={pagination.setPage}
          onLimitChange={pagination.setLimit}
        />
      )}
    </>
  );
}
