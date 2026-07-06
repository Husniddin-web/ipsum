export function ContactForm() {
  return (
    <form className="contact-form">
      <div className="form-grid">
        <label>
          <span>ФИО</span>
          <input name="name" placeholder="Ваше имя" type="text" />
        </label>
        <label>
          <span>Телефон</span>
          <input name="phone" placeholder="+998 (__) ___-__-__" type="tel" />
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
      <button className="button button-primary" type="button">
        <span>Отправить</span>
      </button>
    </form>
  );
}
