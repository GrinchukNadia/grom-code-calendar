import { createNumbersArray } from "../common/createNumbersArray.js";

export const timeSelectElements = () => {
  const minutsInDay = 60 * 23;
  const timeRange = 15;
  const timePartsInDay = minutsInDay / timeRange;

  let hours = 1;
  let minutes = 0;

  const createOptionEl = createNumbersArray(1, timePartsInDay).reduce(
    (acc, part) => {
      if (part === 1) {
        return { ...acc, '1:00': `<option value="1:00">` };
      }
      if (minutes < 60 && minutes !== 45) {
        const time = `${hours}:${(minutes += 15)}`;
        return { ...acc, [time]: `<option value="${time}">` };
      }
      if (minutes === 45) {
        minutes = 0;
      }
      return { ...acc, [`${(hours += 1)}:00`]: `<option value="${hours}:00">` };
    },
    {}
  );
  return createOptionEl;
};