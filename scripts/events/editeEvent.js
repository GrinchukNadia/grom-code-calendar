import { renderWeek } from '../calendar/calendar.js';
import { closePopup } from '../common/popup.js';
import { deleteTask, getTask } from '../common/storage.js';
import { getDisplayedDay } from '../common/time.utils.js';
import { addZeroBefore, doubleZero } from './date.utils.js';
import { openModal } from '../common/modal.js';

const headerEl = document.querySelector('.event__header');
const descriptionEl = document.querySelector('.event__description');
const dateEl = document.querySelector('.event__date-time_date');
const timeEl = document.querySelector('.event__date-time_time');

const timeStartEl = document.querySelector('[name="startTime"]');
const timeEndEl = document.querySelector('[name="endTime"]');
const titleEl = document.querySelector('[name="title"]');
const descriptionText = document.querySelector('[name="description"]');
const datePickerEl = document.querySelector('#datepicker');
const editEl = document.querySelector('.edit-event-btn');
const deleteEl = document.querySelector('.delete-event-btn');

export const editEvent = async (eventId) => {
  const currentEvent = await getTask(eventId);
  const { start, end, title, description } = currentEvent;

  const dayNow = addZeroBefore(new Date(start).getDate());
  const monthNow = addZeroBefore(new Date(start).getMonth() + 1);
  const yearNow = new Date(start).getFullYear();
  const timeHoursStart = new Date(start).getHours();
  const timeHoursEnd = new Date(end).getHours();
  const timeMinutesStart = new Date(start).getMinutes();
  const timeMinutesEnd = new Date(end).getMinutes();
  const timeStart = `${timeHoursStart}:${doubleZero(timeMinutesStart)}`;
  const timeEnd = `${timeHoursEnd}:${doubleZero(timeMinutesEnd)}`;

  headerEl.innerHTML = title;
  descriptionEl.innerHTML = description;
  dateEl.innerHTML = getDisplayedDay(start);
  timeEl.innerHTML = `${timeStart} - ${timeEnd}`;

  editEl.addEventListener('click', () => {
    openModal('', eventId);
    closePopup();
    timeStartEl.placeholder = ``;
    timeEndEl.placeholder = ``;
    timeEndEl.placeholder = `${timeEnd}`;
    timeStartEl.placeholder = `${timeStart}`;
    datePickerEl.value = `${yearNow}-${monthNow}-${dayNow}`;
    descriptionText.value = description;
    titleEl.value = title;
  });

  deleteEl.addEventListener('click', async () => {
    try {
      await deleteTask(eventId);
    } catch (e) {
      alert('Internal Server Error');
    }
    renderWeek();
    closePopup();
  });
};
