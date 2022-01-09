import { getItem } from '../common/storage.js';

export function getDateValues(name) {
  const monday = getItem('displayedWeekStart');
  const startOfWeek = new Date(monday).getDate();
  const monthOfWeek = new Date(monday).getMonth();
  const fullYearOfWeek = new Date(monday).getFullYear();

  let daysArr = [];
  let monthsArr = [];
  let yearsArr = [];

  for (let i = 0; i < 7; i++) {
    daysArr.push(new Date(new Date(monday).setDate(startOfWeek + i)).getDate());
  }

  if (new Date(monday).getMonth() === 11 && startOfWeek > 26) {
    monthsArr.push(new Date(monday).getMonth());
    monthsArr.push(
      new Date(new Date(monday).setMonth(+monthOfWeek + 1)).getMonth()
    );
    yearsArr.push(new Date(monday).getFullYear());
    yearsArr.push(
      new Date(new Date(monday).setFullYear(+fullYearOfWeek + 1)).getFullYear()
    );
  } else {
    monthsArr.push(new Date(monday).getMonth());
    yearsArr.push(new Date(monday).getFullYear());
  }

  if(name === 'days') {
    return daysArr
  } else if(name === 'months') {
    return monthsArr
  } else if(name === 'years') {
    return yearsArr
  }
}