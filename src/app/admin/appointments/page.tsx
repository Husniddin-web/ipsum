'use client';

import { MessageCircle, RefreshCw, Trash2 } from 'lucide-react';
import { AdminPagination } from '../_components/admin-pagination';
import {
  useAdminAppointments,
  useAppointmentStatus,
  useDeleteAppointment,
  useResendTelegram,
} from '@/lib/api/admin-hooks';
import { useAdminUrlPagination } from '@/lib/admin/url-pagination';

const labels = { new: 'Новая', in_progress: 'В работе', done: 'Готово', cancelled: 'Отменена' };

export default function AppointmentsPage() {
  const pagination = useAdminUrlPagination();
  const appointmentsQuery = useAdminAppointments(pagination.params);
  const statusMutation = useAppointmentStatus();
  const resendMutation = useResendTelegram();
  const deleteMutation = useDeleteAppointment();
  const items = appointmentsQuery.data?.items ?? [];

  return (
    <>
      <div className="admin-page-head">
        <div>
          <span>Обращения пациентов</span>
          <h1>Заявки</h1>
          <p>Контакт, выбранные исследования и статус Telegram.</p>
        </div>
      </div>
      <div className="appointment-admin-list">
        {appointmentsQuery.isLoading && <div className="admin-empty">Загружаем заявки...</div>}
        {items.map((item) => (
          <article key={item._id}>
            <header>
              <div>
                <span>{new Date(item.createdAt).toLocaleString('ru-RU')}</span>
                <h2>{item.fullName}</h2>
                <a href={`tel:${item.phone}`}>{item.phone}</a>
              </div>
              <select
                value={item.status}
                disabled={statusMutation.isPending}
                onChange={(event) =>
                  statusMutation.mutate({ id: item._id, status: event.target.value })
                }
              >
                {Object.entries(labels).map(([value, label]) => (
                  <option value={value} key={value}>
                    {label}
                  </option>
                ))}
              </select>
            </header>
            <div className="appointment-services">
              <strong>
                {item.selectedServices.length
                  ? `Выбрано услуг: ${item.selectedServices.length}`
                  : 'Общая консультация'}
              </strong>
              {item.selectedServices.map((service) => (
                <span key={service.serviceId}>
                  {service.code && <b>{service.code}</b>}
                  {service.name}
                </span>
              ))}
            </div>
            {item.message && <p>{item.message}</p>}
            <footer>
              <span className={`telegram-state ${item.telegramStatus}`}>
                <MessageCircle />
                Telegram: {item.telegramStatus}
              </span>
              <div className="admin-row-actions">
                {item.telegramStatus === 'failed' && (
                  <button
                    disabled={resendMutation.isPending}
                    onClick={() => resendMutation.mutate(item._id)}
                  >
                    <RefreshCw />
                  </button>
                )}
                <button
                  className="danger"
                  disabled={deleteMutation.isPending}
                  onClick={() => {
                    if (confirm(`Удалить заявку от ${item.fullName}?`)) {
                      deleteMutation.mutate(item._id);
                    }
                  }}
                >
                  <Trash2 />
                </button>
              </div>
            </footer>
          </article>
        ))}
      </div>
      {appointmentsQuery.data && (
        <AdminPagination
          page={pagination.page}
          limit={pagination.limit}
          total={appointmentsQuery.data.total}
          pages={appointmentsQuery.data.pages}
          onPageChange={pagination.setPage}
          onLimitChange={pagination.setLimit}
        />
      )}
    </>
  );
}
