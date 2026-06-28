/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LanguageCode } from "../types";

export interface UITranslations {
  heroTagline: string;
  heroSlogan: string;
  openingHours: string;
  everyDay: string;
  weekdays: string;
  weekends: string;
  searchPlaceholder: string;
  allCategories: string;
  noResultsTitle: string;
  noResultsDesc: string;
  clearFilters: string;
  reserveTableBtn: string;
  callWaiterBtn: string;
  scrolledToTop: string;
  viewDetails: string;
  closeBtn: string;
  allergensLabel: string;
  ingredientsLabel: string;
  prepTimeLabel: string;
  weightLabel: string;
  priceLabel: string;
  currencySymbol: string;
  backToMenu: string;
  
  // Diet badges
  dietVegetarian: string;
  dietVegan: string;
  dietGlutenFree: string;
  dietLactoseFree: string;
  dietSpicy: string;
  dietContainsAlcohol: string;
  
  // Reservation Bottom Sheet
  reserveTitle: string;
  reserveSubtitle: string;
  reserveName: string;
  reservePhone: string;
  reserveDate: string;
  reserveTime: string;
  reserveGuests: string;
  reserveComment: string;
  reserveSubmit: string;
  reserveSuccessTitle: string;
  reserveSuccessDesc: string;
  reserveValidationErr: string;
  
  // Call Waiter Sheet
  callTitle: string;
  callSubtitle: string;
  callTableNumber: string;
  callSubmit: string;
  callSuccessTitle: string;
  callSuccessDesc: string;
  
  // Filters
  filterAll: string;
  filterVegetarian: string;
  filterVegan: string;
  filterGlutenFree: string;
  filterAlcoholFree: string;
  filterPopular: string;
  filterNew: string;
  
  // Toast notifications
  notificationCallWaiter: string;
  notificationReserveSuccess: string;
}

export const uiTranslations: Record<LanguageCode, UITranslations> = {
  bg: {
    heroTagline: "Кафе • Брънч • Коктейли",
    heroSlogan: "Вкусът на перфектния ден край морето.",
    openingHours: "Работно време",
    everyDay: "Отворено всеки ден",
    weekdays: "Делнични дни",
    weekends: "Събота и Неделя",
    searchPlaceholder: "Потърси в менюто...",
    allCategories: "Всички категории",
    noResultsTitle: "Няма намерени резултати",
    noResultsDesc: "Опитайте да промените ключовата дума или да нулирате филтрите.",
    clearFilters: "Нулиране на филтрите",
    reserveTableBtn: "Резервирай маса",
    callWaiterBtn: "Повикай сервитьор",
    scrolledToTop: "Нагоре",
    viewDetails: "Виж детайли",
    closeBtn: "Затвори",
    allergensLabel: "Алергени",
    ingredientsLabel: "Съставки",
    prepTimeLabel: "Време за приготвяне",
    weightLabel: "Грамаж/Количество",
    priceLabel: "Цена",
    currencySymbol: "лв",
    backToMenu: "Обратно към менюто",
    
    dietVegetarian: "Вегетарианско",
    dietVegan: "Веган",
    dietGlutenFree: "Без глутен",
    dietLactoseFree: "Без лактоза",
    dietSpicy: "Пикантно",
    dietContainsAlcohol: "Съдържа алкохол",
    
    reserveTitle: "Резервация на маса",
    reserveSubtitle: "Заявете Вашата маса в Barbara бързо и лесно",
    reserveName: "Вашето име",
    reservePhone: "Телефонен номер",
    reserveDate: "Дата",
    reserveTime: "Час",
    reserveGuests: "Брой гости",
    reserveComment: "Коментар или специални изисквания",
    reserveSubmit: "Изпрати заявка",
    reserveSuccessTitle: "Резервацията е изпратена!",
    reserveSuccessDesc: "Благодарим Ви. Ще се свържем с Вас за потвърждение на посочения телефонен номер в най-кратки срокове.",
    reserveValidationErr: "Моля, попълнете всички задължителни полета коректно.",
    
    callTitle: "Повикване на сервитьор",
    callSubtitle: "Сервитьорът ще дойде на Вашата маса веднага",
    callTableNumber: "Номер на Вашата маса",
    callSubmit: "Изпрати повикване",
    callSuccessTitle: "Повикването е изпратено!",
    callSuccessDesc: "Благодарим Ви. Сервитьорът е уведомен и ще бъде при Вас след секунда.",
    
    filterAll: "Всичко",
    filterVegetarian: "Вегетарианско",
    filterVegan: "Веган",
    filterGlutenFree: "Без Глутен",
    filterAlcoholFree: "Безалкохолно",
    filterPopular: "Популярно",
    filterNew: "Ново",
    
    notificationCallWaiter: "Сервитьорът е повикан за маса",
    notificationReserveSuccess: "Вашата резервация беше записана!",
  },
  en: {
    heroTagline: "Coffee • Brunch • Cocktails",
    heroSlogan: "The taste of a perfect day by the sea.",
    openingHours: "Opening Hours",
    everyDay: "Open every day",
    weekdays: "Weekdays",
    weekends: "Saturdays & Sundays",
    searchPlaceholder: "Search menu...",
    allCategories: "All Categories",
    noResultsTitle: "No results found",
    noResultsDesc: "Try changing your keyword or clearing the applied filters.",
    clearFilters: "Reset filters",
    reserveTableBtn: "Reserve Table",
    callWaiterBtn: "Call Waiter",
    scrolledToTop: "Top",
    viewDetails: "View Details",
    closeBtn: "Close",
    allergensLabel: "Allergens",
    ingredientsLabel: "Ingredients",
    prepTimeLabel: "Preparation Time",
    weightLabel: "Weight / Volume",
    priceLabel: "Price",
    currencySymbol: "BGN",
    backToMenu: "Back to menu",
    
    dietVegetarian: "Vegetarian",
    dietVegan: "Vegan",
    dietGlutenFree: "Gluten-Free",
    dietLactoseFree: "Lactose-Free",
    dietSpicy: "Spicy",
    dietContainsAlcohol: "Contains Alcohol",
    
    reserveTitle: "Table Reservation",
    reserveSubtitle: "Request your table at Barbara quickly and easily",
    reserveName: "Your Name",
    reservePhone: "Phone Number",
    reserveDate: "Date",
    reserveTime: "Time",
    reserveGuests: "Number of Guests",
    reserveComment: "Special notes or preferences",
    reserveSubmit: "Submit Reservation Request",
    reserveSuccessTitle: "Reservation Request Sent!",
    reserveSuccessDesc: "Thank you. We will contact you at your phone number to confirm your reservation shortly.",
    reserveValidationErr: "Please fill out all required fields correctly.",
    
    callTitle: "Call Waiter",
    callSubtitle: "A waiter will attend to your table shortly",
    callTableNumber: "Your Table Number",
    callSubmit: "Request Waiter",
    callSuccessTitle: "Request Received!",
    callSuccessDesc: "Thank you. Your waiter has been notified and will be with you in a moment.",
    
    filterAll: "All",
    filterVegetarian: "Vegetarian",
    filterVegan: "Vegan",
    filterGlutenFree: "Gluten-Free",
    filterAlcoholFree: "Non-Alcoholic",
    filterPopular: "Popular",
    filterNew: "New",
    
    notificationCallWaiter: "Waiter requested for table",
    notificationReserveSuccess: "Your reservation has been saved!",
  },
  ua: {
    heroTagline: "Кава • Бранч • Коктейлі",
    heroSlogan: "Смак ідеального дня біля моря.",
    openingHours: "Робочі години",
    everyDay: "Відчинено щодня",
    weekdays: "Будні дні",
    weekends: "Субота та Неділя",
    searchPlaceholder: "Шукати в меню...",
    allCategories: "Всі категорії",
    noResultsTitle: "Нічого не знайдено",
    noResultsDesc: "Спробуйте змінити ключове слово або скинути фільтри.",
    clearFilters: "Скинути фільтри",
    reserveTableBtn: "Резерв столу",
    callWaiterBtn: "Покликати офіціанта",
    scrolledToTop: "Вгору",
    viewDetails: "Детальніше",
    closeBtn: "Закрити",
    allergensLabel: "Алергени",
    ingredientsLabel: "Інгредієнти",
    prepTimeLabel: "Час приготування",
    weightLabel: "Вага / Об'єм",
    priceLabel: "Ціна",
    currencySymbol: "BGN",
    backToMenu: "Назад до меню",
    
    dietVegetarian: "Вегетаріанське",
    dietVegan: "Веганське",
    dietGlutenFree: "Без глютену",
    dietLactoseFree: "Без лактози",
    dietSpicy: "Гостре",
    dietContainsAlcohol: "Містить алкоголь",
    
    reserveTitle: "Бронювання столу",
    reserveSubtitle: "Замовте Ваш столик у Barbara швидко та просто",
    reserveName: "Ваше ім'я",
    reservePhone: "Номер телефону",
    reserveDate: "Дата",
    reserveTime: "Час",
    reserveGuests: "Кількість гостей",
    reserveComment: "Коментарі або особливі побажання",
    reserveSubmit: "Надіслати запит",
    reserveSuccessTitle: "Запит на бронювання надіслано!",
    reserveSuccessDesc: "Дякуємо Вам. Ми зв'яжемося з Вами найближчим часом для підтвердження бронювання.",
    reserveValidationErr: "Будь ласка, заповніть всі обов'язкові поля правильно.",
    
    callTitle: "Покликати офіціанта",
    callSubtitle: "Офіціант підійде до Вашого столика найближчим часом",
    callTableNumber: "Номер Вашого столика",
    callSubmit: "Викликати офіціанта",
    callSuccessTitle: "Виклик надіслано!",
    callSuccessDesc: "Дякуємо. Офіціанта сповіщено, він підійде до Вас за хвилину.",
    
    filterAll: "Все",
    filterVegetarian: "Вегетаріанське",
    filterVegan: "Веганське",
    filterGlutenFree: "Без глютену",
    filterAlcoholFree: "Безалкогольне",
    filterPopular: "Популярне",
    filterNew: "Нове",
    
    notificationCallWaiter: "Викликано офіціанта до столика",
    notificationReserveSuccess: "Ваше бронювання збережено!",
  },
  ru: {
    heroTagline: "Кофе • Бранч • Коктейли",
    heroSlogan: "Вкус идеального дня у моря.",
    openingHours: "Часы работы",
    everyDay: "Открыто каждый день",
    weekdays: "Будние дни",
    weekends: "Суббота и Воскресенье",
    searchPlaceholder: "Искать в меню...",
    allCategories: "Все категории",
    noResultsTitle: "Ничего не найдено",
    noResultsDesc: "Попробуйте изменить ключевое слово или сбросить фильтры.",
    clearFilters: "Сбросить фильтры",
    reserveTableBtn: "Заказать столик",
    callWaiterBtn: "Позвать официанта",
    scrolledToTop: "Наверх",
    viewDetails: "Подробнее",
    closeBtn: "Закрыть",
    allergensLabel: "Аллергены",
    ingredientsLabel: "Ингредиенты",
    prepTimeLabel: "Время приготовления",
    weightLabel: "Вес / Объем",
    priceLabel: "Цена",
    currencySymbol: "лв",
    backToMenu: "Назад в меню",
    
    dietVegetarian: "Вегетарианское",
    dietVegan: "Веганское",
    dietGlutenFree: "Без глютена",
    dietLactoseFree: "Без лактозы",
    dietSpicy: "Острое",
    dietContainsAlcohol: "Содержит алкоголь",
    
    reserveTitle: "Бронирование стола",
    reserveSubtitle: "Закажите Ваш столик в Barbara быстро и легко",
    reserveName: "Ваше имя",
    reservePhone: "Номер телефона",
    reserveDate: "Дата",
    reserveTime: "Время",
    reserveGuests: "Количество гостей",
    reserveComment: "Комментарии или особые пожелания",
    reserveSubmit: "Отправить запрос",
    reserveSuccessTitle: "Запрос отправлен!",
    reserveSuccessDesc: "Спасибо. Мы свяжемся с Вами в ближайшее время для подтверждения бронирования.",
    reserveValidationErr: "Пожалуйста, заполните все обязательные поля корректно.",
    
    callTitle: "Позвать официанта",
    callSubtitle: "Официант подойдет к Вашему столику в ближайшее время",
    callTableNumber: "Номер Вашего столика",
    callSubmit: "Вызвать официанта",
    callSuccessTitle: "Вызов отправлен!",
    callSuccessDesc: "Спасибо. Официант уведомлен и подойдет к Вам через минуту.",
    
    filterAll: "Все",
    filterVegetarian: "Вегетарианское",
    filterVegan: "Веганское",
    filterGlutenFree: "Без глютена",
    filterAlcoholFree: "Безалкогольное",
    filterPopular: "Популярное",
    filterNew: "Новое",
    
    notificationCallWaiter: "Вызван официант к столику",
    notificationReserveSuccess: "Ваше бронирование сохранено!",
  }
};
