import { adminLikeRoles } from "@/constants/admin";
import { env } from "@/env.mjs";
import { SafeClientOpts, createSafeActionClient } from "next-safe-action";
import { getServerAuthSession } from "~/utils/authOptions";
import { ActionError, DEFAULT_ERROR_MESSAGE } from "./safe-action-helpers";

const handleReturnedServerError: SafeClientOpts<
  unknown,
  unknown
>["handleReturnedServerError"] = (e) => {
  if (e instanceof ActionError) return e.message;

  return DEFAULT_ERROR_MESSAGE;
};

const handleServerErrorLog: SafeClientOpts<
  unknown,
  unknown
>["handleServerErrorLog"] = (e) => {
  if (env.NODE_ENV === "production") {
    // TODO: Updatera denna till att maila webbgruppen eller likande för bättre hantering
  }
  console.error(e);
};

export const baseSafeAction = createSafeActionClient({
  handleReturnedServerError,
  handleServerErrorLog,
  middleware: async () => {
    const session = await getServerAuthSession();

    return { session };
  },
});

export const authSafeAction = createSafeActionClient({
  handleReturnedServerError,
  handleServerErrorLog,
  middleware: async () => {
    const session = await getServerAuthSession();

    if (!session) {
      throw new ActionError(
        "Du måste vara inloggad, vänligen logga in och försök igen",
      );
    }

    return { session };
  },
});

export const adminLikeSafeAction = createSafeActionClient({
  handleReturnedServerError,
  handleServerErrorLog,
  middleware: async () => {
    const session = await getServerAuthSession();

    if (!session) {
      throw new ActionError(
        "Du måste vara inloggad, vänligen logga in och försök igen",
      );
    }

    if (!adminLikeRoles.includes(session.user.role))
      throw new ActionError("Du har inte behörighet att utföra denna åtgärden");

    return { session };
  },
});

export const adminSafeAction = createSafeActionClient({
  handleReturnedServerError,
  handleServerErrorLog,
  middleware: async () => {
    const session = await getServerAuthSession();

    if (!session) {
      throw new ActionError(
        "Du måste vara inloggad, vänligen logga in och försök igen",
      );
    }

    if (!adminLikeRoles.includes(session.user.role))
      throw new ActionError("Du har inte behörighet att utföra denna åtgärden");

    return { session };
  },
});
