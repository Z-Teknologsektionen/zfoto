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
  const [nextImageId, prevImageId] = useMemo(() => {
    let nextImageIdReturn = null;
    let prevImageIdReturn = null;
    if (album && album.images && imageId) {
      const index = album.images.findIndex((image) => image.id === imageId);
      nextImageIdReturn = album.images[index + 1]?.id || null;
      prevImageIdReturn = album.images[index - 1]?.id || null;
    }
    return [nextImageIdReturn, prevImageIdReturn];
  }, [album, imageId]);

  const activeImage = useMemo(() => {
    if (album && album.images && imageId) {
      return album.images.find((image) => image.id === imageId) || null;
    }
    return null;
  }, [album, imageId]);

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

  return (
    <section
      className={`fixed inset-0 flex h-full w-full flex-col items-center justify-between bg-white ${
        activeImage && showPopup
          ? "opacity-100"
          : "pointer-events-none opacity-0"
      } transition-opacity duration-1000`}
    >
      <div className="flex w-full justify-end">
        <button
          className="pt-2 pr-2 text-right text-3xl md:p-4 md:text-5xl"
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
          disabled={!prevImageId}
          onClick={() => {
            viewPrevImage();
          }}
          type="button"
        >
          &#8249;
        </button>
        <div className="relative h-full flex-grow">
          {activeImage?.filename && (
            <>
              <Image
                alt=""
                className="object-contain"
                src={`/images/thumb/${activeImage.filename}`}
                fill
                unoptimized
              />
              <Image
                alt=""
                className="object-contain"
                src={`/images/lowres/${activeImage.filename}`}
                fill
                unoptimized
              />
            </>
          )}
        </div>
        <button
          className="flex h-full items-center justify-end px-4 text-right text-5xl md:text-8xl lg:pr-8"
          disabled={!nextImageId}
          onClick={() => {
            viewNextImage();
          }}
          type="button"
        >
          &#8250;
        </button>
      </div>
      <div className="flex flex-col gap-x-4 gap-y-1 p-4 text-center text-xs font-medium md:flex-row lg:text-lg">
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
};
export default ImagePopup;
