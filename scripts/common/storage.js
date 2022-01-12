export const setItem = (key, value) => {
  let storage = JSON.parse(localStorage.getItem('calendarStorage'));
  storage[key] = value;

  localStorage.setItem('calendarStorage', JSON.stringify(storage));
};

export const getItem = (key) => {
  let storage = JSON.parse(localStorage.getItem('calendarStorage'));
  return storage[key];
};
