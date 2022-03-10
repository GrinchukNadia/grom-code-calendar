import { createTask, updateTask } from '../common/storage.js';
import { getDateTime } from '../common/time.utils.js';
import { closeModal } from '../common/modal.js';
import { eventValidator } from './eventValidation.js';
import { renderEvents } from './renderEvents.js';
import { clearTime } from './weekEvent.js';
import { renderWeek } from '../calendar/calendar.js';

const eventFormElem = document.querySelector('.event-form');
const closeEventFormBtn = document.querySelector('.create-event__close-btn');

const titleElem = document.querySelector('[name="title"]');
const dateElem = document.querySelector('[name="date"]');
const startTimeElem = document.querySelector('[name="startTime"]');
const endTimeElem = document.querySelector('[name="endTime"]');
const descriptionElem = document.querySelector('[name="description"]');

function clearEventForm() {
  eventFormElem.reset();

  const allUncheck = document.querySelectorAll('.check');
  allUncheck.forEach((el, i) => {
    if (i + 1 === 7) {
      el.classList.remove('check-hidden');
      el.nextElementSibling.classList.add('chosen');
      const colorChoosedElem = document.querySelector('.color__editor-choosed');
      colorChoosedElem.style.backgroundColor = '#519e9e';
    }
    el.classList.add('check-hidden');
    el.nextElementSibling.classList.remove('chosen');
  });
}

export function onCloseEventForm() {
  clearTime();
  closeModal();
  clearEventForm();
}

export const onCreateEvent = async (event, id) => {
  event.preventDefault();
  const date = dateElem.value;
  const startTime =
    startTimeElem.value || startTimeElem.attributes.placeholder.value;
  const endTime = endTimeElem.value || endTimeElem.attributes.placeholder.value;
  const title = titleElem.value || '(no title)';
  const description = descriptionElem.value;
  const start = getDateTime(date, startTime);
  const end = getDateTime(date, endTime);
  const eventColorElem = document.querySelector('.color__editor-choosed');
  const color = eventColorElem.style.backgroundColor || '#519e9e';

  const newEvent = {
    id: Date.now(),
    title,
    description,
    start,
    end,
    color,
  };

  if (id) {
    try {
      await updateTask(newEvent, id);
    } catch (e) {
      alert('Internal Server Error');
    }
    onCloseEventForm();
    renderWeek();
    renderEvents();
  }
  if (!id) {
    try {
      await createTask(newEvent);
    } catch (e) {
      alert('Internal Server Error');
    }
    onCloseEventForm();
    renderEvents();
  }
};

export function initEventForm() {
  closeEventFormBtn.addEventListener('click', onCloseEventForm);
  eventFormElem.addEventListener('change', eventValidator);
}