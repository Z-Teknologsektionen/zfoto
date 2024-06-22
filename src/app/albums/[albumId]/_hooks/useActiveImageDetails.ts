"use client";

import { useMemo } from "react";
import type { PublicAlbum } from "~/utils/fetchAlbumData";

export const useActiveImageDetails = ({
  images,
  imageId,
  closePopup,
}: {
  images: PublicAlbum["images"];
  imageId: string | null | undefined;
  closePopup: () => void;
}) =>
  useMemo(() => {
    const currentIndex = images.findIndex(({ id }) => imageId === id);
    if (currentIndex === -1) {
      closePopup();
      return {};
    }
    return {
      activeImage: images.at(currentIndex),
      prevImageId:
        currentIndex > 0 ? images.at(currentIndex - 1)?.id : undefined,
      nextImageId:
        currentIndex < images.length - 1
          ? images.at(currentIndex + 1)?.id
          : undefined,
    };
  }, [images, imageId, closePopup]);
