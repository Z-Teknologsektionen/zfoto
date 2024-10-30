"use server";

import { clearFullCache } from "@/lib/cache";

// eslint-disable-next-line @typescript-eslint/require-await
export const clearFullCacheAction = async (): Promise<void> => {
  clearFullCache();
};
