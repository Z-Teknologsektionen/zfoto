import type { MaybePromise } from "@/types/utils";
import toast from "react-hot-toast";

export const DEFAULT_ERROR_MESSAGE =
  "Okänt fel har inträffat. Försök igen senare!";

export const defaultOnErrorToastHandler = ({
  error,
}: {
  error: {
    serverError?: string | undefined;
    validationErrors?:
      | {
          formErrors: string[];
          fieldErrors: Record<string, string[] | undefined>;
        }
      | undefined;
    bindArgsValidationErrors?: readonly [] | undefined;
    fetchError?: string | undefined;
  };
}): MaybePromise<void> => {
  if (error.serverError !== undefined) {
    toast.error(error.serverError);
    return;
  }

  if (error.validationErrors !== undefined) {
    const formatedErrors = Object.entries(error.validationErrors.fieldErrors)
      .map(
        ([path, messages]) =>
          messages !== undefined && `${path}: ${messages.join(", ")}`,
      )
      .filter((val) => val !== false);

    formatedErrors.push(error.validationErrors.formErrors.join(", "));

    toast.error(`Ogiltig input: \n ${formatedErrors.join("\n")}`);
    return;
  }

  toast.error(DEFAULT_ERROR_MESSAGE);
};

export class ActionError extends Error {}
