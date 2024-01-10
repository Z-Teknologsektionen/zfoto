import Link from "next/link";
import { FC } from "react";
import AlbumGrid from "~/components/albums/album-grid";
import { AlbumGridItem } from "~/components/albums/album-grid-item";
import SectionWrapper from "~/components/layout/SectionWrapper";
import { getLatestAlbums } from "~/utils/fetchAlbumData";

const RecommendedAlbums: FC<{ albumId: string }> = async ({ albumId }) => {
  const recommendedAlbums = await getLatestAlbums({
    count: 3,
    notIds: [albumId],
  });

  return (
    <SectionWrapper>
      <h1 className="text-2xl font-medium">Kika även in dessa albumen</h1>
      <AlbumGrid>
        {recommendedAlbums.map((recommendedAlbum) => (
          <AlbumGridItem key={recommendedAlbum.id} {...recommendedAlbum} />
        ))}
        <Link
          className="relative grid h-full w-full max-w-xs flex-grow items-center justify-center overflow-hidden rounded-lg border-2 bg-[#333333]/95 px-4 py-3 text-[#a7a7a7] shadow"
          href="/"
        >
          <h2 className="text-xl font-normal">Visa fler...</h2>
        </Link>
      </AlbumGrid>
    </SectionWrapper>
  );
};

export default RecommendedAlbums;
