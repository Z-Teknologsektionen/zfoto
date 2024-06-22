type UpdateUrlProps = {
  imageId: string | undefined;
  albumId: string;
  isOpen: boolean;
};

export const handleUpdateAlbumUrl = ({
  albumId,
  imageId,
  isOpen,
}: UpdateUrlProps): void => {
  if (typeof window === "undefined") return;

  if (imageId !== undefined) {
    window.history.replaceState(
      null,
      "",
      `/albums/${albumId}?imageId=${imageId}`,
    );
    return;
  }

  if (!isOpen) return;

  if (window.history.length <= 2) {
    window.history.replaceState(null, "", `/albums/${albumId}`);
    return;
  }

  window.history.back();
};
