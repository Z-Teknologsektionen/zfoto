"use server";

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import {
  CACHE_TAGS,
  dbCache,
  getGlobalTag,
  getIdTag,
  revalidateDbCache,
} from "@/lib/cache";
import type { PrismaTypeToUpdateByIdData } from "@/types/prisma";
import type { Album } from "@prisma/client";
import { db } from "~/utils/db";
import {
  coverImageFromAlbumSelect,
  dateTimeFilterByActiveYear,
  imagesOrderBy,
} from "./helpers";

type GetLatestAlbumsProps = {
  count?: number;
  notIds?: string[];
  year?: number;
};

const getLatestAlbumsInternal = async ({
  count,
  notIds,
  year,
}: GetLatestAlbumsProps) => {
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
        lte: new Date(year ?? new Date().getFullYear(), 11),
        gte: new Date(year ?? 1970, 0),
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

const getAllAlbumsAsAdminInternal = async () => {
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

const getAlbumWithImagesByIdInternal = async (id: string) => {
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

const getAlbumWithImagesAsAdminInternal = async (id: string) => {
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

const getAlbumCountFromActiveYearInternal = async (startYear: number) =>
  db.album.count({
    where: {
      date: dateTimeFilterByActiveYear(startYear),
    },
  });

const getTotalAlbumCountInternal = async () => db.album.count();

export const setReceptionAlbumVisibility = async (isVisible: boolean) => {
  const { count } = await db.album.updateMany({
    where: {
      isReception: true,
    },
    data: {
      isVisible,
    },
  });

  const updatedAlbumIds = (
    await db.album.findMany({
      where: { isReception: true },
      select: { id: true },
    })
  ).map(({ id }) => id);

  revalidateDbCache({ tag: CACHE_TAGS.albums, ids: updatedAlbumIds });

  return count;
};

type UpsertAlbumProps = {
  images: {
    filename: string;
    date: Date | string;
    isVisible: boolean;
    isCoverImage: boolean;
    photographer: string;
  }[];
  title: string;
  date: Date;
  isVisible: boolean;
  isReception: boolean;
};

export const upsertAlbum = async (body: UpsertAlbumProps) => {
  const {
    _count: { images: imageCount },
    ...upsertedAlbum
  } = await db.album.upsert({
    where: {
      title_date: {
        title: body.title,
        date: body.date,
      },
    },
    update: {
      images: {
        createMany: {
          data: body.images,
        },
      },
    },
    create: {
      title: body.title,
      date: body.date,
      isReception: body.isReception,
      isVisible: body.isVisible,
      images: {
        createMany: {
          data: body.images,
        },
      },
    },
    select: {
      id: true,
      title: true,
      date: true,
      _count: {
        select: {
          images: true,
        },
      },
    },
  });

  revalidateDbCache({ tag: CACHE_TAGS.albums, id: upsertedAlbum.id });
  revalidateDbCache({ tag: CACHE_TAGS.images });

  return { ...upsertedAlbum, imageCount };
};
export const updateAlbumById = async (
  albumId: string,
  data: PrismaTypeToUpdateByIdData<Album>,
) => {
  const updatedAlbum = await db.album.update({
    where: {
      id: albumId,
    },
    data,
  });

  revalidateDbCache({ tag: CACHE_TAGS.albums, id: albumId });

  return updatedAlbum;
};
export const updateManyAlbumsByIds = async (
  albumIds: string[],
  data: PrismaTypeToUpdateByIdData<Album, "title">,
) => {
  await db.album.updateMany({
    where: {
      id: {
        in: albumIds,
      },
    },
    data,
  });

  revalidateDbCache({ tag: CACHE_TAGS.albums, ids: albumIds });
};

export const deleteAlbumById = async (albumId: string) => {
  await db.album.delete({
    where: {
      id: albumId,
    },
  });

  revalidateDbCache({ tag: CACHE_TAGS.albums, id: albumId });
  revalidateDbCache({ tag: CACHE_TAGS.images });
};

export const getLatestAlbums = async (
  props: GetLatestAlbumsProps | undefined = {},
) =>
  dbCache(getLatestAlbumsInternal, {
    tags: [getGlobalTag(CACHE_TAGS.albums), getGlobalTag(CACHE_TAGS.images)],
  })(props);

export const getAllAlbumsAsAdmin = async () =>
  dbCache(getAllAlbumsAsAdminInternal, {
    tags: [getGlobalTag(CACHE_TAGS.albums)],
  })();

export const getAlbumWithImagesById = async (id: string) =>
  dbCache(getAlbumWithImagesByIdInternal, {
    tags: [getIdTag(id, CACHE_TAGS.albums)],
  })(id);

export const getAlbumWithImagesAsAdmin = async (id: string) =>
  dbCache(getAlbumWithImagesAsAdminInternal, {
    tags: [getIdTag(id, CACHE_TAGS.albums)],
  })(id);

export const getAlbumCountFromActiveYear = async (startYear: number) =>
  dbCache(getAlbumCountFromActiveYearInternal, {
    tags: [getGlobalTag(CACHE_TAGS.albums)],
  })(startYear);

export const getTotalAlbumCount = async () =>
  dbCache(getTotalAlbumCountInternal, {
    tags: [getGlobalTag(CACHE_TAGS.albums)],
  })();
