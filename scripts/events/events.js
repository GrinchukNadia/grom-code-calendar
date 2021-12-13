import { getItem, setItem } from '../common/storage.js';
import shmoment from '../common/shmoment.js';
import { openPopup, closePopup } from '../common/popup.js';
import { renderWeek } from '../calendar/calendar.js';

const weekElem = document.querySelector('.calendar__week');
const deleteEventBtn = document.querySelector('.delete-event-btn');

function handleEventClick(event) {
  // если произошел клик по событию, то нужно паказать попап с кнопкой удаления
  // установите eventIdToDelete с id события в storage
  const eventElement = event.target.closest('.event');
  const idOfEvent = eventElement ? eventElement.dataset.eventId : null;

  if (eventElement) {
    openPopup(event.pageX, event.pageY - window.scrollY);
    setItem('eventIdToDelete', idOfEvent);
  }
}

function removeEventsFromCalendar() {
  // ф-ция для удаления всех событий с календаря
}

const createEventElement = (event) => {
  const hoursStart = new Date(event.start).getHours();
  const minutsStart = new Date(event.start).getMinutes();
  const hoursEnd = new Date(event.end).getHours();
  const minutsEnd = new Date(event.end).getMinutes();

  const dayInMinutes = (hoursEnd*60 + minutsEnd ) - (hoursStart*60 + minutsStart)

  const eventElement = document.createElement('div');
  eventElement.classList.add('event');
  eventElement.setAttribute('data-event-id', event.id);
  eventElement.style = `height: ${dayInMinutes}px; top: ${minutsStart}px`

  eventElement.innerHTML = `
        <div class="event__title">${event.title}</div>
        <div class="event__time">${hoursStart}:${minutsStart} - ${hoursEnd}:${minutsEnd}</div>
    `;
  return eventElement;
  // ф-ция создает DOM элемент события
  // событие должно позиционироваться абсолютно внутри нужной ячейки времени внутри дня
  // нужно добавить id события в дата атрибут
  // здесь для создания DOM элемента события используйте document.createElement
};
// let count = 1;
export const renderEvents = () => {
  const allEvents = getItem('events');
  const monday = getItem('displayedWeekStart');

  const filteredEvents = allEvents.filter((value) => {
    const fullYearOfEvent = new Date(value.start).getFullYear();
    const fullYearOfWeek = new Date(monday).getFullYear();
    const monthOfEvent = new Date(value.start).getMonth();
    const monthOfWeek = new Date(monday).getMonth();
    const dayOfEvent = new Date(value.start).getDate();
    const startOfWeek = new Date(monday).getDate();
    const endOfWeek = startOfWeek + 6;

    return (
      fullYearOfEvent === fullYearOfWeek &&
      monthOfEvent === monthOfWeek &&
      dayOfEvent >= startOfWeek && dayOfEvent <= endOfWeek
    );
  });

  filteredEvents.forEach((el) => {
    const curWeek = document.querySelector('.calendar__week');
    const dayData = curWeek.querySelector(
      `[data-day="${new Date(el.start).getDate()}"]`
    );
    const time = new Date(el.start).getHours();
    let timeData = dayData.querySelector(`[data-time="${time}"]`);
    timeData.append(createEventElement(el));
  });

  // достаем из storage все события и дату понедельника отображаемой недели
  // фильтруем события, оставляем только те, что входят в текущую неделю
  // создаем для них DOM элементы с помощью createEventElement
  // для каждого события находим на странице временную ячейку (.calendar__time-slot)
  // и вставляем туда событие
  // каждый день и временная ячейка должно содержать дата атрибуты, по которым можно будет найти нужную временную ячейку для события
  // не забудьте удалить с календаря старые события перед добавлением новых
};

function onDeleteEvent() {
  const allEvents = getItem('events');
  const idOfEventToDelet = getItem('eventIdToDelete');
  const filteredEventsOnDelete = allEvents.filter(
    ({ id }) => id !== +idOfEventToDelet
  );
  setItem('events', filteredEventsOnDelete);
  renderWeek();
  closePopup();

  // достаем из storage массив событий и eventIdToDelete
  // удаляем из массива нужное событие и записываем в storage новый массив
  // закрыть попап
  // перерисовать события на странице в соответствии с новым списком событий в storage (renderEvents)
}

deleteEventBtn.addEventListener('click', onDeleteEvent);
weekElem.addEventListener('click', handleEventClick);
