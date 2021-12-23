const linePosition = () => {
  const timeInMinuts = new Date().getMinutes() + new Date().getHours() * 60;

  document.querySelector('.line').style.top = `${+timeInMinuts}px`;
};

export function updateLinePosition() {
  const now = new Date();

  const timeToNextUpdate =
    (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

  setTimeout(() => {
    linePosition();
    updateLinePosition();
  }, timeToNextUpdate);
}

export function timeIndicator() {
  const today = new Date().getDate();
  const todayContainer = document.querySelector(`[data-day="${today}"]`);
  const line = document.createElement('div');
  const innerLine = `
    <span class="line_dote"></span>
    <span class="line_line"></span>
  `;
  line.classList.add('line');
  line.innerHTML = innerLine;
  todayContainer.prepend(line);

  linePosition();
  updateLinePosition();
}