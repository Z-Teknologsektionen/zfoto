import type { Prettify } from "./utils";

export type PrismaTypeToUpdateByIdData<T> = Prettify<
  Partial<Omit<T, "createdAt" | "id" | "updatedAt">>
>;
