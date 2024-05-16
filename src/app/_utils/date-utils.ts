import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export const formatDateString = (date: Date): string =>
  dayjs(date).format("YYYY-MM-DD");

export const formatDateTimeString = (date: Date): string =>
  dayjs(date).format("YYYY-MM-DD HH:MM:DD");

export const getLocalDateTimeFromUTC = (UTCDate: Date) =>
  dayjs.utc(UTCDate).local();

export const getUTCFromLocalDate = (localDate: Date) => dayjs(localDate).utc();
