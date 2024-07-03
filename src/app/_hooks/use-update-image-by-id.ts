import type { UseActionCallbackWithOutErrorProps } from "@/types/actions";
import { useAction } from "next-safe-action/hooks";
import { useId } from "react";
import toast from "react-hot-toast";
import { defaultOnErrorToastHandler } from "~/actions/safe-action-helpers";
import { updateImageByIdAction } from "~/actions/update-image-by-id-action";

export const useUpdateImageById = (
  callbacks: UseActionCallbackWithOutErrorProps = undefined,
) => {
  const toastId = useId();
  return useAction(updateImageByIdAction, {
    onExecute: () => {
      toast.loading("Updaterar bild...", {
        id: toastId,
      });
      callbacks?.onExecute?.();
    },
    onSettled: () => {
      toast.dismiss(toastId);
      callbacks?.onSettled?.();
    },
    onSuccess: ({ filename }) => {
      toast.success(`Bild med filnamn: ${filename} har nu updaterats!`);
      callbacks?.onSuccess?.();
    },
    onError: defaultOnErrorToastHandler,
  });
};
