import type {
  getAlbum,
  getAlbumAsAdmin,
  getAlbums,
} from "./fetchDataFromPrisma";

export type AlbumType = Awaited<ReturnType<typeof getAlbum>>;

export type AdminAlbumType = Awaited<ReturnType<typeof getAlbumAsAdmin>>;

export type AlbumsType = Awaited<ReturnType<typeof getAlbums>>;
