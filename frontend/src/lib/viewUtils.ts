export const getWeekBucket = (date: Date, termStart: Date) => {
  const MILLISECONDS_IN_WEEK = 7 * 24 * 60 * 60 * 1000;
  const diffFromStart = date?.getTime() - termStart?.getTime();
  const weekNumber = Math.floor(diffFromStart / MILLISECONDS_IN_WEEK) + 1;
  return `Week ${weekNumber}`;
};
