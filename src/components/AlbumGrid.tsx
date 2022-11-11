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
    <section className="mx-auto grid max-w-7xl grid-cols-1 place-items-center gap-2 py-5 px-10 sm:grid-cols-2 md:grid-cols-3 md:py-10 lg:grid-cols-4 xl:grid-cols-5">
      {isLoading
        ? "Laddar..."
        : isError
        ? "Error..."
        : album?.images.map((image) => {
            return (
              <Link
                href={`/album/${albumId}/image/${image.id}`}
                className="aspect-square max-w-xs p-2 shadow"
                key={image.id}
              >
                {image.id}
              </Link>
            );
          })}
    </section>
  );
};
