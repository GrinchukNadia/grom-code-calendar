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
}

export function onCloseEventForm() {
  clearTime();
  closeModal();
  clearEventForm();
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
}

export function initEventForm() {
  closeEventFormBtn.addEventListener('click', onCloseEventForm);
  eventFormElem.addEventListener('change', eventValidator)
  eventFormElem.addEventListener('submit', onCreateEvent);
}