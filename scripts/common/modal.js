import { eventForm } from './timePicker.js';

const modalElem = document.querySelector('.modal');

export function openModal() {
  eventForm()
  modalElem.classList.remove('hidden')
}

export function closeModal() {
  modalElem.classList.add('hidden')
}