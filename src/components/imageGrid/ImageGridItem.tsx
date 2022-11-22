import type { Album, Image as ImageType } from "@prisma/client";
import Image from "next/image";
import type { FC } from "react";

export const ImageGridItem: FC<{
  id: string;
  filename: string;
  album: Album & { images: ImageType[] };
  onClick: () => void;
}> = ({ id, filename, album, onClick }) => {
  return (
    <div
      className="relative h-[250px] w-full max-w-xs p-2"
      key={id}
      onClick={() => {
        onClick();
      }}
    >
      <Image
        className={`
          object-contain object-center
          before:absolute before:inset-0 before:z-0 before:rounded-3xl before:bg-black/10 before:p-4 before:content-[''] 
        `}
        src={filename ? `/images/${filename}` : ""}
        alt={`${album.title}, ${album.description}`}
        fill
        quality={90}
        sizes="300px"
      />
    </div>
  );
};
