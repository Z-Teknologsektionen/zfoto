"use server";

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import type { PrismaTypeToUpdateByIdData } from "@/types/prisma";
import type { Album } from "@prisma/client";
import { db } from "~/utils/db";
import {
  coverImageFromAlbumSelect,
  dateTimeFilterByActiveYear,
  imagesOrderBy,
} from "./helpers";

export const getLatestAlbums = async ({
  count,
  notIds,
  year,
}:
  | {
      count?: number;
      notIds?: string[];
      year?: number;
    }
  | undefined = {}) => {
  const albums = await db.album.findMany({
    take: count,
    where: {
      id: {
        notIn: notIds,
      },
      isVisible: {
        equals: true,
      },
      images: {
        some: {
          isCoverImage: true,
          isVisible: true,
        },
      },
      date: {
        lte: new Date(year ?? new Date().getFullYear(), 12),
        gte: new Date(year ?? 1970, 1),
      },
    },
    select: {
      id: true,
      title: true,
      images: coverImageFromAlbumSelect,
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

export const getAllAlbumsAsAdmin = async () => {
  const albums = await db.album.findMany({
    include: {
      _count: true,
      images: coverImageFromAlbumSelect,
    },
    orderBy: {
      date: "desc",
    },
  });

  return albums.map(({ images, _count, ...album }) => ({
    ...album,
    coverImageFilename: images.at(0)?.filename,
    count: _count.images,
  }));
};

export const getAlbumWithImagesById = async (id: string) => {
  const rawAlbum = await db.album.findFirstOrThrow({
    where: {
      id,
      images: {
        some: {
          isVisible: {
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
          isVisible: {
            equals: true,
          },
        },
        orderBy: imagesOrderBy,
        select: {
          date: true,
          filename: true,
          photographer: true,
          id: true,
          isCoverImage: true,
        },
      },
      date: true,
      _count: true,
    },
  });

  let coverImageFilename = rawAlbum.images.find(
    (image) => image.isCoverImage,
  )?.filename;

  if (coverImageFilename === undefined)
    coverImageFilename = rawAlbum.images.at(0)?.filename ?? "";

  const photographers = [
    ...new Set(rawAlbum.images.map((item) => item.photographer)),
  ];

  return { ...rawAlbum, coverImageFilename, photographers };
};

export const getAlbumWithImagesAsAdmin = async (id: string) => {
  const {
    images,
    _count: { images: numberOfImages },
    ...album
  } = await db.album.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      images: {
        orderBy: imagesOrderBy,
      },
      _count: true,
    },
  });

  return {
    numberOfImages,
    images: images.map((image) => ({
      albumTitle: album.title,
      ...image,
    })),
    ...album,
  };
};

export const setReceptionAlbumVisibility = async (isVisible: boolean) =>
  db.album.updateMany({
    where: {
      isReception: true,
    },
    data: {
      isVisible,
    },
  });

export const updateAlbumById = async (
  albumId: string,
  data: PrismaTypeToUpdateByIdData<Album>,
) =>
  db.album.update({
    where: {
      id: albumId,
    },
    data,
  });

export const updateManyAlbumsByIds = async (
  albumIds: string[],
  data: Omit<PrismaTypeToUpdateByIdData<Album>, "title">,
) =>
  db.album.updateMany({
    where: {
      id: {
        in: albumIds,
      },
    },
    data,
  });

export const deleteAlbumById = async (albumId: string) =>
  db.album.delete({
    where: {
      id: albumId,
    },
  });

export const getAlbumCountFromActiveYear = async (startYear: number) =>
  db.album.count({
    where: {
      date: dateTimeFilterByActiveYear(startYear),
    },
  });

export const getTotalAlbumCount = async () => db.album.count();
