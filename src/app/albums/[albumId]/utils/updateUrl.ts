type UpdateUrlProps = {
  imageId: string | undefined;
  albumId: string;
  isOpen: boolean;
};

export const updateUrl = ({ albumId, imageId, isOpen }: UpdateUrlProps) => {
  if (typeof window === "undefined") return;

  if (imageId)
    return window.history.replaceState(
      null,
      "",
      `/albums/${albumId}?imageId=${imageId}`,
    );

  if (!isOpen) return;

  return window.history.replaceState(null, "", `/albums/${albumId}`);
};
