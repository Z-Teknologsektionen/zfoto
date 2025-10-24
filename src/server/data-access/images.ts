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
import type { Image } from "@prisma/client";
import { db } from "~/utils/db";
import { dateTimeFilterByActiveYear, imagesOrderByForAdmin } from "./helpers";

const getImageByIdInternal = async (id: string) =>
  db.image.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      album: true,
    },
  });

const getAllImagesAsAdminInternal = async () => {
  const images = await db.image.findMany({
    include: {
      album: {
        select: {
          title: true,
        },
      },
    },
    orderBy: imagesOrderByForAdmin,
  });

  return images.map(({ album, ...image }) => ({
    albumTitle: album.title,
    ...image,
  }));
};

const getImageCountFromActiveYearInternal = async (startYear: number) =>
  db.image.count({
    where: {
      date: dateTimeFilterByActiveYear(startYear),
    },
  });

const getTotalImageCountInternal = async () => db.image.count();

const getAllImageFilenamesInternal = async () => {
  const images = await db.image.findMany({
    select: {
      filename: true,
    },
  });

  return images.map((image) => image.filename);
};

export const updateImageById = async (
  imageId: string,
  data: PrismaTypeToUpdateByIdData<Image>,
) => {
  const updatedImage = await db.image.update({
    where: {
      id: imageId,
    },
    data,
  });

  revalidateDbCache({ tag: CACHE_TAGS.images, id: imageId });
  revalidateDbCache({ tag: CACHE_TAGS.albums, id: updatedImage.albumId });

  return updatedImage;
};

export const updateManyImagesByIds = async (
  imageIds: string[],
  data: PrismaTypeToUpdateByIdData<Image, "albumId" | "filename">,
) => {
  const { count } = await db.image.updateMany({
    where: {
      id: {
        in: imageIds,
      },
    },
    data,
  });

  const albumsIds = (
    await db.image.findMany({
      where: { id: { in: imageIds } },
      select: { albumId: true },
    })
  ).map(({ albumId }) => albumId);

  const uniqueAlbumIds = [...new Set(albumsIds)];

  revalidateDbCache({ tag: CACHE_TAGS.images, ids: imageIds });
  revalidateDbCache({ tag: CACHE_TAGS.albums, ids: uniqueAlbumIds });

  return count;
};

export const deleteImageById = async (imageId: string) => {
  const deletedImage = await db.image.delete({
    where: {
      id: imageId,
    },
  });

  revalidateDbCache({ tag: CACHE_TAGS.images, id: imageId });
  revalidateDbCache({ tag: CACHE_TAGS.albums, id: deletedImage.albumId });
};

export const getImageById = async (imageId: string) =>
  dbCache(getImageByIdInternal, {
    tags: [
      getGlobalTag(CACHE_TAGS.images),
      getIdTag(imageId, CACHE_TAGS.images),
    ],
  })(imageId);

export const getAllImagesAsAdmin = async () =>
  dbCache(getAllImagesAsAdminInternal, {
    tags: [getGlobalTag(CACHE_TAGS.images)],
  })();

export const getImageCountFromActiveYear = async (year: number) =>
  dbCache(getImageCountFromActiveYearInternal, {
    tags: [getGlobalTag(CACHE_TAGS.images)],
  })(year);

export const getTotalImageCount = async () =>
  dbCache(getTotalImageCountInternal, {
    tags: [getGlobalTag(CACHE_TAGS.images)],
  })();

export const getAllImageFilenames = async () =>
  dbCache(getAllImageFilenamesInternal, {
    tags: [getGlobalTag(CACHE_TAGS.images)],
    revalidate: 60, // This data needs to be very fresh
  })();
