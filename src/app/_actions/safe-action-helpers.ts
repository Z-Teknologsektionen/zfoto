import type { HookResult } from "next-safe-action/hooks";
import toast from "react-hot-toast";
import type { Schema } from "zod";

export const DEFAULT_ERROR_MESSAGE =
  "Okänt fel har inträffat. Försök igen senare!";

export const defaultOnErrorToastHandler = (
  error: HookResult<Schema, unknown>,
): void => {
  if (error.serverError !== undefined) {
    toast.error(error.serverError);
    return;
  }

  if (error.validationErrors !== undefined) {
    const formatedErrors = Object.entries(error.validationErrors)
      .map(([path, messages]) => `${path}: ${messages.join(", ")}`)
      .join("\n");
    toast.error(`Ogiltig input: \n ${formatedErrors}`);
    return;
  }

  toast.error(DEFAULT_ERROR_MESSAGE);
};

export class ActionError extends Error {}
