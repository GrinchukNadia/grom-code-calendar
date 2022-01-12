const storage = {
  eventIdToDelete: null,
  displayedWeekStart: null,
  events: [],
};

export const inintStorage = () => {
  const isInit = localStorage.getItem('calendarStorage')

  if(isInit) {
    return
  }

  localStorage.setItem('calendarStorage', JSON.stringify(storage))
}

export const setItem = (key, value) => {
  let storage = JSON.parse(localStorage.getItem('calendarStorage'));
  storage[key] = value;

  localStorage.setItem('calendarStorage', JSON.stringify(storage));
};

export const getItem = (key) => {
  let storage = JSON.parse(localStorage.getItem('calendarStorage'));
  return storage[key];
};