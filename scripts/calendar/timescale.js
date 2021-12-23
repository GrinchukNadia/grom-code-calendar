import { createNumbersArray } from '../common/createNumbersArray.js';

export const renderTimescale = () => {
    const calendarTimescaleElem = document.querySelector(
      '.calendar__time-scale'
    );
    const timeScale = createNumbersArray(1, 23)
    const timeScaleMarkup = timeScale.map(hour => {
        return `
            <div class="time-slot">
                <span class="time-slot__time">${hour < 10 ? `0${hour}:00` : `${hour}:00`}</span>
            </div>
        `
    })
    calendarTimescaleElem.innerHTML = timeScaleMarkup.join(' ')
};