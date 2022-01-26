import { getTasksList } from '../common/storage.js';
import { getDateTime } from '../common/time.utils.js';

const submitBtnEl = document.querySelector('.event-form__submit-btn');
const startEl = document.querySelector('[name="startTime"]');
const endEl = document.querySelector('[name="endTime"]');
const dateElem = document.querySelector('[name="date"]');

const eventFromTimeEl = document.querySelector('.event-form__time');
const validationMessage = document.createElement('div');
validationMessage.classList.add('not-valid');
eventFromTimeEl.append(validationMessage);

export const eventValidator = async() => {
  const startValue = startEl.value || startEl.attributes.placeholder.value;
  const endValue = endEl.value || endEl.attributes.placeholder.value;
  const date = dateElem.value;

  const startDate = getDateTime(date, startValue);
  const endDate = getDateTime(date, endValue);

  const eventsAll = await getTasksList();

  let valid = true;

  eventsAll.forEach(({ start, end }) => {
    const isSameDay =
      new Date(start).getFullYear() === new Date(startDate).getFullYear() &&
      new Date(start).getMonth() === new Date(startDate).getMonth() &&
      new Date(start).getDate() === new Date(startDate).getDate();

    if (isSameDay) {
      const start1 = new Date(startDate).getTime();
      const start2 = new Date(start).getTime();
      const end1 = new Date(endDate).getTime();
      const end2 = new Date(end).getTime();
      const isValid =
        (start1 > start2 && start1 < end2) ||
        (start2 > start1 && start2 < end1);

      if (isValid) {
        validationMessage.innerHTML = '';
        validationMessage.innerHTML =
          '*This time is already used. Choose anoter.';
        submitBtnEl.setAttribute('disabled', 'true');
        valid = false;
      }
    }
  });

  if (valid) {
    validationMessage.innerHTML = '';
    submitBtnEl.removeAttribute('disabled');
  }
  return valid;
}