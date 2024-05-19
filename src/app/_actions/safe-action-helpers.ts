import { HookResult } from "next-safe-action/hooks";
import toast from "react-hot-toast";
import { Schema } from "zod";

export const DEFAULT_ERROR_MESSAGE =
  "Okänt fel har inträffat. Försök igen senare!";

export const defaultOnErrorToastHandler = (
  error: HookResult<Schema, unknown>,
) => {
  if (error.serverError) toast.error(error.serverError);
  else if (error.validationErrors) {
    const formatedErrors = Object.entries(error.validationErrors)
      .map(([path, messages]) => `${path}: ${messages.join(", ")}`)
      .join("\n");
    toast.error(`Ogiltig input: \n ${formatedErrors}`);
  } else toast.error(DEFAULT_ERROR_MESSAGE);
};

export class ActionError extends Error {}
