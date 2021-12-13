import { getItem } from '../common/storage.js';
import { generateWeekRange } from '../common/time.utils.js';
import { renderEvents } from '../events/events.js';
import { createNumbersArray } from '../common/createNumbersArray.js';

// функция должна сгенерировать и вернуть разметку дня в виде строки
// разметка состоит из 24 часовых временных слотов (.calendar__time-slot)
const generateDay = () => {
    const timeSlotsNumbers = createNumbersArray(1, 24);
    let timeSlotsElements = timeSlotsNumbers.map(slotNumber => {
        return `
          <div class="calendar__time-slot" data-time="${slotNumber}">
          </div>
        `
    })

    return timeSlotsElements.join(' ');
};


// функция должна сгенерировать разметку недели в виде строки и вставить ее на страницу (в .calendar__week)
// разметка недели состоит из 7 дней (.calendar__day) отображаемой недели
// массив дней, которые нужно отобразить, считаем ф-цией generateWeekRange на основе displayedWeekStart из storage
// каждый день должен содержать в дата атрибуте порядковый номер дня в месяце
// после того, как отрисовали всю сетку для отображаемой недели, нужно отобразить события этой недели с помощью renderEvents
export const renderWeek = () => {
    const calendarWeekElem = document.querySelector('.calendar__week');
    const daysArr = generateWeekRange(getItem('displayedWeekStart'));

    const daysWithTime = daysArr.map(day => {
        return `
          <div class="calendar__day" data-day="${new Date(day).getDate()}">
            ${generateDay()}
          </div>
        `
    })

    calendarWeekElem.innerHTML = daysWithTime.join(' ')

    renderEvents()
};