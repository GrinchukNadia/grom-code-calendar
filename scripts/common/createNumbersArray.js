export const createNumbersArray = (from, to) =>
  Array(to - from + 1)
    .fill()
    .map((_, i) => from + i);