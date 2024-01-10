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

export const getLocalDateTimeFromUTC = (UTCDate: Date) => {
  const getUTCOffset = UTCDate.getTimezoneOffset() / -60;

  const localDate = new Date(UTCDate);
  localDate.setHours(localDate.getHours() + getUTCOffset);

  return localDate;
};

export const getFullFilePath = (
  filename: string,
  variant: "full" | "lowres" | "thumb" = "lowres",
): string => `/img/${variant}/${filename}`;
