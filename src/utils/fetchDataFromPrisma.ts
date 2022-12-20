/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAlbums = async () => {
  const albums = await prisma.album.findMany({
    where: {
      visible: {
        equals: true,
      },
    },
    select: {
      id: true,
      title: true,
      description: true,
      images: {
        where: {
          id: {
            not: undefined,
          },
          coverImage: {
            equals: true,
          },
          visible: {
            equals: true,
          },
        },
        select: {
          albumId: true,
          date: true,
          filename: true,
          photographer: true,
          id: true,
        },
      },
      date: true,
      _count: {
        select: {
          images: true,
        },
      },
    },
    orderBy: {
      date: "desc",
    },
  });
  return albums;
};

export const getAlbum = async (albumId: string) => {
  const album = await prisma.album.findFirstOrThrow({
    where: {
      id: albumId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      images: {
        where: {
          id: {
            not: undefined,
          },
          visible: {
            equals: true,
          },
        },
        select: {
          albumId: true,
          date: true,
          filename: true,
          photographer: true,
          id: true,
        },
      },
      date: true,
      _count: {
        select: {
          images: true,
        },
      },
    },
  });
  return album;
};

export const getAlbumsAsAdmin = async () => {
  const albums = await prisma.album.findMany({
    include: {
      _count: true,
      images: true,
    },
    orderBy: {
      date: "desc",
    },
  });
  return albums;
};

export const getAlbumAsAdmin = async (albumId: string) => {
  const album = await prisma.album.findFirstOrThrow({
    where: {
      id: albumId,
    },
    include: {
      _count: true,
      images: true,
    },
  });
  return album;
};

export const getImage = async ({ imageId }: { imageId: string }) => {
  const image = await prisma.image.findUniqueOrThrow({
    where: {
      id: imageId,
    },
    select: {
      id: true,
      album: true,
      filename: true,
      photographer: true,
      date: true,
    },
  });
  return image;
};
