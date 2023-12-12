import Image from "next/image";
import type { FC } from "react";
import { PublicAlbum } from "~/utils/fetchAlbumData";
import { getFullFilePath } from "~/utils/utils";

export const ImageGridItem: FC<{
  album: PublicAlbum;
  filename: string;
  onClick: () => void;
  priority?: boolean;
}> = ({ filename, album, onClick, priority }) => {
  return (
    <button
      className="relative aspect-square h-full max-h-52 min-h-[150px] w-full"
      onClick={() => {
        onClick();
      }}
      type="button"
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
