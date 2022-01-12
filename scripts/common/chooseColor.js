function colorChoosed() {
  const colorChoosedElem = document.querySelector('.color__editor-choosed');
  const choosedColorElem = document.querySelector('.chosen');

  const choosedColor = choosedColorElem.dataset.hash;
  colorChoosedElem.style.backgroundColor = choosedColor;
}

export function chooseColor() {
  const colorPickerElem = document.querySelector('.color__picker');
  function onPick() {
    colorPickerElem.classList.remove('picker-hidden');
  }

  function onClosePicker() {
    colorPickerElem.classList.add('picker-hidden');
  }

  const colorChooseElem = document.querySelector('.color__editor');
  colorChooseElem.addEventListener('click', onPick);

  function onColorChoose(e) {
    const isColorSircle = e.target.classList.contains('color-sircle');
    if (!isColorSircle) {
      return;
    }

    const allUncheck = document.querySelectorAll('.check');
    allUncheck.forEach((el) => {
      el.classList.add('check-hidden');
      el.nextElementSibling.classList.remove('chosen');
    });

    const checkIcon = e.target.previousElementSibling;
    checkIcon.classList.remove('check-hidden');
    checkIcon.nextElementSibling.classList.add('chosen');
    colorChoosed();
    onClosePicker();
  }
  colorPickerElem.addEventListener('click', onColorChoose);
  colorPickerElem.addEventListener('click', onClosePicker);
}