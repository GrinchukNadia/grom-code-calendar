import { createNumbersArray } from '../common/createNumbersArray.js';
import { addZeroBefore } from '../events/date.utils.js';

export const renderTimescale = () => {
  const calendarTimescaleElem = document.querySelector('.calendar__time-scale');
  const timeScale = createNumbersArray(1, 24);
  const timeScaleMarkup = timeScale.map((hour) => {
    return `
            <div class="time-slot">
                <span class="time-slot__time">${`${addZeroBefore(hour)}:00`}</span>
            </div>
        `;
  });
  calendarTimescaleElem.innerHTML = timeScaleMarkup.join(' ');
};