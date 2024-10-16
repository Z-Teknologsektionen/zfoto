import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function createByline(photographers: string[] | string): string {
  const photographersString =
    typeof photographers === "string"
      ? photographers
      : photographers.join(", ");

  if (photographersString === "zFoto") return "Foto: zFoto";

  return `Foto: ${photographersString}/zFoto`;
}

export const getFullFilePath = (
  filename: string,
  variant: "full" | "lowres" | "thumb" = "lowres",
): string => `/img/${variant}/${filename}`;

export const getBaseUrl = (): string => {
  if (typeof window !== "undefined") return ""; // Browser should use relative url
  if (process.env.VERCEL_URL !== undefined)
    return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}`; // Dev SSR should use localhost
};

export const getValueIfUnique = <T extends boolean | number | string>(
  arr: T[],
): T | undefined => {
  const areAllSame = arr.every((v: T) => v === arr[0]);
  return areAllSame ? arr[0] : undefined;
};
