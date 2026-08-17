'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { publicApi } from '@/lib/api/services';

export function ContactForm() {
  const t = useTranslations('contact');
  const [status, setStatus] = useState<'idle' | 'sending'>('idle');

  return (
    <form
      className="contact-form"
      onSubmit={async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        const fullName = String(formData.get('name') || '').trim();
        const phone = String(formData.get('phone') || '').trim();
        const email = String(formData.get('email') || '').trim();
        const service = String(formData.get('service') || '').trim();
        const message = String(formData.get('message') || '').trim();

        setStatus('sending');
        try {
          await publicApi.appointment({
            fullName,
            phone,
            message: [
              email ? `Email: ${email}` : '',
              service ? `${t('formService')}: ${service}` : '',
              message ? `${t('formMessage')}: ${message}` : '',
            ]
              .filter(Boolean)
              .join('\n'),
          });
          toast.success(t('formSuccessToast'));
          form.reset();
        } catch {
          toast.error(t('formErrorToast'));
        } finally {
          setStatus('idle');
        }
      }}
    >
      <div className="form-grid">
        <label>
          <span>{t('formName')}</span>
          <input name="name" placeholder={t('formNamePlaceholder')} type="text" required minLength={2} />
        </label>
        <label>
          <span>{t('formPhone')}</span>
          <input name="phone" placeholder="+998 (__) ___-__-__" type="tel" required minLength={7} />
        </label>
      </div>
      <div className="form-grid">
        <label>
          <span>{t('formEmail')}</span>
          <input name="email" placeholder={t('formEmailPlaceholder')} type="email" />
        </label>
        <label>
          <span>{t('formService')}</span>
          <select name="service" defaultValue="">
            <option disabled value="">
              {t('formServiceSelect')}
            </option>
            <option value="clinical">{t('serviceOptions.clinical')}</option>
            <option value="biochemistry">{t('serviceOptions.biochemistry')}</option>
            <option value="genetics">{t('serviceOptions.genetics')}</option>
            <option value="pathology">{t('serviceOptions.pathology')}</option>
            <option value="mobile">{t('serviceOptions.mobile')}</option>
          </select>
        </label>
      </div>
      <label>
        <span>{t('formMessage')}</span>
        <textarea
          name="message"
          placeholder={t('formMessagePlaceholder')}
          rows={5}
        />
      </label>
      <button className="button button-primary" type="submit" disabled={status === 'sending'}>
        <span className="button-icon" aria-hidden="true">
          <Send size={15} strokeWidth={2.6} />
        </span>
        <span>{status === 'sending' ? t('formSending') : t('formSubmit')}</span>
      </button>
    </form>
  );
}
