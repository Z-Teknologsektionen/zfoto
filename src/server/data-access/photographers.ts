import { CACHE_TAGS, dbCache, getGlobalTag } from "@/lib/cache";
import { db } from "~/utils/db";
import "server-only"

const getCountsPerPhotographerInternal = async () => {
  const images = await db.image.groupBy({
    by: ["photographer"],
    _count: {
      _all: true,
      isVisible: true,
      isCoverImage: true,
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
      visible: image._count.isVisible,
      coverImage: image._count.isCoverImage,
      album: album.filter((a) => a.images.some(samePhotographer)).length,
      firstImage: imagesDates.find(samePhotographer)?.date,
      latestImage: imagesDates.findLast(samePhotographer)?.date,
    };
  });
};

export const getCountsPerPhotographer = async () =>
  dbCache(getCountsPerPhotographerInternal, {
    tags: [getGlobalTag(CACHE_TAGS.images), getGlobalTag(CACHE_TAGS.albums)],
  })();
