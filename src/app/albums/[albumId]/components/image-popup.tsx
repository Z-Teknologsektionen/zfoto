"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import NextImage from "next/image";
import { useSearchParams } from "next/navigation";
import type { FC } from "react";
import { Button, buttonVariants } from "~/components/ui/button";
import { useBodyOverflowToggle } from "~/hooks/useBodyOverflowToggle";
import { useRateLimitPerSecond } from "~/hooks/useRateLimitPerSecond";
import { useWindowKeydownListener } from "~/hooks/useWindowKeydownListener";
import { PublicAlbum } from "~/utils/fetchAlbumData";
import { cn, getFullFilePath } from "~/utils/utils";
import { useActiveImageDetails } from "../hooks/useActiveImageDetails";
import { handleUpdateAlbumUrl } from "../utils/updateUrl";
import { ImagePopupFooter } from "./image-popup-footer";
import { ImagePopupHeader } from "./image-popup-header";

type ImagePopupProps = {
  album: PublicAlbum;
};

export const ImagePopup: FC<ImagePopupProps> = ({ album }) => {
  const searchParams = useSearchParams();
  const currentImageId = searchParams?.get("imageId");

  const { rateLimitedFunction } = useRateLimitPerSecond(5);

  const handleUpdateAlbumUrlWithRateLimit = (
    newImageId: string | undefined,
  ) => {
    rateLimitedFunction(() =>
      handleUpdateAlbumUrl({
        albumId: album.id,
        imageId: newImageId,
        isOpen: !!currentImageId,
      }),
    );
  };

  const { activeImage, nextImageId, prevImageId } = useActiveImageDetails({
    images: album.images,
    imageId: currentImageId,
    closePopup: () => handleUpdateAlbumUrlWithRateLimit(undefined),
  });

  useBodyOverflowToggle(!!currentImageId);

  useWindowKeydownListener((event: KeyboardEvent): void => {
    if (event.key === "ArrowRight" && nextImageId)
      handleUpdateAlbumUrlWithRateLimit(nextImageId);
    if (event.key === "ArrowLeft" && prevImageId)
      handleUpdateAlbumUrlWithRateLimit(prevImageId);
    if (event.key === "Escape") handleUpdateAlbumUrlWithRateLimit(undefined);
  });

  if (!activeImage) return null;

  return (
    <section className="fixed inset-0 z-50 !my-0 flex flex-col gap-4 bg-white/75">
      <ImagePopupHeader
        photographer={activeImage.photographer}
        filename={activeImage.filename}
        closePopup={() => handleUpdateAlbumUrlWithRateLimit(undefined)}
      />
      <main className="flex flex-grow flex-row gap-4 px-4">
        <div className="flex place-items-center">
          <Button
            className={cn(
              buttonVariants({ size: "icon", variant: "ghost" }),
              "group p-2",
            )}
            onClick={() => handleUpdateAlbumUrlWithRateLimit(prevImageId)}
            disabled={prevImageId === undefined}
            size="icon"
            variant="ghost"
          >
            <ArrowLeft className="group-disabled:opacity-50" size={24} />
          </Button>
        </div>
        <div className="relative flex-grow">
          <NextImage
            alt={`Bild från ${album.title}, Foto: ${activeImage.photographer}`}
            blurDataURL={getFullFilePath(activeImage.filename, "thumb")}
            placeholder="blur"
            src={getFullFilePath(activeImage.filename, "lowres")}
            style={{ objectFit: "contain", objectPosition: "center" }}
            fill
            priority
            unoptimized
          />
        </div>
        <div className="flex place-items-center">
          <Button
            className="group p-2"
            disabled={nextImageId === undefined}
            size="icon"
            variant="ghost"
            onClick={() => handleUpdateAlbumUrlWithRateLimit(nextImageId)}
          >
            <ArrowRight className="group-disabled:opacity-50" size={24} />
          </Button>
        </div>
      </main>
      <ImagePopupFooter {...activeImage} />
    </section>
  );
};
