import type {
  getAlbumWithImagesById,
  getAllAlbumsAsAdmin,
  getLatestAlbums,
} from "@/server/data-access/albums";
import type {
  getAllImagesAsAdmin,
  getImageById,
} from "@/server/data-access/images";
import type { getCountsPerPhotographer } from "@/server/data-access/photographers";
import type { getAllUsersAsAdmin } from "@/server/data-access/users";

export type PublicAlbumType = Awaited<ReturnType<typeof getLatestAlbums>>[0];

export type PublicAlbumWithImagesType = Awaited<
  ReturnType<typeof getAlbumWithImagesById>
>;

export type PublicImageType = Awaited<ReturnType<typeof getImageById>>;

export type AdminImageType = Awaited<ReturnType<typeof getAllImagesAsAdmin>>[0];

export type AdminAlbumType = Awaited<ReturnType<typeof getAllAlbumsAsAdmin>>[0];

export type AdminCountsPerPhotographerType = Awaited<
  ReturnType<typeof getCountsPerPhotographer>
>[0];

export type AdminUserType = Awaited<ReturnType<typeof getAllUsersAsAdmin>>[0];
