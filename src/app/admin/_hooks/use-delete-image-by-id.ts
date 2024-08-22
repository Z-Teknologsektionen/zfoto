import type { UseActionCallbackWithOutErrorProps } from "@/types/actions";
import { useAction } from "next-safe-action/hooks";
import { useId } from "react";
import toast from "react-hot-toast";
import { defaultOnErrorToastHandler } from "~/actions/safe-action-helpers";
import { deleteImageByIdAction } from "../_actions/delete-image-by-id-action";

export const useDeleteImageById = (
  callbacks: UseActionCallbackWithOutErrorProps = undefined,
) => {
  const toastId = useId();
  return useAction(deleteImageByIdAction, {
    onExecute: () => {
      toast.loading("Raderar bild...", {
        id: toastId,
      });
      callbacks?.onExecute?.();
    },
    onSettled: () => {
      toast.dismiss(toastId);
      callbacks?.onSettled?.();
    },
    onSuccess: () => {
      toast.success(`Bilden har raderats`);
      callbacks?.onSuccess?.();
    },
    onError: defaultOnErrorToastHandler,
  });
};
