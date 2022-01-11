import { getItem, setItem } from '../common/storage.js';
import { openPopup, closePopup } from '../common/popup.js';
import { renderWeek } from '../calendar/calendar.js';
import { onCloseEventForm } from './createEvent.js';
import { renderHeader } from '../calendar/header.js';
import { editEvent } from './editeEvent.js';

const deleteEventBtn = document.querySelector('.delete-event-btn');

export function handleEventClick(event) {
  if (!event) {
    return;
  }
  const eventElement = event.target.closest('.event');
  const idOfEvent = eventElement ? eventElement.dataset.eventId : null;

  if (eventElement) {
    openPopup(event.pageX, event.pageY - window.scrollY);
    editEvent(idOfEvent);
    setItem('eventIdToDelete', idOfEvent);
    onCloseEventForm();
  }
}

export function onDeleteEvent() {
  const allEvents = getItem('events');
  const idOfEventToDelet = getItem('eventIdToDelete');
  const filteredEventsOnDelete = allEvents.filter(
    ({ id }) => id !== +idOfEventToDelet
  );
  setItem('events', filteredEventsOnDelete);
  renderWeek();
  renderHeader();
  closePopup();
}

deleteEventBtn.addEventListener('click', onDeleteEvent);

// const weekElem = document.querySelector('.calendar__week');
// weekElem.addEventListener('click', handleEventClick);

const submitBtnEl = document.querySelector('.event-form__submit-btn');
submitBtnEl.addEventListener('click', () => {
  const deleteId = getItem('eventIdToDelete');
  if (deleteId) {
    onDeleteEvent();
  } else {
    handleEventClick();
  }
});