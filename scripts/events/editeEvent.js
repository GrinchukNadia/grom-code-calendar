import { closePopup } from '../common/popup.js';
import { getItem, setItem } from '../common/storage.js';
import { getDisplayedDay } from '../common/time.utils.js';
import { addZeroBefore, doubleZero } from './date.utils.js';

const headerEl = document.querySelector('.event__header');
const descriptionEl = document.querySelector('.event__description');
const dateEl = document.querySelector('.event__date-time_date');
const timeEl = document.querySelector('.event__date-time_time');

const timeStartEl = document.querySelector('[name="startTime"]');
const timeEndEl = document.querySelector('[name="endTime"]');
const titleEl = document.querySelector('[name="title"]');
const description = document.querySelector('[name="description"]');
const datePickerEl = document.querySelector('#datepicker');
const editEl = document.querySelector('.edit-event-btn');

export function editEvent(eventId) {
  const allEvents = getItem('events');
  const currentEvent = allEvents.reduce((acc, el) => {
    if (el.id === +eventId) {
      acc = { ...acc, ...el };
    }
    return acc;
  }, {});

  setItem('eventIdToDelete', eventId);
  const dayNow = addZeroBefore(new Date(currentEvent.start).getDate());
  const monthNow = addZeroBefore(new Date(currentEvent.start).getMonth() + 1);
  const yearNow = new Date(currentEvent.start).getFullYear();
  const timeHoursStart = new Date(currentEvent.start).getHours();
  const timeHoursEnd = new Date(currentEvent.end).getHours();
  const timeMinutesStart = new Date(currentEvent.start).getMinutes();
  const timeMinutesEnd = new Date(currentEvent.end).getMinutes();
  const timeStart = `${timeHoursStart}:${doubleZero(timeMinutesStart)}`;
  const timeEnd = `${timeHoursEnd}:${doubleZero(timeMinutesEnd)}`;

  headerEl.innerHTML = currentEvent.title;
  descriptionEl.innerHTML = currentEvent.description;
  dateEl.innerHTML = getDisplayedDay(currentEvent.start);
  timeEl.innerHTML = `${timeStart} - ${timeEnd}`;

  editEl.addEventListener('click', () => {
    const modalElem = document.querySelector('.modal');
    modalElem.classList.remove('hidden');
    closePopup();
    timeStartEl.placeholder = ``;
    timeEndEl.placeholder = ``;
    timeEndEl.placeholder = `${timeEnd}`;
    timeStartEl.placeholder = `${timeStart}`;
    datePickerEl.value = `${yearNow}-${monthNow}-${dayNow}`;
    description.value = currentEvent.description;
    titleEl.value = currentEvent.title;
  });
}