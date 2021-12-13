import { createNumbersArray } from '../common/createNumbersArray.js';

// ф-ция должна генерировать разметку для боковой шкалы времени (24 часа)
// полученную разметку вставьте на страницу с помощью innerHTML в .calendar__time-scale
export const renderTimescale = () => {
    const calendarTimescaleElem = document.querySelector(
      '.calendar__time-scale'
    );
    const timeScale = createNumbersArray(1, 24)
    const marckupArr = timeScale.map(el => {
        return `
            <div class="time-slot">
                <span class="time-slot__time">${el < 10 ? `0${el}:00` : `${el}:00`}</span>
            </div>
        `
    })
    calendarTimescaleElem.innerHTML = marckupArr.join(' ')
};