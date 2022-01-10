import { getItem, setItem } from '../common/storage.js';
import { renderWeek } from '../calendar/calendar.js';
import { renderHeader } from '../calendar/header.js';
import { getDisplayedMonth } from '../common/time.utils.js';
import shmoment from '../common/shmoment.js';

const navElem = document.querySelector('.navigation');
const displayedMonthElem = document.querySelector(
  '.navigation__displayed-month'
);

function renderCurrentMonth() {
  const result = getDisplayedMonth(getItem('displayedWeekStart'));
  displayedMonthElem.innerHTML = result;
}

const onChangeWeek = (event) => {
  if (event.target.nodeName !== 'I') {
    return;
  }
  const direction =
    event.target.parentElement.attributes['data-direction'].value;
  
  if (direction === 'next') {
    let currentWeek = getItem('displayedWeekStart');
    const previousWeek = shmoment(currentWeek).add('days', 7).result();
    
    setItem('displayedWeekStart', previousWeek);
    renderWeek();
    renderHeader();
    renderCurrentMonth();
  }
  if (direction === 'prev') {
    let currentWeek = getItem('displayedWeekStart');
    const nextWeek = shmoment(currentWeek).subtract('days', 7).result();

    setItem('displayedWeekStart', nextWeek);
    renderWeek();
    renderHeader();
    renderCurrentMonth();
  }
};

export const initNavigation = () => {
  renderCurrentMonth();
  navElem.addEventListener('click', onChangeWeek);
};