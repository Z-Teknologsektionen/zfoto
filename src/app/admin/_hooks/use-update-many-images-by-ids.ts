import type { UseActionCallbackWithOutErrorProps } from "@/types/actions";
import { useAction } from "next-safe-action/hooks";
import { useId } from "react";
import toast from "react-hot-toast";
import { defaultOnErrorToastHandler } from "~/actions/safe-action-helpers";
import { updateManyImagesByIdsAction } from "../_actions/update-many-images-by-ids-action";

export const useUpdateManyImagesByIds = (
  callbacks: UseActionCallbackWithOutErrorProps = undefined,
) => {
  const toastId = useId();
  return useAction(updateManyImagesByIdsAction, {
    onExecute: ({ input: { imageIds } }) => {
      toast.loading(`Uppdaterar ${imageIds.length} bilder...`, {
        id: toastId,
      });
      callbacks?.onExecute?.();
    },
    onSettled: () => {
      toast.dismiss(toastId);
      callbacks?.onSettled?.();
    },
    onSuccess: ({ input: { imageIds } }) => {
      toast.success(`${imageIds.length} bilder har uppdaterats`);
      callbacks?.onSuccess?.();
    },
    onError: defaultOnErrorToastHandler,
  });
};
