import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/lib/site-url";
import { getLatestAlbums } from "@/server/data-access/albums";

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const BASE_URL = getBaseUrl();
  const albums = await getLatestAlbums({});

  return [
    { url: BASE_URL, changeFrequency: "weekly" },
    { url: `${BASE_URL}/albums`, changeFrequency: "weekly" },
    { url: `${BASE_URL}/about` },
    { url: `${BASE_URL}/contact` },
    ...albums.map((album) => ({
      url: `${BASE_URL}/albums/${album.id}`,
      lastModified: new Date(album.date),
    })),
  ];
};

export default sitemap;
