import Link from "next/link";
import type { FC } from "react";
import { AlbumGrid } from "~/components/albums/album-grid";
import {
  AlbumGridItem,
  AlbumGridItemSkeleton,
} from "~/components/albums/album-grid-item";
import { getLatestAlbums } from "~/utils/fetchAlbumData";

type RecommendedAlbumsProps = { albumId: string };

export const RecommendedAlbumsGrid: FC<RecommendedAlbumsProps> = async ({
  albumId,
}) => {
  const recommendedAlbums = await getLatestAlbums({
    count: 3,
    notIds: [albumId],
  });

  return (
    <AlbumGrid>
      {recommendedAlbums.map((recommendedAlbum) => (
        <AlbumGridItem key={recommendedAlbum.id} {...recommendedAlbum} />
      ))}
      <Link
        className="relative grid size-full max-w-xs grow items-center justify-center overflow-hidden rounded-lg border-2 bg-[#333333]/95 px-4 py-3 text-[#a7a7a7] shadow"
        href="/"
      >
        <h2 className="text-xl font-normal">Visa fler...</h2>
      </Link>
    </AlbumGrid>
  );
};

export const RecommendedAlbumsGridSkeleton: FC = () => (
  <AlbumGrid>
    {Array.from({ length: 4 }).map((_, idx) => (
      <AlbumGridItemSkeleton key={idx} />
    ))}
  </AlbumGrid>
);
