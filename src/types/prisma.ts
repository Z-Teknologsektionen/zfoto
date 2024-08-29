import type { Prettify } from "./utils";

export type PrismaTypeToUpdateByIdData<
  T,
  K extends keyof T | "" = "",
> = Prettify<Partial<Omit<T, K | "createdAt" | "id" | "updatedAt">>>;
