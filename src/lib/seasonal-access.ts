import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { getAuth } from "~/utils/auth";

export const getSeasonalRobots = (
  isVisible: boolean,
): Metadata["robots"] =>
  isVisible ? undefined : { index: false, follow: false, noimageindex: true };

// `connection()` forces this render out of the Full Route/Data Cache, so a
// hidden page's auth check always runs per-request instead of being baked
// into a statically generated/ISR-cached response and reused across users
// (reading cookies via getAuth() alone was not enough to trigger this).
// Public pages never call it, so they keep their existing ISR caching.
export const requireAuthForHiddenContent = async (
  isVisible: boolean,
  callbackPath: string,
) => {
  if (isVisible) return;

  await connection();

  const session = await getAuth();
  if (!session) {
    redirect(
      `/auth/sign-in?error=SessionRequired&callbackUrl=${encodeURIComponent(callbackPath)}`,
    );
  }
};
