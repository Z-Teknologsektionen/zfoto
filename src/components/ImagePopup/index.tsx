import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { toast } from "react-hot-toast";
import { MdOutlineClose, MdOutlineFileDownload } from "react-icons/md";
import type { RouterOutputs } from "~/utils/trpc";

interface ImagePopupTypes {
  album: RouterOutputs["album"]["getOne"];
  closePopup: () => void;
  decrementImageIndex: () => void;
  imageIndex: number;
  incrementImageIndex: () => void;
  showPopup: boolean;
}

const ImagePopup: FC<ImagePopupTypes> = ({
  album,
  closePopup,
  showPopup,
  imageIndex,
  decrementImageIndex,
  incrementImageIndex,
}) => {
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

  const canCallUpdate = useCallback((): boolean => {
    if (Date.now() - lastCallTime.current >= minDelay) {
      lastCallTime.current = Date.now();
      return true;
    }
    return false;
  }, [minDelay]);

  const viewPrevImage = useCallback((): void => {
    if (!hasPrevImage || !canCallUpdate()) {
      return;
    }
    decrementImageIndex();
  }, [canCallUpdate, decrementImageIndex, hasPrevImage]);

  const viewNextImage = useCallback((): void => {
    if (!hasNextImage || !canCallUpdate()) {
      return;
    }
    incrementImageIndex();
  }, [canCallUpdate, incrementImageIndex, hasNextImage]);

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
      className={`fixed inset-0 z-20 flex h-full w-full flex-col items-center justify-between bg-white ${
        showPopup ? "opacity-100" : "pointer-events-none opacity-0"
      } transition-opacity duration-1000`}
    >
      <div className="flex w-full justify-end gap-4 pt-2 pr-2 text-right md:pr-4 md:pt-4">
        <a
          className=""
          href={`/images/lowres/${activeImage.filename}`}
          onClick={() => {
            toast.success("Laddar ner bild\nGlöm inte följa vår policy!", {
              duration: 2000,
            });
          }}
          type="button"
          download
        >
          <MdOutlineFileDownload className="h-8 w-8 lg:h-10 lg:w-10" />
        </a>
        <button
          className="text-right font-black leading-none"
          onClick={() => {
            closePopup();
          }}
          type="button"
        >
          <MdOutlineClose className="h-8 w-8 lg:h-10 lg:w-10" />
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
