export const randomString = (length = 8): string => Math.random().toString(16).substr(2, length);

export const slugify = (word: string): string => word.toLowerCase().split(' ').join('-');

export const getMonthName = (month: number): string => {
  const date = new Date();
  date.setMonth(month - 1);

  return date.toLocaleString('en-US', { month: 'long' });
};
