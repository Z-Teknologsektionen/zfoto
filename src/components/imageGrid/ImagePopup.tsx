import Image from "next/image";
import type { FC } from "react";
import { useEffect } from "react";
import type { AlbumType } from "../../utils/types";
import { ImageInformation } from "./ImageInformation";

type ImageType = {
  filename: string;
  id: string;
  photographer: string;
};

const ImagePopup: FC<{
  album: AlbumType;
  closePopup: () => void;
  image: ImageType;
  nextImage: ImageType | undefined;
  nextImageFunc: () => void;
  prevImage: ImageType | undefined;
  prevImageFunc: () => void;
  showPopup: boolean;
}> = ({
  prevImage,
  nextImage,
  album,
  image,
  showPopup,
  nextImageFunc,
  prevImageFunc,
  closePopup,
}) => {
  useEffect(() => {
    const keydownListener = (event: KeyboardEvent): void => {
      if (event.key === "ArrowRight") {
        nextImageFunc();
      } else if (event.key === "ArrowLeft") {
        prevImageFunc();
      } else if (event.key === "Escape") {
        closePopup();
      }
    };
    window.addEventListener("keydown", keydownListener);
    return () => {
      window.removeEventListener("keydown", keydownListener);
    };
  });

  if (!image) {
    return null;
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
    <section
      className={`fixed inset-0 place-items-center bg-white/90  ${
        showPopup ? "grid" : "hidden"
      }`}
      onClick={() => closePopup()}
    >
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
      <div
        className="grid max-h-screen w-full place-items-center"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button
          className="fixed top-10 right-10 hidden cursor-pointer text-3xl font-semibold md:right-14 lg:block"
          onClick={() => {
            closePopup();
          }}
          type="button"
        >
          x
        </button>
        <div className="mx-auto flex h-full w-full max-w-7xl flex-row items-center justify-between gap-2">
          <button
            className="h-full cursor-pointer pl-2 text-5xl disabled:opacity-50"
            disabled={!prevImage?.id}
            onClick={() => prevImageFunc()}
            type="button"
          >
            {"<"}
          </button>
          <div className="flex h-full flex-grow flex-col justify-center md:flex-row md:gap-4">
            <div className="relative max-h-screen min-h-[275px] w-full md:h-full md:w-1/2 lg:min-h-[400px] lg:w-2/3">
              <Image
                alt={`Bild från ${album.title}, ${album.description}`}
                className="h-full object-contain object-bottom"
                placeholder="empty"
                quality={75}
                sizes="1080px"
                src={
                  image?.filename
                    ? `http://holmstrom.ddns.net:8080/df/lowres/${image.filename}`
                    : ""
                }
                fill
                priority
                unoptimized
              />
            </div>
            <ImageInformation id={image.id} photographer={image.photographer} />
          </div>
          <button
            className="h-full cursor-pointer pr-2 text-5xl disabled:opacity-50"
            disabled={!nextImage?.id}
            onClick={() => nextImageFunc()}
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
