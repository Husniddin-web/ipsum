export const navigation = [
  { label: 'Главная', href: '/' },
  { label: 'О нас', href: '/about' },
  { label: 'Обучение', href: '/#process' },
  { label: 'Услуги', href: '/services' },
  { label: 'Контакты', href: '/contact' },
];

export const contactInfo = {
  phone: '+998 (71) 203-93-00',
  phoneHref: 'tel:+998712039300',
  email: 'info@ipsumpathology.uz',
  emailHref: 'mailto:info@ipsumpathology.uz',
  address: 'Узбекистан, Ташкент',
  hours: 'Ежедневно: 08:30 - 17:30',
  mapTitle: 'IPSUM Pathology location map',
  mapSrc:
    'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d4998.926784706079!2d69.19713882494895!3d41.30010909015793!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8c121cf1b9fb%3A0x8bf789ecd03e426c!2sIpsum%20Diagnostika!5e1!3m2!1sen!2s!4v1784884795595!5m2!1sen!2s',
};

export const analysisCategories = [
  {
    title: 'Клинические анализы',
    description:
      'Базовая диагностика крови, мочи и общих показателей организма для раннего выявления изменений.',
    count: '26+',
    icon: 'clipboard',
    tone: 'red',
  },
  {
    title: 'Биохимия',
    description: 'Показатели обмена веществ, функции печени, почек, сердца и эндокринной системы.',
    count: '18+',
    icon: 'flask',
    tone: 'blue',
  },
  {
    title: 'Молекулярная генетика',
    description:
      'RT-PCR и ДНК-исследования для инфекций, наследственных рисков и точной диагностики.',
    count: '21+',
    icon: 'dna',
    tone: 'pink',
  },
  {
    title: 'Цитогенетика',
    description:
      'Исследования хромосом, кариотипирование и методы FISH для генетических заключений.',
    count: '36+',
    icon: 'microscope',
    tone: 'gray',
  },
  {
    title: 'Иммуногистохимия',
    description:
      'Уточняющая лабораторная диагностика тканей для онкологии и персонализации лечения.',
    count: '12+',
    icon: 'cells',
    tone: 'blue',
  },
  {
    title: 'Выездной забор',
    description: 'Забор биоматериала на дому или в офисе с соблюдением стерильности и логистики.',
    count: '2+',
    icon: 'home',
    tone: 'red',
  },
];

export const trustPoints = [
  {
    value: '9000+',
    label: 'пациентов выбрали IPSUM',
  },
  {
    value: '36+',
    label: 'направлений анализов',
  },
  {
    value: '24/7',
    label: 'доступ к онлайн-результатам',
  },
];

export const processSteps = [
  {
    number: '01',
    title: 'Оставьте заявку',
    text: 'Выберите анализ или оставьте контакты, оператор уточнит детали и удобное время.',
  },
  {
    number: '02',
    title: 'Сдайте биоматериал',
    text: 'Посетите филиал или оформите выезд специалиста по нужному адресу.',
  },
  {
    number: '03',
    title: 'Получите результат',
    text: 'Готовые результаты доступны онлайн, в Telegram-боте или в филиале.',
  },
];

export const partners = [
  {
    name: 'Hoffmann-La Roche',
    country: 'Швейцария',
    image: '/hoffman.png',
    text: 'Мировой лидер в диагностике и фармацевтике. Совместная работа помогает развивать иммуногистохимические исследования и внедрять международные стандарты качества.',
  },
  {
    name: 'CENTOGENE',
    country: 'Германия',
    image: '/centogene.png',
    text: 'Эксперт в генетической диагностике редких заболеваний. Партнерство усиливает наши возможности в молекулярно-генетическом анализе.',
  },
  {
    name: 'Core Diagnostics',
    country: 'Индия',
    image: '/core.png',
    text: 'Клиническая лаборатория нового поколения. Обмен опытом помогает внедрять современные диагностические решения и лучшие практики.',
  },
];

export const partnerMentions = [
  'Cleveland Clinic',
  'ONECELL AI',
  'Foundation Medicine',
  'НМИЦ ДГОИ им. Дмитрия Рогачева',
  'Кирилл Ляпичев',
  'Professor Abbas Agaimy',
];

export const labHighlights = [
  'Патология и лабораторная диагностика',
  'Современное оборудование',
  'Контроль качества на каждом этапе',
  'Быстрая связь с пациентом',
];

export const aboutStats = [
  { value: '9000+', label: 'довольных пациентов' },
  { value: '36+', label: 'направлений диагностики' },
  { value: '24/7', label: 'доступ к результатам' },
  { value: '3', label: 'понятных шага до результата' },
];

export const aboutValues = [
  {
    title: 'Точность',
    text: 'Работаем с лабораторными процессами, где важны контроль, повторяемость и внимательность к деталям.',
  },
  {
    title: 'Забота',
    text: 'Пациент получает понятный маршрут: запись, сдача биоматериала и результат в удобном формате.',
  },
  {
    title: 'Технологичность',
    text: 'Используем современную лабораторную среду для клинических, молекулярных и патологических исследований.',
  },
];
