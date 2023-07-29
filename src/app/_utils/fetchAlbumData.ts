import { Prisma } from "@prisma/client";
import { prisma } from "~/_utils/db";

export const getLatestAlbums = async ({
  count,
  notIds,
  year,
}: {
  count?: number;
  notIds?: string[];
  year?: number;
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
      date: {
        lte: new Date(year || new Date().getFullYear(), 12).toISOString(),
        gte: new Date(year || 1970, 1).toISOString(),
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

export type PublicAlbums = Prisma.PromiseReturnType<typeof getLatestAlbums>;
export type PublicAlbum = Prisma.PromiseReturnType<typeof getAlbumById>;
