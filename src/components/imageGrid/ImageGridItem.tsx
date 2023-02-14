import Image from "next/image";
import type { FC } from "react";
import type { AlbumType } from "../../utils/types";

export const ImageGridItem: FC<{
  album: AlbumType;
  filename: string;
  onClick: () => void;
}> = ({ filename, album, onClick }) => {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className="relative aspect-square h-full max-h-52 min-h-[150px] w-full"
      onClick={() => {
        onClick();
      }}
    >
      <Image
        alt={`${album.title}, ${album.description}`}
        className={`
          object-contain object-center
          before:absolute before:inset-0 before:z-0 before:rounded-3xl before:bg-black/10 before:p-4 before:content-[''] 
        `}
        src={filename ? `/images/thumb/${filename}` : ""}
        fill
        unoptimized
      />
      <div className="absolute inset-0" />
    </div>
  );
};
