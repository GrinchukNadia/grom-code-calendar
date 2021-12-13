export const createNumbersArray = (from, to) =>
  Array(to - from + 1)
    .fill()
    .map((el, i) => from + i);