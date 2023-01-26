import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import { useEffect, useMemo } from "react";
import type { AlbumType } from "../../utils/types";

const ImagePopup: FC<{
  album: AlbumType;
  closePopup: () => void;
  imageId: string | undefined;
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

  /*   if (!activeImage || !imageId) {
    return null;
  } */

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
    <section
      className={`fixed inset-0 flex h-screen w-full flex-col items-center justify-between bg-white ${
        activeImage && showPopup
          ? "opacity-100"
          : "pointer-events-none opacity-0"
      } transition-all duration-1000`}
      onClick={() => closePopup()}
    >
      <div className="w-full">
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
        <p
          className="p-4 text-right text-5xl"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          &#10005;
        </p>
      </div>
      <div className="flex h-full w-full flex-row items-center justify-between">
        <button
          className="flex h-full items-center justify-start px-4 text-left text-8xl lg:pl-8"
          disabled={!prevImageId}
          onClick={(e) => {
            e.stopPropagation();
            viewPrevImage();
          }}
          type="button"
        >
          &#8249;
        </button>
        <div className="relative h-full w-full">
          <Image
            alt=""
            className="object-contain"
            onClick={(e) => {
              e.stopPropagation();
            }}
            src={
              activeImage?.filename
                ? `/images/lowres/${activeImage.filename}`
                : ""
            }
            fill
            priority
            unoptimized
          />
        </div>
        <button
          className="flex h-full items-center justify-end px-4 text-right text-8xl lg:pr-8"
          disabled={!nextImageId}
          onClick={(e) => {
            e.stopPropagation();
            viewNextImage();
          }}
          type="button"
        >
          &#8250;
        </button>
      </div>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
      <div
        className="flex flex-row gap-4 p-4 text-lg font-medium"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <p>Fotograf: {activeImage?.photographer}</p>
        <p>Filnamn: {activeImage?.filename}</p>
        <Link
          className="cursor-pointer underline"
          href={activeImage ? `/image/${activeImage?.id}` : ""}
        >
          Permanent länk
        </Link>
      </div>
    </section>
  );

  /* return (
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
    </section n>
  ); */
};

export default ImagePopup;
