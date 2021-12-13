const modalElem = document.querySelector('.modal');
const modalContentElem = document.querySelector('.modal__content');
const creatEventBtn = document.querySelector('.create-event-btn');
const closeBtn = document.querySelector('.create-event__close-btn');

// опишите ф-ции openModal и closeModal
// модальное окно работает похожим на попап образом
// отличие в том, что попап отображается в месте клика, а модальное окно - по центру экрана
export function openModal() {
  creatEventBtn.addEventListener('click', () => {
    modalElem.classList.remove('hidden')
  })
}

export function closeModal() {
  closeBtn.addEventListener('click', () => {
    console.log('close btn')
    modalElem.classList.add('hidden')
  })
}
