import { db } from "~/utils/db";

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

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
