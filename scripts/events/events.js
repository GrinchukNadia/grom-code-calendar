import { getItem, setItem } from '../common/storage.js';
import { openPopup, closePopup } from '../common/popup.js';
import { renderWeek } from '../calendar/calendar.js';
import { onCloseEventForm } from './createEvent.js';
import { renderHeader } from '../calendar/header.js';
import { editEvent } from './editeEvent.js';
import { eventValidator } from './eventValidation.js';

const weekElem = document.querySelector('.calendar__week');
const deleteEventBtn = document.querySelector('.delete-event-btn');

function handleEventClick(event) {
  if(!event) {
    return
  }
  const eventElement = event.target.closest('.event');
  const idOfEvent = eventElement ? eventElement.dataset.eventId : null;

  if (eventElement) {
    openPopup(event.pageX, event.pageY - window.scrollY);
    editEvent(idOfEvent);
    setItem('eventIdToDelete', idOfEvent);
    onCloseEventForm()
  }
}

function removeEventsFromCalendar() {
  // ф-ция для удаления всех событий с календаря
}

function dobleZero(num) {
  return num === 0 ? '00' : num
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
        <div class="event__time">${hoursStart}:${dobleZero(minutsStart)} - ${hoursEnd}:${dobleZero(minutsEnd)}</div>
  `;
  return eventElement;
};

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
    const dayData = weekElem.querySelector(
      `[data-day="${new Date(el.start).getDate()}"]`
    );
    const time = new Date(el.start).getHours();
    let timeData = dayData.querySelector(`[data-time="${time}"]`);
    timeData.append(createEventElement(el));
  });
};

export function onDeleteEvent() {
  const allEvents = getItem('events');
  const idOfEventToDelet = getItem('eventIdToDelete');
  const filteredEventsOnDelete = allEvents.filter(
    ({ id }) => id !== +idOfEventToDelet
  );
  setItem('events', filteredEventsOnDelete);
  renderWeek();
  renderHeader();
  closePopup();
}

deleteEventBtn.addEventListener('click', onDeleteEvent);
weekElem.addEventListener('click', handleEventClick);

const submitBtnEl = document.querySelector('.event-form__submit-btn');

submitBtnEl.addEventListener('click', () => {
  const deleteId = getItem('eventIdToDelete');
  if(deleteId) {
    onDeleteEvent()
  } else {
    handleEventClick()
  }
});