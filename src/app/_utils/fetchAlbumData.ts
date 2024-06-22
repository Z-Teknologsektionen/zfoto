/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import type { Prisma } from "@prisma/client";
import { db } from "~/utils/db";

export const getLatestAlbums = async ({
  count,
  notIds,
  year,
}: {
  count?: number;
  notIds?: string[];
  year?: number;
}): Promise<
  {
    coverImageFilename: string;
    date: Date;
    id: string;
    title: string;
  }[]
> => {
  const albums = await db.album.findMany({
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
        lte: new Date(year ?? new Date().getFullYear(), 12).toISOString(),
        gte: new Date(year ?? 1970, 1).toISOString(),
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

  return albums.map(({ images, ...album }) => ({
    ...album,
    coverImageFilename: images.at(0)?.filename ?? "",
  }));
};

export const getAlbumById = async (id: string) => {
  const rawAlbum = await db.album.findFirstOrThrow({
    where: {
      id,
      images: {
        some: {
          visible: {
            equals: true,
          },
        },
      },
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
          coverImage: true,
        },
      },
      date: true,
      _count: true,
    },
  });

  let coverImageFilename = rawAlbum.images.find(
    (image) => image.coverImage,
  )?.filename;

  if (coverImageFilename === undefined)
    coverImageFilename = rawAlbum.images.at(0)?.filename ?? "";

  const photographers = [
    ...new Set(rawAlbum.images.map((item) => item.photographer)),
  ];

  return { ...rawAlbum, coverImageFilename, photographers };
};

export type PublicAlbums = Prisma.PromiseReturnType<typeof getLatestAlbums>;
export type PublicAlbum = Prisma.PromiseReturnType<typeof getAlbumById>;
