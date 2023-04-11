import Image from "next/image";
import Link from "next/link";
import type { Dispatch, FC, SetStateAction } from "react";
import { useEffect, useMemo, useRef } from "react";
import type { AlbumType } from "../../utils/types";

const ImagePopup: FC<{
  album: AlbumType;
  closePopup: () => void;
  imageIndex: number;
  setImageIndex: Dispatch<SetStateAction<number>>;
  showPopup: boolean;
}> = ({ album, closePopup, showPopup, imageIndex, setImageIndex }) => {
  const activeImage = useMemo(() => {
    return album.images.at(imageIndex);
  }, [album.images, imageIndex]);

  const nextImage = useMemo(() => {
    return album.images.at(imageIndex + 1);
  }, [album.images, imageIndex]);

  const hasPrevImage = useMemo(() => {
    return imageIndex > 0;
  }, [imageIndex]);

  const hasNextImage = useMemo(() => {
    return imageIndex < album.images.length - 1;
  }, [imageIndex, album.images.length]);

  const lastCallTime = useRef(0);
  const minDelay = 1000 / 4;

  const canCallUpdate = (): boolean => {
    if (Date.now() - lastCallTime.current >= minDelay) {
      lastCallTime.current = Date.now();
      return true;
    }
    return false;
  };

  const viewPrevImage = (): void => {
    if (!hasPrevImage || !canCallUpdate()) {
      return;
    }
    setImageIndex((prev) => prev - 1);
  };

  const viewNextImage = (): void => {
    if (!hasNextImage || !canCallUpdate()) {
      return;
    }
    setImageIndex((prev) => prev + 1);
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
    <section
      className={`fixed inset-0 flex h-full w-full flex-col items-center justify-between bg-white ${
        showPopup ? "opacity-100" : "pointer-events-none opacity-0"
      } transition-opacity duration-1000`}
    >
      <div className="flex w-full justify-end gap-4 pt-2 pr-2 text-right md:pr-4">
        <a
          className="h-8 w-8 lg:h-12 lg:w-12"
          href={`/images/lowres/${activeImage.filename}`}
          type="button"
          download
        >
          <svg
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g strokeWidth="0" />
            <g strokeLinecap="round" strokeLinejoin="round" />
            <g>
              <path
                d="M12 3a1 1 0 0 1 1 1v9.586l2.293-2.293a1 1 0 0 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 1 1 1.414-1.414L11 13.586V4a1 1 0 0 1 1-1Z"
                fill="#000000"
              />
              <path
                d="M6 17a1 1 0 1 0-2 0v.6C4 19.482 5.518 21 7.4 21h9.2c1.882 0 3.4-1.518 3.4-3.4V17a1 1 0 1 0-2 0v.6c0 .778-.622 1.4-1.4 1.4H7.4c-.778 0-1.4-.622-1.4-1.4V17Z"
                fill="#000000"
              />
            </g>
          </svg>
        </a>
        <button
          className="text-right text-3xl font-black leading-none lg:text-5xl"
          onClick={() => {
            closePopup();
          }}
          type="button"
        >
          &#10005;
        </button>
      </div>
      <div className="flex h-full w-full flex-grow flex-row items-center justify-between">
        <button
          className="flex h-full items-center justify-start px-4 text-left text-5xl md:text-8xl lg:pl-8"
          disabled={!hasPrevImage}
          onClick={() => {
            viewPrevImage();
          }}
          type="button"
        >
          &#8249;
        </button>
        <div className="relative h-full flex-grow">
          <>
            <Image
              alt="Full size image of "
              className="object-contain"
              src={`/images/lowres/${activeImage.filename}`}
              fill
              priority
              unoptimized
            />
            <Image
              alt="Used for preloading next images"
              className="invisible"
              src={nextImage ? `/images/lowres/${nextImage.filename}` : ""}
              fill
              priority
              unoptimized
            />
          </>
        </div>
        <button
          className="flex h-full items-center justify-end px-4 text-right text-5xl md:text-8xl lg:pr-8"
          disabled={!hasNextImage}
          onClick={() => {
            viewNextImage();
          }}
          type="button"
        >
          &#8250;
        </button>
      </div>
      <div className="flex flex-col gap-x-4 gap-y-1 p-4 text-center text-xs font-medium md:flex-row lg:text-lg">
        <p>Fotograf: {activeImage.photographer}</p>
        <p>Filnamn: {activeImage.filename}</p>
        <Link
          className="cursor-pointer underline"
          href={`/image/${activeImage.id}`}
        >
          Permanent länk
        </Link>
      </div>
    </section>
  );
};
export default ImagePopup;
