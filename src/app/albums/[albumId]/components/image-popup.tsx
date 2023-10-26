import { ArrowLeft, ArrowRight } from "lucide-react";
import NextImage from "next/image";
import { useRouter } from "next/navigation";
import type { FC } from "react";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { Button } from "~/components/ui/button";
import { PublicAlbum } from "~/utils/fetchAlbumData";
import ImagePopupFooter from "./image-popup-footer";
import ImagePopupHeader from "./image-popup-header";

interface ImagePopupTypes {
  album: PublicAlbum;
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
  const { back } = useRouter();
  const activeImage = useMemo(() => {
    return album.images.at(imageIndex);
  }, [album.images, imageIndex]);

  const nextImage = useMemo(() => {
    return album.images.at(imageIndex + 1);
  }, [album.images, imageIndex]);

  const secondNextImage = useMemo(() => {
    return album.images.at(imageIndex + 2);
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
        if (showPopup) {
          closePopup();
        } else {
          back();
        }
      }
    };

    window.addEventListener("keydown", keydownListener);

    return () => {
      window.removeEventListener("keydown", keydownListener);
    };
  });

  useEffect(() => {
    if (nextImage) {
      // eslint-disable-next-line no-new
      new Image().src = `/img/lowres/${nextImage.filename}`;
    }
  }, [nextImage]);

  useEffect(() => {
    if (secondNextImage) {
      // eslint-disable-next-line no-new
      new Image().src = `/img/lowres/${secondNextImage.filename}`;
    }
  }, [secondNextImage]);

  if (!activeImage) {
    return null;
  }

  return (
    <section className="fixed inset-0 z-50 !my-0 flex flex-col gap-4 bg-white/75">
      <ImagePopupHeader
        key={activeImage.filename}
        photographer={activeImage.photographer}
        filename={activeImage.filename}
        closePopup={closePopup}
      />
      <main className="flex flex-grow flex-row gap-4 px-4">
        <div className="flex place-items-center">
          <Button
            className="group p-2"
            disabled={!hasPrevImage}
            onClick={() => {
              viewPrevImage();
            }}
            size="icon"
            variant="ghost"
          >
            <ArrowLeft className="group-disabled:opacity-50" size={24} />
          </Button>
        </div>
        <div className="relative flex-grow">
          <NextImage
            alt={`Bild från ${album.title}, Foto: ${activeImage.photographer}`}
            blurDataURL={`/img/thumb/${activeImage.filename}`}
            placeholder="blur"
            src={`/img/lowres/${activeImage.filename}`}
            style={{ objectFit: "contain", objectPosition: "center" }}
            fill
            priority
            unoptimized
          />
        </div>
        <div className="flex place-items-center">
          <Button
            className="group p-2"
            disabled={!hasNextImage}
            onClick={() => {
              viewNextImage();
            }}
            size="icon"
            variant="ghost"
          >
            <ArrowRight className="group-disabled:opacity-50" size={24} />
          </Button>
        </div>
      </main>
      <ImagePopupFooter {...activeImage} />
    </section>
  );
};
export default ImagePopup;
