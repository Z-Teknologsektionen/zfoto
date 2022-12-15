import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

export const getAlbums = async () => {
  const albums = await prisma.album.findMany({
    select: albumSelector,
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
    select: albumSelector,
  });
  return album;
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
