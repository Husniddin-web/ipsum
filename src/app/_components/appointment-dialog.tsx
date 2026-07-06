"use client";

import { useState } from "react";
import { CalendarPlus, Send, X } from "lucide-react";

type AppointmentDialogProps = {
  className?: string;
  label?: string;
  variant?: "primary" | "ghost" | "dark";
};

export function AppointmentDialog({
  className,
  label = "Записаться",
  variant = "primary",
}: AppointmentDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className={`button button-${variant}${className ? ` ${className}` : ""}`}
        type="button"
        onClick={() => setIsOpen(true)}
      >
        <span className="button-icon" aria-hidden="true">
          <CalendarPlus size={15} strokeWidth={2.6} />
        </span>
        <span>{label}</span>
      </button>

      {isOpen ? (
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
            <p>
              Оставьте контакты, и администратор поможет выбрать анализ,
              филиал или выездной забор.
            </p>
            <form className="appointment-form">
              <label>
                <span>ФИО</span>
                <input name="name" placeholder="Ваше имя" type="text" />
              </label>
              <label>
                <span>Телефон</span>
                <input
                  name="phone"
                  placeholder="+998 (__) ___-__-__"
                  type="tel"
                />
              </label>
              <label>
                <span>Интересующая услуга</span>
                <select name="service" defaultValue="">
                  <option disabled value="">
                    Выберите направление
                  </option>
                  <option>Клинические анализы</option>
                  <option>Молекулярная генетика</option>
                  <option>Иммуногистохимия</option>
                  <option>Выездной забор</option>
                </select>
              </label>
              <button className="button button-primary" type="button">
                <span className="button-icon" aria-hidden="true">
                  <Send size={15} strokeWidth={2.6} />
                </span>
                Отправить заявку
              </button>
            </form>
          </section>
        </div>
      ) : null}
    </>
  );
}
