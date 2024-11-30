const secondOfYear = 31536000000; // 1000 * 60 * 60 * 24 * 365;

/**
 * Check if the difference between two dates is at least a year.
 * @param start The start date.
 * @param end The end date.
 * @returns A boolean value.
 */
export const isPastYear = (start: Date, end: Date): boolean => {
  return end.getTime() - start.getTime() >= secondOfYear;
};
