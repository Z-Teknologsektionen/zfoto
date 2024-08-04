import { MONTH_INDEX_NOVEMBER } from "@/constants/admin";
import type { Prisma } from "@prisma/client";

export const dateTimeFilterByActiveYear = (
  startYear: number,
): Prisma.DateTimeFilter => ({
  gt: new Date(startYear, MONTH_INDEX_NOVEMBER, 1),
  lt: new Date(startYear + 1, MONTH_INDEX_NOVEMBER - 1, 31),
});

export const imagesOrderBy = [
  { date: "asc" },
  { filename: "desc" },
] satisfies Prisma.ImageOrderByWithRelationInput[];

export const coverImageFromAlbumSelect = {
  orderBy: imagesOrderBy,
  take: 1,
  select: {
    filename: true,
  },
  where: {
    isCoverImage: true,
    isVisible: true,
  },
} satisfies Prisma.Album$imagesArgs;
