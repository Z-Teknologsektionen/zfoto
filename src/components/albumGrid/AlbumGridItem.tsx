import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";

export const AlbumGridItem: FC<{
  id: string;
  title: string;
  filename: string;
}> = ({ id, title, filename }) => {
  return (
    <Link
      href={`/album/${id}`}
      className="relative grid aspect-[5/4] h-full w-full max-w-xs place-items-center overflow-hidden rounded-3xl"
    >
      <Image
        className={`
          object-contain object-center
          before:absolute before:inset-0 before:z-0 before:rounded-3xl before:bg-black/10 before:content-[''] 
          after:absolute after:top-1/2 after:left-1/2 after:z-10 after:block after:-translate-y-1/2 after:-translate-x-1/2 after:truncate after:object-contain after:text-xl after:text-white after:content-[attr(alt)]
        `}
        src={filename ? `/images/${filename}` : ""}
        alt={title}
        fill
        sizes="(min-width: 768px) 50vw,
              (min-width: 1024px) 33vw,
              100vh"
      />
      <div className="z-10 grid h-full w-full place-items-center text-white hover:bg-black/50 [&:hover>p]:block">
        <p className="hidden truncate text-xl">{title}</p>
      </div>
    </Link>
  );
};
