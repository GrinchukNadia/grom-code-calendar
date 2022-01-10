import { openModal } from "../common/modal.js";
import { roundToTimeRange } from "../common/time.utils.js";
import { timeEndEl, timeStartEl } from "../common/timePicker.js";
import { addZeroBefore, getDateValues } from "./date.utils.js";

const hoursNow = new Date().getHours();
const minutsNow = new Date().getMinutes();
const dayNow = new Date().getDate();
const monthNow = new Date().getMonth();
const yearNow = new Date().getFullYear();

const datePickerEl = document.querySelector('#datepicker');

const timeRange = 15;
const defaultTimeStart = roundToTimeRange(hoursNow, minutsNow);
const defaultTimeEnd = roundToTimeRange(hoursNow, minutsNow + timeRange);
const currentDate = `${yearNow}-${addZeroBefore(monthNow + 1)}-${addZeroBefore(dayNow)}`;

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
    datePickerEl.value = `${currentYear}-${addZeroBefore(
      +currentMonth + 1
    )}-${addZeroBefore(day)}`;
  }
});