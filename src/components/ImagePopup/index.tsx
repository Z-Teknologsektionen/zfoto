import type { FC } from "react";
import { useEffect, useMemo } from "react";
import type { AlbumType } from "../../utils/types";
import { CloseImagePopup } from "./CloseImagePopup";
import { ImagePopupInformation } from "./ImagePopupInformation";
import { PopupImageMain } from "./PopupImageMain";

const ImagePopup: FC<{
  album: AlbumType;
  closePopup: () => void;
  imageId: string;
  setImageId: (arg0: string) => void;
  showPopup: boolean;
}> = ({ album, closePopup, imageId, setImageId, showPopup }) => {
  const [nextImageId, prevImageId, activeImage] = useMemo(() => {
    return [
      album?.images.find((_, index) => {
        return album.images[index - 1]?.id === imageId;
      })?.id,
      album?.images.find((_, index) => {
        return album.images[index + 1]?.id === imageId;
      })?.id,
      album?.images.find((image) => {
        return image.id === imageId;
      }),
    ];
  }, [imageId, album.images]);

  const viewPrevImage = (): void => {
    if (!prevImageId) {
      return;
    }
    setImageId(prevImageId);
  };
  const viewNextImage = (): void => {
    if (!nextImageId) {
      return;
    }
    setImageId(nextImageId);
  };

  useEffect(() => {
    const keydownListener = (event: KeyboardEvent): void => {
      if (event.key === "ArrowRight") {
        viewNextImage();
      } else if (event.key === "ArrowLeft") {
        viewPrevImage();
      } else if (event.key === "Escape") {
        closePopup();
      }
    };
    window.addEventListener("keydown", keydownListener);
    return () => {
      window.removeEventListener("keydown", keydownListener);
    };
  });

  if (!activeImage) {
    return null;
  }
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
    <section
      className={`fixed inset-0 bg-white/90 ${showPopup ? "block" : "hidden"}`}
      onClick={() => closePopup()}
    >
      <div className="">
        <CloseImagePopup closePopup={closePopup} />

        <ImagePopupInformation
          key={activeImage.id}
          id={activeImage.id}
          photographer={activeImage.photographer}
        />

        <div className="absolute top-0 left-0 flex h-screen w-fit flex-col justify-center md:p-4">
          <button
            className="h-full cursor-pointer text-5xl disabled:opacity-25"
            disabled={!prevImageId}
            onClick={(e) => {
              e.stopPropagation();
              viewPrevImage();
            }}
            type="button"
          >
            {"<"}
          </button>
        </div>

        <PopupImageMain filename={activeImage.filename} />

        <div className="absolute top-0 right-0  flex h-screen w-fit flex-col justify-center text-left md:p-4">
          <button
            className="h-full cursor-pointer text-right text-5xl disabled:opacity-25"
            disabled={!nextImageId}
            onClick={(e) => {
              e.stopPropagation();
              viewNextImage();
            }}
            type="button"
          >
            {">"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ImagePopup;
