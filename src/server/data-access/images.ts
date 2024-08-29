"use server";

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import type { PrismaTypeToUpdateByIdData } from "@/types/prisma";
import type { Image } from "@prisma/client";
import { db } from "~/utils/db";
import { dateTimeFilterByActiveYear, imagesOrderByForAdmin } from "./helpers";

export const getImagebyId = async (id: string) =>
  db.image.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      album: true,
    },
  });

export const getAllImagesAsAdmin = async () => {
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

export const getImageCountFromActiveYear = async (startYear: number) =>
  db.image.count({
    where: {
      date: dateTimeFilterByActiveYear(startYear),
    },
  });

export const getTotalImageCount = async () => db.image.count();

export const getAllImageFilenames = async () => {
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
) =>
  db.image.update({
    where: {
      id: imageId,
    },
    data,
  });

export const updateManyImagesByIds = async (
  imageIds: string[],
  data: PrismaTypeToUpdateByIdData<Image, "albumId" | "filename">,
) =>
  db.image.updateMany({
    where: {
      id: {
        in: imageIds,
      },
    },
    data,
  });

export const deleteImageById = async (imageId: string) =>
  db.image.delete({
    where: {
      id: imageId,
    },
  });
