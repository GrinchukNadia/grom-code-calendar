import shmoment from './shmoment.js';

export const getStartOfWeek = (date) => {
  const dateCopy = new Date(date);
  const dayOfWeek = dateCopy.getDay();
  const difference =
    dayOfWeek === 0
      ? -6
      : 1 - dayOfWeek;
  const monday = new Date(dateCopy.setDate(new Date(date).getDate() + difference));
  return new Date(monday.getFullYear(), monday.getMonth(), monday.getDate());
};

export const generateWeekRange = (startDate) => {
  const result = [];
  for (let i = 0; i < 7; i += 1) {
    const base = new Date(startDate);
    result.push(new Date(base.setDate(base.getDate() + i)));
  }
  return result;
};

export const getDateTime = (date, time) => {
  const [hours, minutes] = time.split(':');
  const withHours = new Date(new Date(date).setHours(Number(hours)));
  const withMinutes = new Date(new Date(withHours).setMinutes(Number(minutes)));
  return withMinutes;
};

export const monthsNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const getDisplayedMonth = (date) => {
  const weekStart = getStartOfWeek(date);
  const weekEnd = shmoment(date).add('days', 6).result();
  const startMonth = weekStart.getMonth();
  const startYear = weekStart.getFullYear();
  const endMonth = weekEnd.getMonth();
  const endYear = weekEnd.getFullYear();
  const isSameMonth = startMonth === endMonth;
  if (isSameMonth) {
    return `${monthsNames[startMonth]} ${startYear}`;
  }
  const isSameYear = startYear === endYear;
  return isSameYear
    ? `${monthsNames[startMonth]} - ${monthsNames[endMonth]} ${startYear}`
    : `${monthsNames[startMonth]} ${startYear} - ${monthsNames[endMonth]} ${endYear}`;
};

const weekName = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export const getDisplayedDay = (date) => {
  const week = new Date(date).getDay();
  const day = new Date(date).getDate();
  const month = new Date(date).getMonth();
  return `${day} ${monthsNames[month]}, ${weekName[week]}`;
};

export const roundToTimeRange = (hours, minuts) => {
  const timeRange = 15;
  const minutsInHour = 60;

  const roundedMinutes = Math.round(minuts / timeRange) * timeRange;
  const formatedMinutes = `${roundedMinutes === 0 ? '00' : roundedMinutes}`;

  if (roundedMinutes === minutsInHour) {
    return `${hours + 1}:00`;
  }
  return `${hours}:${formatedMinutes}`;
};