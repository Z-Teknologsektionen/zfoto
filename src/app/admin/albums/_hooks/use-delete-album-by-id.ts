import type { UseActionCallbackWithOutErrorProps } from "@/types/actions";
import { useAction } from "next-safe-action/hooks";
import { useId } from "react";
import toast from "react-hot-toast";
import { defaultOnErrorToastHandler } from "~/actions/safe-action-helpers";
import { deleteAlbumByIdAction } from "../_actions/delete-album-by-id-action";

export const useDeleteAlbumById = (
  callbacks: UseActionCallbackWithOutErrorProps = undefined,
) => {
  const toastId = useId();
  return useAction(deleteAlbumByIdAction, {
    onExecute: () => {
      toast.loading(`Raderar album...`, {
        id: toastId,
      });
      callbacks?.onExecute?.();
    },
    onSettled: () => {
      toast.dismiss(toastId);
      callbacks?.onSettled?.();
    },
    onSuccess: () => {
      toast.success(`Album har raderats!`);
      callbacks?.onSuccess?.();
    },
    onError: defaultOnErrorToastHandler,
  });
};
