import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAlbums = async () => {
  const albums = await prisma.album.findMany({
    select: albumSelector,
  });
  return albums;
};

export const getAlbum = async (albumId: string) => {
  const album = await prisma.album.findFirstOrThrow({
    select: albumSelector,
  });
  return album;
};

export type Album = typeof getAlbum;

const albumSelector = {
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
};
