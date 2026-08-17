'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';
import { CalendarPlus, MessageCircle, Send, X, type LucideIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { publicApi } from '@/lib/api/services';
import type { LabService } from '@/lib/api/types';
import { useSelectionStore } from '@/lib/store/selection-store';
import { toast } from 'sonner';

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
  label,
  variant = 'primary',
  selectedServices = [],
}: AppointmentDialogProps) {
  const t = useTranslations('appointment');
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle');
  const [phone, setPhone] = useState('+998 ');
  const clearSelection = useSelectionStore((state) => state.clear);
  const Icon: LucideIcon = icon === 'message' ? MessageCircle : CalendarPlus;

  const displayLabel = label || t('defaultTriggerLabel');

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;

    // Force prefix +998
    if (!value.startsWith('+998')) {
      value = '+998';
    }

    // Keep only digits after +998
    const digits = value.substring(4).replace(/[^\d]/g, '');

    // Format: +998 (XX) XXX-XX-XX
    let formatted = '+998';
    if (digits.length > 0) {
      formatted += ' (' + digits.substring(0, 2);
    }
    if (digits.length > 2) {
      formatted += ') ' + digits.substring(2, 5);
    }
    if (digits.length > 5) {
      formatted += '-' + digits.substring(5, 7);
    }
    if (digits.length > 7) {
      formatted += '-' + digits.substring(7, 9);
    }

    setPhone(formatted);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // Prevent deleting prefix +998 (length 4)
    if (
      (event.key === 'Backspace' || event.key === 'Delete') &&
      (event.currentTarget.selectionStart ?? 0) <= 4
    ) {
      event.preventDefault();
    }
  };

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
          aria-label={t('closeAria')}
          className="dialog-close"
          type="button"
          onClick={() => setIsOpen(false)}
        >
          <X size={18} strokeWidth={2.8} />
        </button>
        <p className="eyebrow">{t('eyebrow')}</p>
        <h2 id="appointment-title">{t('title')}</h2>
        <p>{t('desc')}</p>
        <form
          className="appointment-form"
          onSubmit={async (event) => {
            event.preventDefault();
            setStatus('sending');
            const form = new FormData(event.currentTarget);
            try {
              await publicApi.appointment({
                fullName: String(form.get('fullName') || ''),
                phone: phone.trim(),
                message: String(form.get('message') || ''),
                serviceIds: selectedServices.map((service) => service._id),
              });
              toast.success(t('successToast'));
              setStatus('idle');
              clearSelection();
              setPhone('+998 ');
              setIsOpen(false);
              event.currentTarget.reset();
            } catch {
              setStatus('error');
              toast.error(t('errorToast'));
            }
          }}
        >
          {selectedServices.length > 0 && (
            <div className="appointment-selection">
              <strong>{t('selectedServices', { count: selectedServices.length })}</strong>
              <span>
                {selectedServices
                  .slice(0, 3)
                  .map((service) => service.name)
                  .join(', ')}
                {selectedServices.length > 3
                  ? ` ${t('moreServices', { count: selectedServices.length - 3 })}`
                  : ''}
              </span>
            </div>
          )}
          <label>
            <span>{t('nameLabel')}</span>
            <input name="fullName" placeholder={t('namePlaceholder')} type="text" required minLength={2} />
          </label>
          <label>
            <span>{t('phoneLabel')}</span>
            <input
              name="phone"
              value={phone}
              onChange={handlePhoneChange}
              onKeyDown={handleKeyDown}
              placeholder="+998 (__) ___-__-__"
              type="tel"
              required
              minLength={19}
              maxLength={19}
            />
          </label>
          <label>
            <span>{t('commentLabel')}</span>
            <textarea
              name="message"
              placeholder={t('commentPlaceholder')}
              rows={3}
            />
          </label>
          <button className="button button-primary" type="submit" disabled={status === 'sending'}>
            <span className="button-icon" aria-hidden="true">
              <Send size={15} strokeWidth={2.6} />
            </span>
            {status === 'sending' ? t('sendingBtn') : t('submitBtn')}
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
        onClick={() => {
          setPhone('+998 ');
          setIsOpen(true);
        }}
      >
        <span className="button-icon" aria-hidden="true">
          <Icon size={15} strokeWidth={2.6} />
        </span>
        <span>{displayLabel}</span>
      </button>

      {isOpen && typeof document !== 'undefined' ? createPortal(dialog, document.body) : null}
    </>
  );
}
