import { Prisma } from "@prisma/client";
import { db } from "~/utils/db";

export const getAllAlbumsAsAdmin = async () => {
  const albums = await db.album.findMany({
    include: {
      _count: true,
      images: {
        orderBy: { date: "asc" },
        take: 1,
        where: {
          coverImage: true,
          visible: true,
        },
      },
    },
    orderBy: {
      date: "desc",
    },
  });
  return albums.map(({ images, _count, ...album }) => {
    return {
      ...album,
      coverImageFilename: images.at(0)?.filename,
      count: _count.images,
    };
  });
};

export const getAlbumAsAdmin = async (id: string) => {
  const {
    images,
    _count: { images: numberOfImages },
    ...album
  } = await db.album.findUniqueOrThrow({
    where: {
      id,
    },
    select: {
      id: true,
      title: true,
      visible: true,
      isReception: true,
      date: true,
      images: {
        orderBy: { date: "asc" },
        select: {
          id: true,
          photographer: true,
          filename: true,
          visible: true,
          coverImage: true,
          date: true,
          albumId: true,
        },
      },
      _count: {
        select: {
          images: true,
        },
      },
    },
  });
  return { numberOfImages, images, ...album };
};

export const getAllImagesAsAdmin = async () => {
  const images = await db.image.findMany({
    select: {
      id: true,
      filename: true,
      photographer: true,
      visible: true,
      coverImage: true,
      date: true,
      album: {
        select: {
          title: true,
          id: true,
        },
      },
    },
    orderBy: {
      date: "desc",
    },
  });
  return images.map(({ album: { title, id }, ...image }) => {
    return {
      albumTitle: title,
      albumId: id,
      ...image,
    };
  });
};

export const getImageAsAdmin = async (id: string) => {
  return db.image.findUniqueOrThrow({
    where: {
      id: id,
    },
    select: {
      id: true,
      filename: true,
      coverImage: true,
      visible: true,
      photographer: true,
      albumId: true,
      date: true,
    },
  });
};

export const getAllUsersAsAdmin = () => {
  return db.user.findMany({
    select: {
      name: true,
      email: true,
      image: true,
      role: true,
      id: true,
    },
    orderBy: [{ name: "asc" }],
  });
};

export const getCountsPerPhotographer = async () => {
  const images = await db.image.groupBy({
    by: ["photographer"],
    _count: {
      _all: true,
      visible: true,
      coverImage: true,
    },
    orderBy: [{ photographer: "asc" }],
  });

  const imagesDates = await db.image.findMany({
    select: {
      date: true,
      photographer: true,
    },
    orderBy: [{ date: "asc" }],
  });

  const album = await db.album.findMany({
    select: {
      images: {
        select: {
          photographer: true,
        },
      },
    },
  });

  return images.map((image) => {
    const samePhotographer = (i: { photographer: string }) =>
      i.photographer === image.photographer;
    return {
      name: image.photographer,
      images: image._count._all,
      visible: image._count.visible,
      coverImage: image._count.coverImage,
      album: album.filter((a) => a.images.some(samePhotographer)).length,
      firstImage: imagesDates.find(samePhotographer)?.date,
      latestImage: imagesDates.findLast(samePhotographer)?.date,
    };
  });
};

export const getImageCountFromYear = async (startYear: number) => {
  return db.image.count({
    where: {
      date: {
        gt: new Date(startYear, 10, 1),
        lt: new Date(startYear + 1, 9, 31),
      },
    },
  });
};

export const getAlbumCountFromYear = async (startYear: number) => {
  return db.album.count({
    where: {
      date: {
        gt: new Date(startYear, 10, 1),
        lt: new Date(startYear + 1, 9, 31),
      },
    },
  });
};

export const getTotalImageCount = async () => {
  return db.image.count();
};
export const getTotalAlbumCount = async () => {
  return db.album.count();
};

export type AdminAlbumType = Prisma.PromiseReturnType<
  typeof getAllAlbumsAsAdmin
>[0];

export type AdminAlbumImageType = Prisma.PromiseReturnType<
  typeof getAlbumAsAdmin
>["images"][0];

export type AdminTableImageType = Prisma.PromiseReturnType<
  typeof getAllImagesAsAdmin
>[0];

export type AdminImage = Prisma.PromiseReturnType<typeof getImageAsAdmin>;

export type AdminUser = Prisma.PromiseReturnType<typeof getAllUsersAsAdmin>[0];

export type CountsPerPhotographerType = Prisma.PromiseReturnType<
  typeof getCountsPerPhotographer
>[0];
