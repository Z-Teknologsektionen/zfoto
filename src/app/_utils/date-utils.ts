import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

export const UTC_TIMEZONE = "utc";
export const SWE_TIMEZONE = "Europe/Stockholm";

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault(SWE_TIMEZONE);
dayjs.locale(SWE_TIMEZONE);

export const formatDateString = (date: Date): string =>
  dayjs(date).format("YYYY-MM-DD");

export const formatDateTimeString = (date: Date): string =>
  dayjs(date).format("YYYY-MM-DD HH:mm:ss");

export const getLocalDateTimeFromUTC = (UTCDate: Date) =>
  dayjs(UTCDate).tz(UTC_TIMEZONE, true).toDate();

export const getUTCFromLocalDate = (localDate: Date) =>
  dayjs(localDate.toISOString().slice(0, -8)).tz(UTC_TIMEZONE).toDate();

export { dayjs as dayjsSWE };
