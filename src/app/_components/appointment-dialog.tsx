'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';
import { CalendarPlus, MessageCircle, Send, X, type LucideIcon } from 'lucide-react';
import { publicApi } from '@/lib/api/services';
import type { LabService } from '@/lib/api/types';
import { useSelectionStore } from '@/lib/store/selection-store';

type AppointmentDialogProps = {
  className?: string;
  icon?: 'calendar' | 'message';
  label?: string;
  variant?: 'primary' | 'ghost' | 'dark';
  selectedServices?: LabService[];
};

export function AppointmentDialog({
  className,
  icon = 'calendar',
  label = 'Записаться',
  variant = 'primary',
  selectedServices = [],
}: AppointmentDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const clearSelection = useSelectionStore((state) => state.clear);
  const Icon: LucideIcon = icon === 'message' ? MessageCircle : CalendarPlus;

  const dialog = isOpen ? (
    <div
      className="dialog-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          setIsOpen(false);
        }
      }}
    >
      <section
        aria-labelledby="appointment-title"
        aria-modal="true"
        className="dialog-panel"
        role="dialog"
      >
        <button
          aria-label="Закрыть форму"
          className="dialog-close"
          type="button"
          onClick={() => setIsOpen(false)}
        >
          <X size={18} strokeWidth={2.8} />
        </button>
        <p className="eyebrow">IPSUM PATHOLOGY</p>
        <h2 id="appointment-title">Запишитесь на анализ</h2>
        <p>Оставьте контакты, и администратор поможет выбрать анализ, филиал или выездной забор.</p>
        <form
          className="appointment-form"
          onSubmit={async (event) => {
            event.preventDefault();
            setStatus('sending');
            const form = new FormData(event.currentTarget);
            try {
              await publicApi.appointment({
                fullName: String(form.get('fullName') || ''),
                phone: String(form.get('phone') || ''),
                message: String(form.get('message') || ''),
                serviceIds: selectedServices.map((service) => service._id),
              });
              setStatus('sent');
              clearSelection();
              event.currentTarget.reset();
            } catch {
              setStatus('error');
            }
          }}
        >
          {selectedServices.length > 0 && (
            <div className="appointment-selection">
              <strong>Выбрано услуг: {selectedServices.length}</strong>
              <span>
                {selectedServices
                  .slice(0, 3)
                  .map((service) => service.name)
                  .join(', ')}
                {selectedServices.length > 3 ? ` и ещё ${selectedServices.length - 3}` : ''}
              </span>
            </div>
          )}
          <label>
            <span>ФИО</span>
            <input name="fullName" placeholder="Ваше имя" type="text" required minLength={2} />
          </label>
          <label>
            <span>Телефон</span>
            <input name="phone" placeholder="+998 (__) ___-__-__" type="tel" />
          </label>
          <label>
            <span>Комментарий</span>
            <textarea
              name="message"
              placeholder="Удобное время или вопрос по подготовке"
              rows={3}
            />
          </label>
          {status === 'sent' && (
            <p className="form-success">Заявка отправлена. Администратор свяжется с вами.</p>
          )}
          {status === 'error' && (
            <p className="form-error">Не удалось отправить. Проверьте данные и повторите.</p>
          )}
          <button className="button button-primary" type="submit" disabled={status === 'sending'}>
            <span className="button-icon" aria-hidden="true">
              <Send size={15} strokeWidth={2.6} />
            </span>
            {status === 'sending' ? 'Отправляем...' : 'Отправить заявку'}
          </button>
        </form>
      </section>
    </div>
  ) : null;

  return (
    <>
      <button
        className={`button button-${variant}${className ? ` ${className}` : ''}`}
        type="button"
        onClick={() => setIsOpen(true)}
      >
        <span className="button-icon" aria-hidden="true">
          <Icon size={15} strokeWidth={2.6} />
        </span>
        <span>{label}</span>
      </button>

      {isOpen && typeof document !== 'undefined' ? createPortal(dialog, document.body) : null}
    </>
  );
}
