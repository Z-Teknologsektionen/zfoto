"use client";

import type { PublicAlbumWithImagesType } from "@/types/data-access";
import Image from "next/image";
import type { FC } from "react";
import { getFullFilePath } from "~/utils/utils";

type ImageGridItemProps = {
  album: PublicAlbumWithImagesType;
  filename: string;
  usePriorityLoading?: boolean;
  id: string;
};

export const ImageGridItem: FC<ImageGridItemProps> = ({
  filename,
  album,
  usePriorityLoading = false,
  id,
}) => (
  <button
    className="relative aspect-square size-full max-h-52 min-h-[150px]"
    type="button"
    onClick={() => {
      window.history.pushState(null, "", `/albums/${album.id}?imageId=${id}`);
    }}
  >
    <Image
      alt={`Bild från "${album.title}"`}
      className="object-contain object-center"
      loading={usePriorityLoading ? "eager" : "lazy"}
      priority={usePriorityLoading}
      src={getFullFilePath(filename, "thumb")}
      fill
      unoptimized
    />
    <div className="absolute inset-0" />
  </button>
);
