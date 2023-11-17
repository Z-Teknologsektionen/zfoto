import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function createByline(photographers: string | string[]): string {
  const photographersString =
    typeof photographers === "string"
      ? photographers
      : photographers.join(", ");

  if (photographersString === "zFoto") {
    return "Foto: zFoto";
  }

  return `Foto: ${photographersString}/zFoto`;
}

export const getLocalDateTimeFromUTC = (date: Date) => {
  const getHours = date.getHours();
  const getUTCOffset = date.getTimezoneOffset() / -60;
  date.setHours(getHours + getUTCOffset);
  return date;
};
