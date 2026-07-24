'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import { toast } from 'sonner';
import { publicApi } from '@/lib/api/services';

export function ContactForm() {
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
              service ? `Услуга: ${service}` : '',
              message ? `Сообщение: ${message}` : '',
            ]
              .filter(Boolean)
              .join('\n'),
          });
          toast.success('Заявка отправлена. Администратор свяжется с вами.');
          form.reset();
        } catch {
          toast.error('Не удалось отправить заявку. Проверьте данные и повторите.');
        } finally {
          setStatus('idle');
        }
      }}
    >
      <div className="form-grid">
        <label>
          <span>ФИО</span>
          <input name="name" placeholder="Ваше имя" type="text" required minLength={2} />
        </label>
        <label>
          <span>Телефон</span>
          <input name="phone" placeholder="+998 (__) ___-__-__" type="tel" required minLength={7} />
        </label>
      </div>
      <div className="form-grid">
        <label>
          <span>Email</span>
          <input name="email" placeholder="name@example.com" type="email" />
        </label>
        <label>
          <span>Услуга</span>
          <select name="service" defaultValue="">
            <option disabled value="">
              Выберите услугу
            </option>
            <option>Клинические анализы</option>
            <option>Биохимия</option>
            <option>Молекулярная генетика</option>
            <option>Выездной забор</option>
          </select>
        </label>
      </div>
      <label>
        <span>Сообщение</span>
        <textarea
          name="message"
          placeholder="Напишите вопрос или удобное время для связи"
          rows={5}
        />
      </label>
      <button className="button button-primary" type="submit" disabled={status === 'sending'}>
        <span className="button-icon" aria-hidden="true">
          <Send size={15} strokeWidth={2.6} />
        </span>
        <span>{status === 'sending' ? 'Отправляем...' : 'Отправить'}</span>
      </button>
    </form>
  );
}
