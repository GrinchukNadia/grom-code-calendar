const storage = {
  eventIdToDelete: null,
  displayedWeekStart: null,
  events: [],
};

export const setItem = (key, value) => {
  storage[key] = value;
};

export const getItem = (key) => {
  return storage[key];
};