import type { PublicAlbumWithImagesType } from "@/types/data-access";
import { useMemo } from "react";

type ImageType = PublicAlbumWithImagesType["images"][0];

type UseActiveImageDetailsProps = {
  images: ImageType[];
  imageId: string | null | undefined;
  closePopup: () => void;
};

export const useActiveImageDetails = ({
  images,
  imageId,
  closePopup,
}: UseActiveImageDetailsProps): {
  activeImage?: ImageType;
  prevImageId?: string;
  nextImageId?: string;
} =>
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
