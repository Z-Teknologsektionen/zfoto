import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import { trpc } from "../utils/trpc";

export const AlbumGrid: FC<{ albumId: string }> = ({ albumId }) => {
  const {
    data: album,
    isLoading,
    isError,
  } = trpc.album.getOne.useQuery(
    {
      albumId: albumId,
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  return (
    <section className="mx-auto grid max-w-7xl grid-cols-1 place-items-center gap-1 py-5 px-10 sm:grid-cols-2 md:grid-cols-3 md:py-10 lg:grid-cols-4 xl:grid-cols-5">
      {isLoading
        ? "Laddar..."
        : isError
        ? "Error..."
        : album?.images.map(({ id, filename }) => {
            return (
              <Link
                href={`/album/${albumId}/image/${id}`}
                className="relative aspect-[5/4] h-full w-full max-w-xs overflow-hidden p-2"
                key={id}
              >
                <Image
                  className={`rounded-xl object-contain object-center
                      before:absolute before:inset-0 before:z-0 before:rounded-3xl before:bg-black/10 before:p-4 before:content-[''] 
                  `}
                  src={filename ? `/images/${filename}` : ""}
                  alt={`${album.tilte}, ${album.description}`}
                  fill
                />
              </Link>
            );
          })}
    </section>
  );
};
