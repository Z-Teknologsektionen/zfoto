import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense, cache } from "react";
import { SectionWrapper } from "~/components/layout/section-wrapper";
import { getAlbumById } from "~/utils/fetchAlbumData";
import { getFullFilePath } from "~/utils/utils";
import { AlbumInfo } from "./_components/album-info";
import { ImageGridItem } from "./_components/image-grid-item";
import { ImagePopup } from "./_components/image-popup";
import {
  RecommendedAlbumsGrid,
  RecommendedAlbumsGridSkeleton,
} from "./_components/recomended-albums-grid";

type AlbumPageProps = {
  params: { albumId: string };
};

export const revalidate = 300;

const getAlbum = cache(getAlbumById);

export async function generateMetadata({
  params: { albumId },
}: AlbumPageProps): Promise<Metadata> {
  const album = await getAlbum(albumId);

  return {
    title: album.title,
    description: `Bilder från ${album.title}, ${album.date.toDateString()}`,
    openGraph: {
      images: [
        {
          url: getFullFilePath(album.coverImageFilename),
        },
      ],
      authors: album.photographers,
    },
  };
}

const AlbumPage = async ({ params: { albumId } }: AlbumPageProps) => {
  const album = await getAlbum(albumId).catch(() => {
    return notFound();
  });

  return (
    <>
      <SectionWrapper className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-5">
        <AlbumInfo
          date={album.date}
          photographers={album.photographers}
          title={album.title}
        />

        {album.images.map(({ id, filename }) => (
          <ImageGridItem key={id} id={id} album={album} filename={filename} />
        ))}
      </SectionWrapper>
      <SectionWrapper>
        <h1 className="text-2xl font-medium">Kika även in dessa albumen</h1>
        <Suspense fallback={<RecommendedAlbumsGridSkeleton />}>
          <RecommendedAlbumsGrid albumId={albumId} />
        </Suspense>
      </SectionWrapper>
      <ImagePopup album={album} />
    </>
  );
};

export default AlbumPage;
