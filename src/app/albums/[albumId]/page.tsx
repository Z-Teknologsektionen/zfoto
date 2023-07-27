import { Prisma } from "@prisma/client";
import { notFound } from "next/navigation";
import BackButton from "~/components/back-button";
import AlbumInfo from "~/components/imageGrid/AlbumInfo";
import SectionWrapper from "~/components/layout/SectionWrapper";
import { prisma } from "~/server/db/client";
import Client from "./client";

export const getRecommendedAlbums = async ({
  count,
  notIds,
}: {
  count: number;
  notIds: string[];
}) => {
  const albums = await prisma.album.findMany({
    take: count,
    where: {
      id: {
        notIn: notIds,
      },
      visible: {
        equals: true,
      },
      images: {
        some: {
          coverImage: true,
          visible: true,
        },
      },
    },
    select: {
      id: true,
      title: true,
      images: {
        orderBy: { date: "asc" },
        take: 1,
        select: {
          filename: true,
        },
        where: {
          coverImage: true,
          visible: true,
        },
      },
      date: true,
    },
    orderBy: {
      date: "desc",
    },
  });

  return albums.map(({ images, ...album }) => {
    return {
      ...album,
      coverImageFilename: images.at(0)?.filename ?? "",
    };
  });
};

export const getAlbumById = async (id: string) => {
  return prisma.album.findFirstOrThrow({
    where: {
      id: id,
    },
    select: {
      id: true,
      title: true,
      images: {
        where: {
          visible: {
            equals: true,
          },
        },
        orderBy: [{ date: "asc" }, { filename: "desc" }],
        select: {
          date: true,
          filename: true,
          photographer: true,
          id: true,
        },
      },
      date: true,
      _count: true,
    },
  });
};

export type Album = Prisma.PromiseReturnType<typeof getAlbumById>;
export type RecommendedAlbum = Prisma.PromiseReturnType<
  typeof getRecommendedAlbums
>[0];

const AlbumPage = async ({ params }: { params: { albumId: string } }) => {
  const albumId = params.albumId;

  const album = await getAlbumById(albumId).catch(() => {
    return notFound();
  });

  const recommendedAlbums = await getRecommendedAlbums({
    count: 3,
    notIds: [],
  });

  const photographers = [
    ...new Set(album?.images.map((item) => item.photographer)),
  ];

  return (
    <>
      <SectionWrapper className="flex flex-col gap-2">
        <BackButton />
        <AlbumInfo
          date={album.date}
          photographers={photographers}
          title={album.title}
        />
        <Client
          album={album}
          recommendedAlbums={recommendedAlbums}
          key={albumId}
        />
      </SectionWrapper>
    </>
  );
};

export default AlbumPage;
