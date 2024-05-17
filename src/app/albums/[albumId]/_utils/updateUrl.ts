type UpdateUrlProps = {
  imageId: string | undefined;
  albumId: string;
  isOpen: boolean;
};

export const handleUpdateAlbumUrl = ({
  albumId,
  imageId,
  isOpen,
}: UpdateUrlProps) => {
  if (typeof window === "undefined") return;

  if (imageId)
    return window.history.replaceState(
      null,
      "",
      `/albums/${albumId}?imageId=${imageId}`,
    );

  if (!isOpen) return;

  if (window.history.length <= 2)
    return window.history.replaceState(null, "", `/albums/${albumId}`);

  return window.history.back();
};
