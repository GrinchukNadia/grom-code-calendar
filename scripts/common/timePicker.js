import { timeSelectElements } from '../calendar/timeSelect.js';
import { getDateValues } from '../events/date.utils.js';
import { openModal } from './modal.js';
import { roundToTimeRange } from './time.utils.js';

const timeIntervalStart = document.querySelector('#time_intervalsStart');
const allDayEl = timeSelectElements();
const timeRange = 15;

Object.values(allDayEl).forEach((optionEl) => {
  timeIntervalStart.innerHTML += optionEl;
});

const hoursNow = new Date().getHours();
const minutsNow = new Date().getMinutes();
const dayNow = new Date().getDate();
const monthNow = new Date().getMonth();
const yearNow = new Date().getFullYear();

const timeStartEl = document.querySelector('[name="startTime"]');
const timeEndEl = document.querySelector('[name="endTime"]');
const datePickerEl = document.querySelector('#datepicker');
const timeIntervalEnd = document.querySelector('#time_intervalsEnd');

const defaultTimeStart = roundToTimeRange(hoursNow, minutsNow);
const defaultTimeEnd = roundToTimeRange(hoursNow, minutsNow + timeRange);
const currentDate = `${yearNow}-${monthNow + 1}-${dayNow}`;

timeStartEl.addEventListener('change', () => {
  const timeStart = timeStartEl.value;
  if (timeStart !== '') {
    const timeArr = timeStart.split(':');
    const [hours, minutes] = timeArr;
    const defaultEnd =
      +minutes + 15 === 60 ? `${+hours + 1}:00` : `${hours}:${+minutes + 15}`;

    const formatedTime =
      +minutes - 15 === 0 ? `${+hours}:00` : `${hours}:${+minutes - 15}`;
    const defaultStart =
      +minutes - 15 === -15 ? `${+hours - 1}:45` : `${formatedTime}`;

    timeEndEl.placeholder = ``;
    timeEndEl.placeholder = `${defaultEnd}`;
    timeStartEl.placeholder = `${defaultStart}`;
  }

  const maxAmountOfTimeParts = (6 * 60) / 15;
  const timeEndElObject = timeSelectElements();

  const endIdArr = Object.keys(timeEndElObject);
  const from = endIdArr.indexOf(timeStart) + 1;
  const to = from + maxAmountOfTimeParts;
  const endKeysArr = endIdArr.slice(from, to);

  timeIntervalEnd.innerHTML = '';
  endKeysArr.forEach((id) => {
    timeIntervalEnd.innerHTML += timeEndElObject[id];
  });
});

timeEndEl.addEventListener('change', () => {
  const timeEnd = timeEndEl.value;

  const maxAmountOfTimeParts = (6 * 60) / 15;
  const timeStartElObject = timeSelectElements();

  if (timeEnd !== '') {
    const timeArr = timeEnd.split(':');
    const [hours, minutes] = timeArr;
    const formatedTime =
      +minutes - 15 === 0 ? `${+hours}:00` : `${hours}:${+minutes - 15}`;
    const defaultStart =
      +minutes - 15 === -15 ? `${+hours - 1}:45` : `${formatedTime}`;

    const defaultEnd =
      +minutes + 15 === 60 ? `${+hours + 1}:00` : `${hours}:${+minutes + 15}`;

    timeStartEl.placeholder = ``;
    timeEndEl.placeholder = `${defaultEnd}`;
    timeStartEl.placeholder = `${defaultStart}`;
  }

  const endIdArr = Object.keys(timeStartElObject).reverse();
  const from = endIdArr.indexOf(timeEnd) + 1;
  const to = from + maxAmountOfTimeParts;
  const startKeysArr = endIdArr.slice(from, to);

  timeIntervalStart.innerHTML = '';
  startKeysArr.reverse().forEach((id) => {
    timeIntervalStart.innerHTML += timeStartElObject[id];
  });
});

export function eventForm() {
  timeStartEl.placeholder = `${defaultTimeStart}`;
  timeEndEl.placeholder = `${defaultTimeEnd}`;
  datePickerEl.value = currentDate;
}

export function clearTime() {
  timeStartEl.placeholder = ``;
  timeEndEl.placeholder = ``;
}

const calendarWeekElem = document.querySelector('.calendar__week');
calendarWeekElem.addEventListener('click', (event) => {

  if (!event.target.closest('.event')) {
    openModal();
    const start = event.target.attributes['data-time'].value;
    const timeStart = `${start}:00`;
    const timeEnd = `${+start + 1}:00`;
    const day = event.target.parentNode.attributes['data-day'].value;

    const currentMonth =
      day < 7 && getDateValues('months').length > 1
        ? getDateValues('months')[1]
        : getDateValues('months')[0];

    const currentYear =
      getDateValues('years').length > 1 && day < 7
        ? getDateValues('years')[1]
        : getDateValues('years')[0];

    timeStartEl.placeholder = `${timeStart}`;
    timeEndEl.placeholder = `${timeEnd}`;
    datePickerEl.value = `${currentYear}-${
      currentMonth + 1 < 10 ? `0${+currentMonth + 1}` : +currentMonth + 1
    }-${day < 10 ? `0${day}` : day}`;
  }
});