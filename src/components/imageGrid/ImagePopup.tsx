import type { Album, Image as ImageType } from "@prisma/client";
import Image from "next/image";
import type { FC } from "react";
import { useEffect } from "react";
import { ImageInformation } from "./ImageInformation";

const ImagePopup: FC<{
  prevImage: ImageType | undefined;
  nextImage: ImageType | undefined;
  album: (Album & { images: ImageType[] }) | undefined | null;
  image: ImageType | undefined | null;
  showPopup: boolean;
  nextImageFunc: () => void;
  prevImageFunc: () => void;
  closePopup: () => void;
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
    return <div></div>;
  }

  return (
    <section
      className={`fixed inset-0 place-items-center bg-white/90  ${
        showPopup ? "grid" : "hidden"
      }`}
      onClick={() => closePopup()}
    >
      <div
        className="grid max-h-screen w-full place-items-center"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div
          className="fixed top-10 right-10 hidden cursor-pointer text-3xl font-semibold md:right-14 lg:block"
          onClick={() => {
            closePopup();
          }}
        >
          {"x"}
        </div>
        <div className="mx-auto flex h-full w-full max-w-7xl flex-row items-center justify-between gap-2">
          <button
            className="h-full cursor-pointer pl-2 text-5xl disabled:opacity-50"
            disabled={!prevImage?.id}
            onClick={() => prevImageFunc()}
          >
            {"<"}
          </button>
          <div className="flex h-full flex-grow flex-col justify-center md:flex-row md:gap-4">
            <div className="relative max-h-screen min-h-[275px] w-full md:h-full md:w-1/2 lg:min-h-[400px] lg:w-2/3">
              <Image
                className="h-full object-contain object-bottom"
                src={
                  image.filename
                    ? `http://holmstrom.ddns.net:8080/df/lowres/${image.filename}`
                    : ""
                }
                alt={`Bild från ${album?.title}, ${album?.description}`}
                fill
                priority
                sizes="1080px"
                quality={75}
                placeholder="empty"
                blurDataURL={
                  image.filename
                    ? `http://holmstrom.ddns.net:8080/df/thumb/${image.filename}`
                    : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII="
                }
                unoptimized
              />
            </div>
            <ImageInformation {...{ image, album }} />
          </div>
          <button
            className="h-full cursor-pointer pr-2 text-5xl disabled:opacity-50"
            disabled={!nextImage?.id}
            onClick={() => nextImageFunc()}
          >
            {">"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ImagePopup;
