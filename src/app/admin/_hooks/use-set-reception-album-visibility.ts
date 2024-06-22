"use client";

import type { UseActionCallbackWithOutErrorProps } from "@/types/actions";
import { useAction } from "next-safe-action/hooks";
import { useId } from "react";
import toast from "react-hot-toast";
import { defaultOnErrorToastHandler } from "~/actions/safe-action-helpers";
import { setReceptionAlbumVisibilityAction } from "../_actions/set-reception-album-visibility-action";

export const useSetReceptionAlbumVisibility = (
  callbacks: UseActionCallbackWithOutErrorProps = undefined,
) => {
  const toastId = useId();

  return useAction(setReceptionAlbumVisibilityAction, {
    onExecute: ({ isVisible }) => {
      toast.loading(
        `${isVisible ? "Visar" : "Döljer"} alla mottagningsalbum...`,
        {
          id: toastId,
        },
      );
      callbacks?.onExecute?.();
    },
    onSettled: () => {
      toast.dismiss(toastId);
      callbacks?.onSettled?.();
    },
    onSuccess: (_, { isVisible }) => {
      toast.success(
        `${isVisible ? "Visar" : "Döljer"} nu alla mottagningsalbum!`,
      );
      callbacks?.onSuccess?.();
    },
    onError: defaultOnErrorToastHandler,
  });
};
