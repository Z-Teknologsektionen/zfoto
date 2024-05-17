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

export const getFullFilePath = (
  filename: string,
  variant: "full" | "lowres" | "thumb" = "lowres",
): string => `/img/${variant}/${filename}`;

export const getBaseUrl = (): string => {
  if (typeof window !== "undefined") return ""; // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};
