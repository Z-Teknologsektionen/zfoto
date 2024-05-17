"use client";

import Image from "next/image";
import type { FC } from "react";
import { PublicAlbum } from "~/utils/fetchAlbumData";
import { getFullFilePath } from "~/utils/utils";

type ImageGridItemProps = {
  album: PublicAlbum;
  filename: string;
  priority?: boolean;
  id: string;
};

export const ImageGridItem: FC<ImageGridItemProps> = ({
  filename,
  album,
  priority,
  id,
}) => {
  return (
    <button
      className="relative aspect-square h-full max-h-52 min-h-[150px] w-full"
      type="button"
      onClick={() =>
        window.history.pushState(null, "", `/albums/${album.id}?imageId=${id}`)
      }
    >
      <Image
        alt={`Bild från "${album.title}"`}
        className="object-contain object-center"
        loading={priority ? "eager" : "lazy"}
        priority={priority}
        src={getFullFilePath(filename, "thumb")}
        fill
        unoptimized
      />
      <div className="absolute inset-0" />
    </button>
  );
};
