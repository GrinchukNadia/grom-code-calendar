export function createColorPicker() {
  const colors = [
    '#D50000',
    '#E67C73',
    '#F4511E',
    '#F6BF26',
    '#33B679',
    '#0B8043',
    '#519e9e',
    '#3F51B5',
    '#7986CB',
    '#8E24AA',
  ];
  const container = document.querySelector('.color-picker-container');
  const colorPickerElem = document.createElement('div');
  colorPickerElem.classList.add('color__picker');
  colorPickerElem.classList.add('picker-hidden');

  const colorRowsCreater = () => {
    let rowCounter = null;
    const colorSircleElems = colors.map((el, i) => {
      rowCounter += 1;
      if(rowCounter > 2 ) {
        rowCounter = 1
      }
  
      return `
        ${rowCounter === 1 ? `<div class="color__picker-row">` : ''}
        <div class="color__picker-color">
        <span class="check ${i+1 === 7 ? '' :`check-hidden`}">
        <i class="fas fa-check"></i>
        </span>
        <div class="color-sircle color${i + 1}" data-hash="${el}"></div>
        </div>
        ${rowCounter === 2 ? `</div>` : ''}
      `;
    });
    
    return colorSircleElems;
  }
  
  colorPickerElem.innerHTML = colorRowsCreater().join('')
  container.innerHTML = `
    <div class="color__editor">
      <div class="color__editor-inner">
      <div class="color__editor-choosed"></div>
        <span class="color__editor-arrow">
        <i class="fas fa-chevron-down"></i>
        </span>
      </div>
    </div>
  `;
  
  container.append(colorPickerElem)
}