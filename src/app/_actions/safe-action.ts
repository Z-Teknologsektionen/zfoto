import { adminLikeRoles } from "@/constants/admin";
import { env } from "@/env.mjs";
import { Roles } from "@prisma/client";
import type { SafeActionClientOpts } from "next-safe-action";
import { createSafeActionClient } from "next-safe-action";
import { getServerAuthSession } from "~/utils/authOptions";
import { ActionError, DEFAULT_ERROR_MESSAGE } from "./safe-action-helpers";

const handleReturnedServerError: SafeActionClientOpts<
  string,
  undefined,
  undefined
>["handleReturnedServerError"] = (e) => {
  if (e instanceof ActionError) return e.message;

  return DEFAULT_ERROR_MESSAGE;
};

const handleServerErrorLog: SafeActionClientOpts<
  string,
  undefined,
  undefined
>["handleServerErrorLog"] = (e) => {
  switch (env.NODE_ENV) {
    case "development":
      // eslint-disable-next-line no-console
      console.error(e);
      break;
    default:
      // TODO: Updatera denna till att maila webbgruppen eller likande för bättre hantering
      break;
  }
};

export const baseSafeAction = createSafeActionClient({
  handleReturnedServerError,
  handleServerErrorLog,
  defaultValidationErrorsShape: "flattened",
}).use(async ({ next }) => {
  const session = await getServerAuthSession();

  return next({ ctx: { session } });
});

export const authSafeAction = baseSafeAction.use(async ({ ctx, next }) => {
  if (ctx.session === null) {
    throw new ActionError(
      "Du måste vara inloggad, vänligen logga in och försök igen",
    );
  }

  return next({ ctx: { session: ctx.session } });
});

export const adminLikeSafeAction = authSafeAction.use(async ({ ctx, next }) => {
  if (!adminLikeRoles.includes(ctx.session.user.role))
    throw new ActionError("Du har inte behörighet att utföra denna åtgärden");

  return next({ ctx });
});

export const adminSafeAction = authSafeAction.use(async ({ ctx, next }) => {
  if (ctx.session.user.role !== Roles.ADMIN)
    throw new ActionError("Du har inte behörighet att utföra denna åtgärden");

  return next({
    ctx: {
      session: {
        ...ctx.session,
        user: {
          ...ctx.session.user,
          role: Roles.ADMIN,
        },
      },
    },
  });
});
