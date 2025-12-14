"use server";

import { clearFullCache } from "@/lib/cache";

export const clearFullCacheAction = async (): Promise<void> => {
  clearFullCache();
};
