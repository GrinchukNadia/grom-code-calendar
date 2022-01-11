import { renderTimescale } from './calendar/timescale.js';
import { renderWeek } from './calendar/calendar.js';
import { renderHeader } from './calendar/header.js';
import { initNavigation } from './header/navigation.js';
import { setItem } from './common/storage.js';
import { getStartOfWeek } from './common/time.utils.js';
import { initEventForm } from './events/createEvent.js';
import { updateLinePosition } from './common/timeIndicator.js';

document.addEventListener('DOMContentLoaded', () => {
  const todayBtn = document.querySelector('[data-direction="today"]');
  todayBtn.addEventListener('click', () => {
    setItem('displayedWeekStart', getStartOfWeek(new Date()));
    renderWeek();
    renderHeader();
  });

  renderTimescale();
  
  setItem('displayedWeekStart', getStartOfWeek(new Date()));
  
  renderWeek();
  
  renderHeader();
  
  initNavigation();
  
  initEventForm();
  updateLinePosition();
  
});

const onStorageChange = (e) => {
  if (e.key === 'calendarStorage') {
    renderWeek();
    renderHeader();
    initNavigation();
  }
};
window.addEventListener('storage', onStorageChange);