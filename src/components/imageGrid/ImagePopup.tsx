import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import { useEffect, useMemo } from "react";

import type { AlbumType } from "../../utils/types";

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
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
      <div
        className=""
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="absolute left-0 top-0 z-10 flex w-full justify-end bg-white/95 p-2 md:p-6">
          <button
            className="cursor-pointer text-4xl font-semibold leading-none md:right-14"
            onClick={() => {
              closePopup();
            }}
            type="button"
          >
            x
          </button>
        </div>

        <div className="absolute bottom-0 left-0 z-10 flex w-full flex-row justify-center gap-2 p-1 text-lg font-medium md:p-4">
          <Link className="" href={`/image/${activeImage.id}`}>
            Permanent länk
          </Link>
          <p>
            Fotograf:
            {` ${activeImage.photographer}`}
          </p>
        </div>

        <div className="absolute top-0 left-0 flex h-screen w-fit flex-col justify-center p-1 md:p-4">
          <button
            className="h-full cursor-pointer pr-2 text-5xl disabled:opacity-50"
            disabled={!prevImageId}
            onClick={() => viewPrevImage()}
            type="button"
          >
            {"<"}
          </button>
        </div>

        <div className="absolute inset-0 m-12 flex items-center justify-center md:m-20">
          <div className="">
            <Image
              alt=""
              className="object-contain object-center"
              src={
                activeImage.filename
                  ? `/images/lowres/${activeImage.filename}`
                  : ""
              }
              fill
              unoptimized
            />
          </div>
        </div>

        <div className="absolute top-0 right-0 flex h-screen w-fit flex-col justify-center p-1 md:p-4">
          <button
            className="h-full cursor-pointer pr-2 text-5xl disabled:opacity-50"
            disabled={!nextImageId}
            onClick={() => viewNextImage()}
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
