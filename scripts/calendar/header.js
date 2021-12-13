import { getItem } from '../common/storage.js';
import { generateWeekRange } from '../common/time.utils.js';
import { openModal } from '../common/modal.js';

const daysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

// на основе displayedWeekStart из storage с помощью generateWeekRange сформируйте массив дней текущей недели
// на основе полученного массива сформируйте разметку в виде строки - 7 дней (день недели и число в месяце)
// полученную разметку вставить на страницу с помощью innerHTML в .calendar__header
// в дата атрибуте каждой ячейки должно хранить для какого часа эта ячейка
export const renderHeader = () => {
  const calendarHeaderEll = document.querySelector('.calendar__header');
  const result = generateWeekRange(getItem('displayedWeekStart'));
  // console.log('in header', result)

  const newArr = result.map((el, i) => {
    const currentDay = `
      ${new Date().getFullYear()}:
      ${new Date().getMonth()}:
      ${new Date().getDate()}
    `;
    const dayInWeek = `
      ${new Date(el).getFullYear()}:
      ${new Date(el).getMonth()}:
      ${new Date(el).getDate()}
    `;

    return `
      <div class="calendar__day-label day-label">
        <span class="header__botom-border"></span>
        <span class="day-label__day-name">${
          daysOfWeek[new Date(result[i]).getDay()]
        }</span>
        ${
          currentDay === dayInWeek
            ? `<span class="day-label__day-number currentDay">${new Date(
                el
              ).getDate()}</span>`
            : `<span class="day-label__day-number">${new Date(
                el
              ).getDate()}</span>`
        }
        
        </div>
        `;
  });
  const emptyCell = document.createElement('div');
  emptyCell.classList.add('empty');

  calendarHeaderEll.innerHTML = newArr.join(' ');
  calendarHeaderEll.prepend(emptyCell);
};

// при клике на кнопку "Create" открыть модальное окно с формой для создания события
// назначьте здесь обработчик
openModal();
