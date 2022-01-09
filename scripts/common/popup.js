const popupElem = document.querySelector('.popup');
const popupContentElem = document.querySelector('.popup__content');

function disableScroll() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  window.onscroll = function () {
    window.scrollTo(scrollLeft, scrollTop);
  };
}

function enableScroll() {
  window.onscroll = function () {};
}

export function openPopup(x, y) {
  popupElem.classList.remove('hidden');
  const popupWidth = popupContentElem.offsetWidth;
  const popupHeight = popupContentElem.offsetHeight;
  const screenWidth = document.documentElement.clientWidth;
  const screenHeight = document.documentElement.clientHeight;

  const isVisibleWidth = screenWidth - x > popupWidth;
  const isVisibleHeight = screenHeight - y > popupHeight;

  popupContentElem.style.top = `${isVisibleHeight ? y : y - popupHeight}px`;
  popupContentElem.style.left = `${isVisibleWidth ? x : x - popupWidth}px`;

  disableScroll();
}

export function closePopup() {
  popupElem.classList.add('hidden');
  enableScroll();
}

function onClickInsidePopup(event) {
  event.stopPropagation();
}

popupContentElem.addEventListener('click', onClickInsidePopup);
popupElem.addEventListener('click', closePopup);