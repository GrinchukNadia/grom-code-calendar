import { timeSelectElements } from '../calendar/timeSelect.js';

const timeIntervalStart = document.querySelector('#time_intervalsStart');
const allDayEl = timeSelectElements();

Object.values(allDayEl).forEach((optionEl) => {
  timeIntervalStart.innerHTML += optionEl;
});

export const timeStartEl = document.querySelector('[name="startTime"]');
export const timeEndEl = document.querySelector('[name="endTime"]');
const timeIntervalEnd = document.querySelector('#time_intervalsEnd');

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