"use server";

import { updateAlbumAPISchema } from "@/server/trpc/helpers/zodScheams";
import { ActionReturnType } from "@/types/actions";
import { z } from "zod";
import { getUTCFromLocalDate } from "~/utils/date-utils";
import { db } from "~/utils/db";

export const updateAlbumAction = async (
  rawData: z.input<typeof updateAlbumAPISchema>,
): ActionReturnType<{
  title: string;
  isReception: boolean;
  visible: boolean;
  date: Date;
}> => {
  console.log(rawData);

  const result = updateAlbumAPISchema.safeParse(rawData);

  if (!result.success) {
    return {
      success: false,
      error: `Ogiltig input\n + ${result.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}\n`)}`,
    };
  }

  const { albumId, date, ...data } = result.data;

  try {
    const album = await db.album.update({
      where: {
        id: albumId,
      },
      data: {
        ...data,
        date: date
          ? getUTCFromLocalDate(new Date(date)).toISOString()
          : undefined,
      },
      select: {
        title: true,
        date: true,
        visible: true,
        isReception: true,
      },
    });

    return {
      success: true,
      data: album,
    };
  } catch (error) {
    return {
      success: false,
      error: "Okänt fel",
    };
  }
};
