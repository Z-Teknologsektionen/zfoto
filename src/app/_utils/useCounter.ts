import { useState } from "react";

export const useCounter = (
  defaultValue?: number,
  min?: number,
  max?: number
): {
  decrement: () => void;
  increment: () => void;
  // eslint-disable-next-line no-unused-vars
  setNumber: (arg0: number) => void;
  value: number;
} => {
  const [value, setValue] = useState(defaultValue ?? 0);

  const increment = (): void => {
    if (max && value + 1 >= max) {
      return;
    }
    setValue((prev) => prev + 1);
  };

  const decrement = (): void => {
    if (min && value + 1 >= min) {
      return;
    }
    setValue((prev) => prev - 1);
  };

  const setNumber = (number: number): void => {
    if ((max && number > max) || (min && number < min)) {
      return;
    }
    setValue(number);
  };
  return { value, increment, decrement, setNumber };
};
