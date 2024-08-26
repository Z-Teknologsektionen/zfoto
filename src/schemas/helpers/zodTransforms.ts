import type { CheckedState } from "@radix-ui/react-checkbox";

export const emptyStringToUndefined = (str: string): string | undefined =>
  str === "" ? undefined : str;

export const indeterminateToUndefined = (
  val: CheckedState,
): boolean | undefined => (val === "indeterminate" ? undefined : val);
