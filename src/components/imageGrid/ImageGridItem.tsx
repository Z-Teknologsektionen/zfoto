import Image from "next/image";
import type { FC } from "react";
import type { AlbumType } from "../../utils/types";

export const ImageGridItem: FC<{
  album: AlbumType;
  filename: string;
  onClick: () => void;
  priority?: boolean;
}> = ({ filename, album, onClick, priority }) => {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className="relative aspect-square h-full max-h-52 min-h-[150px] w-full"
      onClick={() => {
        onClick();
      }}
    >
      <>
        <Image
          alt={`Bild från "${album.title}"`}
          className="object-contain object-center"
          priority={priority}
          src={`/images/thumb/${filename}`}
          fill
          unoptimized
        />
      </>
      <div className="absolute inset-0" />
    </div>
  );
};
