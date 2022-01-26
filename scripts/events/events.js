import { openPopup } from '../common/popup.js';
import { onCloseEventForm } from './createEvent.js';
import { editEvent } from './editeEvent.js';

export const handleEventClick = async (event) => {
  if (!event) {
    return;
  }
  const eventElement = event.target.closest('.event');
  const idOfEvent = eventElement ? eventElement.dataset.eventId : null;

  if (eventElement) {
    openPopup(event.pageX, event.pageY - window.scrollY);
    try {
      await editEvent(idOfEvent);
    } catch (e) {
      alert('Internal Server Error');
    }
    onCloseEventForm();
  }
};
