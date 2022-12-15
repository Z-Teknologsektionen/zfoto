import type { Album, Image as ImageType } from "@prisma/client";
import Image from "next/image";
import type { FC } from "react";

export const ImageGridItem: FC<{
  id: string;
  filename: string;
  album: Album & { images: ImageType[] };
  onClick: () => void;
}> = ({ filename, album, onClick }) => {
  return (
    <div>
      <Image
        className={`
          max-h-52 object-contain object-center
          before:absolute before:inset-0 before:z-0 before:rounded-3xl before:bg-black/10 before:p-4 before:content-[''] 
        `}
        src={
          filename ? `http://holmstrom.ddns.net:8080/df/thumb/${filename}` : ""
        }
        alt={`${album.title}, ${album.description}`}
        quality={100}
        height={208}
        width={300}
        onClick={() => {
          onClick();
        }}
        unoptimized
      />
    </div>
  );
};
