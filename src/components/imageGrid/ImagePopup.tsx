import type { Album, Image as ImageType } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/router";
import type { FC } from "react";
import { useEffect } from "react";
import { ImageInformation } from "./ImageInformation";

const ImagePopup: FC<{
  prevImageId: string | undefined;
  nextImageId: string | undefined;
  album: (Album & { images: ImageType[] }) | undefined | null;
  image: ImageType | undefined | null;
}> = ({ prevImageId, nextImageId, album, image }) => {
  const hasActiveImage =
    image?.id !== "undefined" && typeof image?.id !== "undefined";
  const hasPrevImage = typeof prevImageId !== "undefined";
  const hasNextImage = typeof nextImageId !== "undefined";

  const router = useRouter();

  const nextImage = () => {
    if (!hasNextImage) {
      return;
    }
    router.push(`/test/${album?.id}?imageId=${nextImageId}`);
  };
  const prevImage = () => {
    if (!hasPrevImage) {
      return;
    }
    router.push(`/test/${album?.id}?imageId=${prevImageId}`);
  };
  function closeNav() {
    document.body.classList.remove("overflow-hidden");
    router.push(`/test/${album?.id}`);
  }

  useEffect(() => {
    const keydownListener = (event: KeyboardEvent): void => {
      if (event.key === "ArrowRight") {
        nextImage();
      } else if (event.key === "ArrowLeft") {
        prevImage();
      } else if (event.key === "Escape") {
        closeNav();
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
      className={`absolute inset-0 place-items-center bg-white/75  ${
        hasActiveImage ? "grid" : "hidden"
      }`}
    >
      <div
        className="absolute top-5 right-5 text-3xl"
        onClick={() => {
          closeNav();
        }}
      >
        {"x"}
      </div>
      <div className="mx-auto flex h-3/4 w-full max-w-7xl flex-row items-center justify-between gap-5">
        <button
          className="ml-5 text-5xl"
          disabled={!hasPrevImage}
          onClick={() => prevImage()}
        >
          {"<"}
        </button>
        <div className="flex h-full flex-grow flex-col">
          <div className="relative h-full max-h-screen min-h-[300px] flex-grow">
            <Image
              className="h-full object-contain object-center"
              src={image?.filename ? `/images/${image.filename}` : "/"}
              alt={`Bild från ${album?.tilte}, ${album?.description}`}
              fill
            />
          </div>
          <ImageInformation {...{ image, album, nextImageId }} />
        </div>
        <button
          className="mr-5 text-5xl"
          disabled={!hasNextImage}
          onClick={() => nextImage()}
        >
          {">"}
        </button>
      </div>
    </section>
  );
};

export default ImagePopup;
