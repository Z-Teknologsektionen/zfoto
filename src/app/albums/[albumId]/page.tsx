import {
  getAlbumWithImagesById,
  getLatestAlbums,
} from "@/server/data-access/albums";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { FC } from "react";
import { Fragment, Suspense } from "react";
import { SectionWrapper } from "~/components/layout/section-wrapper";
import { getFullFilePath } from "~/utils/utils";
import { AlbumInfo } from "./_components/album-info";
import { ImageGridItem } from "./_components/image-grid-item";
import { ImagePopup } from "./_components/image-popup";
import {
  RecommendedAlbumsGrid,
  RecommendedAlbumsGridSkeleton,
} from "./_components/recommended-albums-grid";

type AlbumPageProps = {
  params: { albumId: string };
};

export const revalidate = 300;
export const dynamicParams = true;

export const generateStaticParams = async (): Promise<
  AlbumPageProps["params"][]
> => {
  const albums = await getLatestAlbums({ count: 10 });

  return albums.map((album) => ({
    albumId: album.id,
  }));
};

export const generateMetadata = async ({
  params: { albumId },
}: AlbumPageProps): Promise<Metadata> => {
  const album = await getAlbumWithImagesById(albumId);

  return {
    title: album.title,
    description: `Bilder från ${album.title}, ${new Date(album.date).toDateString()}`,
    openGraph: {
      images: [
        {
          url: getFullFilePath(album.coverImageFilename),
        },
      ],
      authors: album.photographers,
    },
  };
};

const AlbumPage: FC<AlbumPageProps> = async ({ params: { albumId } }) => {
  const album = await getAlbumWithImagesById(albumId).catch(() => notFound());

  return (
    <Fragment>
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
    </Fragment>
  );
};

export default AlbumPage;
