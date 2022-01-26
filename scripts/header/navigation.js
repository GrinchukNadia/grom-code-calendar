import { renderWeek } from '../calendar/calendar.js';
import { renderHeader } from '../calendar/header.js';
import { getDisplayedMonth, getStartOfWeek } from '../common/time.utils.js';
import shmoment from '../common/shmoment.js';

const navElem = document.querySelector('.navigation');
const displayedMonthElem = document.querySelector(
  '.navigation__displayed-month'
);

function renderCurrentMonth() {
  const result = getDisplayedMonth(getStartOfWeek(new Date()));
  displayedMonthElem.innerHTML = result;
}

let changeWeekCounter = 0;
const onChangeWeek = (event) => {
  if (event.target.nodeName !== 'I') {
    return;
  }
  const direction =
    event.target.parentElement.attributes['data-direction'].value;
  
  if (direction === 'next') {
    changeWeekCounter +=1;
    let currentWeek = getStartOfWeek(new Date());
    const previousWeek = shmoment(currentWeek).add('days', 7 * changeWeekCounter ).result();
    
    renderWeek(previousWeek);
    renderHeader(previousWeek);
    renderCurrentMonth();
  }
  if (direction === 'prev') {
    changeWeekCounter -= 1;
    console.log()
    let currentWeek = getStartOfWeek(new Date());
    const nextWeek = shmoment(currentWeek)
      .subtract('days', 7 * Math.abs(changeWeekCounter))
      .result();

    renderWeek(nextWeek);
    renderHeader(nextWeek);
    renderCurrentMonth();
  }
};

export const initNavigation = () => {
  renderCurrentMonth();
  navElem.addEventListener('click', onChangeWeek);
};