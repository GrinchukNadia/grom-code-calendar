import { getItem, setItem } from '../common/storage.js';
import { renderEvents } from './events.js';
import { getDateTime } from '../common/time.utils.js';
import { closeModal } from '../common/modal.js';
import { clearTime } from '../common/timePicker.js';
import { eventValidator } from './eventValidation.js';

const eventFormElem = document.querySelector('.event-form');
const closeEventFormBtn = document.querySelector('.create-event__close-btn');

const titleElem = document.querySelector('[name="title"]');
const dateElem = document.querySelector('[name="date"]');
const startTimeElem = document.querySelector('[name="startTime"]');
const endTimeElem = document.querySelector('[name="endTime"]');
const descriptionElem = document.querySelector('[name="description"]');

function clearEventForm() {
  titleElem.value = '';
  dateElem.value = '';
  startTimeElem.value = '';
  endTimeElem.value = '';
  descriptionElem.value = '';
  // ф-ция должна очистить поля формы от значений
}

export function onCloseEventForm() {
  clearTime();
  closeModal();
  clearEventForm();
  // здесь нужно закрыть модальное окно и очистить форму
}

export function onCreateEvent(event) {
  event.preventDefault();

  const date = dateElem.value;
  const startTime =
    startTimeElem.value || startTimeElem.attributes.placeholder.value;
  const endTime = endTimeElem.value || endTimeElem.attributes.placeholder.value;
  const title = titleElem.value || '(no title)';
  const description = descriptionElem.value;
  const start = getDateTime(date, startTime);
  const end = getDateTime(date, endTime);

  const eventsAll = getItem('events');

  const newEvent = {
    id: Date.now(),
    title,
    description,
    start,
    end,
  };

  eventsAll.push(newEvent);

  setItem('events', eventsAll);
  onCloseEventForm();
  renderEvents();



  // задача этой ф-ции только добавить новое событие в массив событий, что хранится в storage
  // создавать или менять DOM элементы здесь не нужно. Этим займутся другие ф-ции
  // при подтверждении формы нужно считать данные с формы
  // с формы вы получите поля date, startTime, endTime, title, description
  // на основе полей date, startTime, endTime нужно посчитать дату начала и окончания события
  // date, startTime, endTime - строки. Вам нужно с помощью getDateTime из утилит посчитать start и end объекта события
  // полученное событие добавляем в массив событий, что хранится в storage
  // закрываем форму
  // и запускаем перерисовку событий с помощью renderEvents
}

export function initEventForm() {
  closeEventFormBtn.addEventListener('click', onCloseEventForm);
  eventFormElem.addEventListener('change', eventValidator)
  eventFormElem.addEventListener('submit', onCreateEvent);
  // подпишитесь на сабмит формы и на закрытие формы
}