export const formatDateString = (
  date: Date,
  local?: Intl.LocalesArgument
): string => new Date(date).toLocaleDateString(local ?? "sv-SE").toString();

export const formatDateTimeString = (
  date: Date,
  local?: Intl.LocalesArgument
): string => new Date(date).toLocaleString(local ?? "sv-SE").toString();

export const formatTimeString = (
  date: Date,
  local?: Intl.LocalesArgument
): string => new Date(date).toLocaleTimeString(local ?? "sv-SE").toString();
