export const dateFromValidators = [
  {
    validator: (val: Date) => {
      const isCurrentYear = val.getFullYear() === new Date().getFullYear();
      const is1st = val.getDate() === 1;
      const is16th = val.getDate() === 16;

      return isCurrentYear && (is1st || is16th);
    },
    message: `Must be either 1st or 16th day of the specified month of the current year`,
  },
];

export const dateToValidators = [
  {
    validator: (val: Date) => {
      const isCurrentYear = val.getFullYear() === new Date().getFullYear();
      const is15th = val.getDate() === 15;
      const isLastDayOfMonth =
        val.getDate() === new Date(val.getFullYear(), val.getMonth() + 1, 0).getDate();

      return isCurrentYear && (is15th || isLastDayOfMonth);
    },
    message: `Must be 15th or last day of the specified month of the current year`,
  },
];
