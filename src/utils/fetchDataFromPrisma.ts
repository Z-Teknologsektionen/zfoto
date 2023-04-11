/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAlbums = async () => {
  type PublicAlbums = {
    coverImage: {
      date: Date;
      filename: string;
      id: string;
    };
    date: Date;
    id: string;
    title: string;
  };

  const albums = await prisma.album.findMany({
    where: {
      visible: {
        equals: true,
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
          id: true,
          date: true,
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

  const newAlbums: PublicAlbums[] = albums
    .map((album) => {
      const coverImage = album.images[0];
      if (!coverImage) {
        return null;
      }
      return {
        id: album.id,
        title: album.title,
        coverImage: {
          filename: coverImage.filename,
          id: coverImage.id,
          date: coverImage.date.toISOString(),
        },
        date: album.date.toISOString(),
      };
    })
    .filter((album) => album !== null) as unknown[] as PublicAlbums[];

  return newAlbums;
};

export const getAlbum = async (albumId?: string) => {
  const album = await prisma.album.findFirstOrThrow({
    where: {
      id: albumId,
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
        orderBy: { date: "asc" },
        select: {
          albumId: true,
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
  return album;
};

export const getAlbumsAsAdmin = async () => {
  const albums = await prisma.album.findMany({
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
  return albums;
};

export const getAlbumAsAdmin = async (albumId?: string) => {
  const album = await prisma.album.findFirstOrThrow({
    where: {
      id: albumId,
    },
    include: {
      _count: true,
      images: {
        orderBy: { date: "asc" },
      },
    },
    orderBy: {
      date: "desc",
    },
  });
  return album;
};

export const getImage = async (imageId?: string) => {
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
