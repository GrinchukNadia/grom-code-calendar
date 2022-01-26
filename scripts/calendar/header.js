import { generateWeekRange, getStartOfWeek } from '../common/time.utils.js';
import { openModal } from '../common/modal.js';
import { timeIndicator } from '../common/timeIndicator.js';

const daysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

export const renderHeader = (weekDate) => {

  const calendarHeaderEll = document.querySelector('.calendar__header');
  let weekRange = [];
  
    if (!weekDate) {
      weekRange = generateWeekRange(getStartOfWeek(new Date()));
    } else {
      weekRange = generateWeekRange(weekDate);
    }

  const headerElements = weekRange.map((dateInWeek, i) => {
    const currentDay = `
      ${new Date().getFullYear()}:
      ${new Date().getMonth()}:
      ${new Date().getDate()}
    `;
    const dayInWeek = `
      ${new Date(dateInWeek).getFullYear()}:
      ${new Date(dateInWeek).getMonth()}:
      ${new Date(dateInWeek).getDate()}
    `;
    const isToday =
      currentDay === dayInWeek
        ? `<span class="day-label__day-number currentDay">${new Date(
            dateInWeek
          ).getDate()}</span>`
        : `<span class="day-label__day-number">${new Date(
            dateInWeek
          ).getDate()}</span>`;

    if (currentDay === dayInWeek) {
      timeIndicator();
    }

    return `
      <div class="calendar__day-label day-label">
        <span class="header__botom-border"></span>
        <span class="day-label__day-name">${
          daysOfWeek[new Date(weekRange[i]).getDay()]
        }</span>
        ${isToday}
      </div>`;
  });

  const emptyCell = document.createElement('div');
  emptyCell.classList.add('empty');

  calendarHeaderEll.innerHTML = headerElements.join(' ');
  calendarHeaderEll.prepend(emptyCell);
};

const creatEventBtn = document.querySelector('.create-event-btn');
creatEventBtn.addEventListener('click', () => {
  openModal('createBtn');
});