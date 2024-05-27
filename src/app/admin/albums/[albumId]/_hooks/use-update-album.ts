"use client";

import { UseActionCallbackWithOutErrorProps } from "@/types/actions";
import { useAction } from "next-safe-action/hooks";
import { useId } from "react";
import toast from "react-hot-toast";
import { defaultOnErrorToastHandler } from "~/actions/safe-action-helpers";
import { updateAlbumAction } from "../_actions/update-album-action";

export const useUpdateAlbum = (
  callbacks: UseActionCallbackWithOutErrorProps = undefined,
) => {
  const toastId = useId();
  const props = useAction(updateAlbumAction, {
    onExecute: () => {
      toast.loading("Updaterar album...", {
        id: toastId,
      });
      callbacks?.onExecute?.();
    },
    onSettled: () => {
      toast.dismiss(toastId);
      callbacks?.onSettled?.();
    },
    onSuccess: ({ title }) => {
      toast.success(`${title} har nu updaterats!`);
      callbacks?.onSuccess?.();
    },
    onError: defaultOnErrorToastHandler,
  });

  return props;
};
