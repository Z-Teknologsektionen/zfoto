import type {
  getAlbumWithImagesById,
  getAllAlbumsAsAdmin,
  getLatestAlbums,
} from "@/server/data-access/albums";
import type {
  getAllImagesAsAdmin,
  getImagebyId,
} from "@/server/data-access/images";
import type { getCountsPerPhotographer } from "@/server/data-access/photographers";
import type { getAllUsersAsAdmin } from "@/server/data-access/users";
import type { Prisma } from "@prisma/client";

export type PublicAlbumType = Prisma.PromiseReturnType<
  typeof getLatestAlbums
>[0];

export type PublicAlbumWithImagesType = Prisma.PromiseReturnType<
  typeof getAlbumWithImagesById
>;

export type PublicImageType = Prisma.PromiseReturnType<typeof getImagebyId>;

export type AdminImageType = Prisma.PromiseReturnType<
  typeof getAllImagesAsAdmin
>[0];

export type AdminAlbumType = Prisma.PromiseReturnType<
  typeof getAllAlbumsAsAdmin
>[0];

export type AdminCountsPerPhotographerType = Prisma.PromiseReturnType<
  typeof getCountsPerPhotographer
>[0];

export type AdminUserType = Prisma.PromiseReturnType<
  typeof getAllUsersAsAdmin
>[0];
