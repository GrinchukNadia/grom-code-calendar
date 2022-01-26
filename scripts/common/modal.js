import { onCreateEvent } from '../events/createEvent.js';
import { eventForm } from '../events/weekEvent.js';

const modalElem = document.querySelector('.modal');

export function openModal(message, id) {
  const eventFormElem = document.querySelector('.event-form');
  if(id) {
    eventFormElem.addEventListener('submit', () => onCreateEvent(event, id));
  }
  if (message === 'createBtn') {
    eventForm();
  }
  
  eventFormElem.addEventListener('submit', () => onCreateEvent(event));
  modalElem.classList.remove('hidden');

}

export function closeModal() {
  modalElem.classList.add('hidden');
}