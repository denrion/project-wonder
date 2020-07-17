export const dateFromValidators = [
  {
    validator: (val: Date) => {
      const isCurrentYear = val.getFullYear() === new Date().getFullYear();
      const is1st = val.getDate() === 1;

      return isCurrentYear && is1st;
    },
    message: `Must be the 1st day of the specified month of the current year`,
  },
];

export const dateToValidators = [
  {
    validator: (val: Date) => {
      const isCurrentYear = val.getFullYear() === new Date().getFullYear();
      const isLastDayOfMonth =
        val.getDate() === new Date(val.getFullYear(), val.getMonth() + 1, 0).getDate();

      return isCurrentYear && isLastDayOfMonth;
    },
    message: `Must be the last day of the specified month of the current year`,
  },
];
