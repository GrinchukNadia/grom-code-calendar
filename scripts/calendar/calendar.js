import { generateWeekRange, getStartOfWeek } from '../common/time.utils.js';
import { createNumbersArray } from '../common/createNumbersArray.js';
import { renderEvents } from '../events/renderEvents.js';

const generateDay = () => {
    let timeSlotElements = createNumbersArray(0, 24).map(slotNumber => {
        return `
          <div class="calendar__time-slot" data-time="${slotNumber}">
          </div>
        `
    })
    return timeSlotElements.join(' ');
};

export const renderWeek = (weekDate) => {
  const weekEl = document.querySelector('.calendar__week');

  let datesOfWeek = []

  if(!weekDate) {
    datesOfWeek = generateWeekRange(getStartOfWeek(new Date()))
  } else {
    datesOfWeek = generateWeekRange(weekDate);
  }

    const weekMarkup = datesOfWeek.map((dayDate) => {
      return `
          <div class="calendar__day" data-day="${new Date(dayDate).getDate()}">
            ${generateDay()}
          </div>
        `;
    });

    weekEl.innerHTML = weekMarkup.join(' ')
    renderEvents()
};