import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";

export const AlbumGridItem: FC<{
  date: Date;
  filename: string;
  id: string;
  priorityLoadning?: boolean;
  title: string;
}> = ({ id, title, filename, priorityLoadning = false, date }) => {
  return (
    <Link
      className="relative grid h-[250px] w-full max-w-xs items-end overflow-hidden"
      href={`/album/${id}`}
    >
      <Image
        alt={title}
        className={`
          object-cover object-center
          before:absolute before:inset-0 before:z-0 before:bg-black/10 before:content-[''] 
          after:absolute after:top-1/2 after:left-1/2 after:z-10 after:block after:-translate-y-1/2 after:-translate-x-1/2 after:truncate after:object-contain after:text-xl after:text-white after:content-[attr(alt)]
        `}
        priority={priorityLoadning}
        quality={100}
        sizes="400px"
        src={
          filename ? `http://holmstrom.ddns.net:8080/df/thumb/${filename}` : ""
        }
        fill
        /* unoptimized */
      />
      <div className="z-10 w-full bg-[#333333]/95 py-3 px-4 text-[#a7a7a7]">
        <p className="truncate text-center font-semibold">{title}</p>
        <p className="text-center text-sm font-medium">
          {new Date(date).toLocaleDateString()}
        </p>
      </div>
    </Link>
  );
};
