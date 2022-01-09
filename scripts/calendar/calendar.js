import { getItem } from '../common/storage.js';
import { generateWeekRange } from '../common/time.utils.js';
import { renderEvents } from '../events/events.js';
import { createNumbersArray } from '../common/createNumbersArray.js';

const generateDay = () => {
    let timeSlotElements = createNumbersArray(0, 24).map(slotNumber => {
        return `
          <div class="calendar__time-slot" data-time="${slotNumber}">
          </div>
        `
    })
    return timeSlotElements.join(' ');
};

export const renderWeek = () => {
    const weekEl = document.querySelector('.calendar__week');
    const datesOfWeek = generateWeekRange(getItem('displayedWeekStart'));

    const weekMarkup = datesOfWeek.map(dayDate => {
        return `
          <div class="calendar__day" data-day="${new Date(dayDate).getDate()}">
            ${generateDay()}
          </div>
        `
    })

    weekEl.innerHTML = weekMarkup.join(' ')
    renderEvents()
};