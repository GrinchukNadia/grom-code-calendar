import { getItem } from '../common/storage.js';
import { getDateValues, doubleZero } from './date.utils.js';

const createEventElement = (event) => {
  const hoursStart = new Date(event.start).getHours();
  const minutsStart = new Date(event.start).getMinutes();
  const hoursEnd = new Date(event.end).getHours();
  const minutsEnd = new Date(event.end).getMinutes();

  const dayInMinutes =
    hoursEnd * 60 + minutsEnd - (hoursStart * 60 + minutsStart);

  const eventElement = document.createElement('div');
  eventElement.classList.add('event');
  eventElement.setAttribute('data-event-id', event.id);
  eventElement.style = `height: ${dayInMinutes}px; top: ${minutsStart}px`;

  eventElement.innerHTML = `
        <div class="event__title">${event.title}</div>
        <div class="event__time">${hoursStart}:${doubleZero(
    minutsStart
  )} - ${hoursEnd}:${doubleZero(minutsEnd)}</div>
  `;
  return eventElement;
};


export const renderEvents = () => {
  const weekElem = document.querySelector('.calendar__week');

  const allEvents = getItem('events');

  const filteredEvents = allEvents.filter((value) => {
    const fullYearOfEvent = new Date(value.start).getFullYear();
    const monthOfEvent = new Date(value.start).getMonth();
    const dayOfEvent = new Date(value.start).getDate();

    return (
      getDateValues('years').includes(fullYearOfEvent) &&
      getDateValues('months').includes(monthOfEvent) &&
      getDateValues('days').includes(dayOfEvent)
    );
  });

  filteredEvents.forEach((el) => {
    const dayData = weekElem.querySelector(
      `[data-day="${new Date(el.start).getDate()}"]`
    );
    const time = new Date(el.start).getHours();
    let timeData = dayData.querySelector(`[data-time="${time}"]`);
    timeData.append(createEventElement(el));
  });
};