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

  // в storage устанавливает поле понедельника текущей недели. получаем при помощи функции getStartOfWeek
  setItem('displayedWeekStart', getStartOfWeek(new Date()));

  // генерирует сетку недели с днями и временными слотами. Добавляет все события текущей недели
  renderWeek();
  
  // генерирует день недели с числом + добавляет попап для кнопки creat
  renderHeader();

  // отображает надпись месяца и года на самом верху. Во время перелистывания все перерисовывает на странице
  initNavigation();

  // при нажатии на create кнопку создает событие и добавляет его в storage
  initEventForm();
  updateLinePosition();

});