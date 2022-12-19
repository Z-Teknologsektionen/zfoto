import Image from "next/image";
import type { FC } from "react";
import type { AlbumType } from "../../utils/types";

export const ImageGridItem: FC<{
  album: AlbumType;
  filename: string;
  onClick: () => void;
}> = ({ filename, album, onClick }) => {
  return (
    <div>
      <Image
        alt={`${album.title}, ${album.description}`}
        className={`
          max-h-52 object-contain object-center
          before:absolute before:inset-0 before:z-0 before:rounded-3xl before:bg-black/10 before:p-4 before:content-[''] 
        `}
        height={208}
        onClick={() => {
          onClick();
        }}
        quality={100}
        src={
          filename ? `http://holmstrom.ddns.net:8080/df/thumb/${filename}` : ""
        }
        width={300}
        /* unoptimized */
      />
    </div>
  );
};
