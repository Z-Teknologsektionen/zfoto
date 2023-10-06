import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import { PublicAlbums } from "~/utils/fetchAlbumData";
import { formatDateString } from "~/utils/formatDateAndTimeStrings";

type Album = PublicAlbums[0];

interface IAlbumGridItem extends Album {
  priorityLoadning?: boolean;
}

export const AlbumGridItem: FC<IAlbumGridItem> = ({
  id,
  title,
  coverImageFilename,
  priorityLoadning = false,
  date,
}) => {
  return (
    <Link
      className="relative grid h-[250px] w-full max-w-xs items-end overflow-hidden rounded-lg border-2 shadow"
      href={`/albums/${id}`}
    >
      <Image
        alt=""
        className={`
          h-full object-cover object-center 
          before:absolute before:inset-0 before:z-0 before:bg-black/50 before:content-[''] 
          after:absolute after:left-1/2 after:top-1/2 after:z-10 after:block after:w-5/6 after:-translate-x-1/2 after:-translate-y-1/2 after:truncate after:object-contain after:text-center after:text-xl after:text-white after:content-['Bild_saknas']
        `}
        priority={priorityLoadning}
        src={`/img/thumb/${coverImageFilename}`}
        fill
        unoptimized
      />
      <div className="absolute inset-0" />
      <div className="z-10 w-full bg-[#333333]/95 px-4 py-3 text-[#a7a7a7]">
        <p className="truncate text-center font-semibold">{title}</p>
        <p className="text-center text-sm font-medium">
          {formatDateString(date)}
        </p>
      </div>
    </Link>
  );
};
