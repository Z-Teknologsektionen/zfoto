import type { UseActionCallbackWithOutErrorProps } from "@/types/actions";
import { useAction } from "next-safe-action/hooks";
import { useId } from "react";
import toast from "react-hot-toast";
import { defaultOnErrorToastHandler } from "~/actions/safe-action-helpers";
import { updateManyAlbumsByIdsAction } from "../_actions/update-many-albums-by-ids-action";

export const useUpdateManyAlbumsByIds = (
  callbacks: UseActionCallbackWithOutErrorProps = undefined,
) => {
  const toastId = useId();
  return useAction(updateManyAlbumsByIdsAction, {
    onExecute: ({ input: { albumIds } }) => {
      toast.loading(`Updaterar ${albumIds.length} album...`, {
        id: toastId,
      });
      callbacks?.onExecute?.();
    },
    onSettled: () => {
      toast.dismiss(toastId);
      callbacks?.onSettled?.();
    },
    onSuccess: ({ input: { albumIds } }) => {
      toast.success(`${albumIds.length} album har uppdaterats`);
      callbacks?.onSuccess?.();
    },
    onError: defaultOnErrorToastHandler,
  });
};
