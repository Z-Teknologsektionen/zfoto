"use client";

import { UseActionCallbackProps } from "@/types/actions";
import { useAction } from "next-safe-action/hooks";
import { useId } from "react";
import toast from "react-hot-toast";
import { defaultOnErrorToastHandler } from "~/actions/safe-action-helpers";
import { sendContactEmail } from "../_actions/send-contact-email";

export const useSendContactEmail = (
  callbacks: UseActionCallbackProps = undefined,
) => {
  const toastId = useId();

  return useAction(sendContactEmail, {
    onExecute: () => {
      toast.loading("Skickar meddelande...", {
        id: toastId,
      });
    },
    onSettled: () => {
      toast.dismiss(toastId);
    },
    onSuccess: () => {
      toast.success("Ditt meddelande har skickats!");
      callbacks?.onSuccess?.();
    },
    onError: defaultOnErrorToastHandler,
  });
};
