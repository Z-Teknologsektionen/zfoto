import type { Prisma } from "@prisma/client";
import { MONTH_INDEX_NOVEMBER } from "@/constants/admin";

export const dateTimeFilterByActiveYear = (
  startYear: number,
): Prisma.DateTimeFilter => ({
  gt: new Date(startYear, MONTH_INDEX_NOVEMBER, 1),
  lt: new Date(startYear + 1, MONTH_INDEX_NOVEMBER - 1, 31),
});

export const imagesOrderBy = [
  { date: "asc" },
  { filename: "asc" },
] satisfies Prisma.ImageOrderByWithRelationInput[];

export const imagesOrderByForAdmin = [
  { date: "desc" },
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
