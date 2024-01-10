import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense, cache } from "react";
import BackButton from "~/components/back-button";
import SectionWrapper from "~/components/layout/SectionWrapper";
import { getAlbumById } from "~/utils/fetchAlbumData";
import { getFullFilePath } from "~/utils/utils";
import AlbumInfo from "./components/album-info";
import Client from "./components/client";
import RecommendedAlbums from "./components/recomended-albums";

interface AlbumPageProps {
  params: { albumId: string };
}

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
  const album = await getAlbumById(albumId).catch(() => {
    return notFound();
  });

  return (
    <>
      <SectionWrapper className="flex flex-col gap-2">
        <BackButton />
        <AlbumInfo
          date={album.date}
          photographers={album.photographers}
          title={album.title}
        />
        <Client album={album} key={albumId} />
        <Suspense fallback={"Laddar rekomenderade album..."}>
          <RecommendedAlbums albumId={albumId} />
        </Suspense>
      </SectionWrapper>
    </>
  );
};

export default AlbumPage;
