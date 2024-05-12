"use server";

import { ActionReturnType } from "@/types/actions";
import { Roles } from "@prisma/client";
import { z } from "zod";
import { getServerAuthSession } from "~/utils/authOptions";
import { db } from "~/utils/db";

const setReceptionVisibilitySchema = z.object({ isVisible: z.boolean() });

export const setReceptionVisibilityAction = async (
  input: z.input<typeof setReceptionVisibilitySchema>,
): ActionReturnType => {
  const setReceptionVisibilitySchema = z.object({ isVisible: z.boolean() });
  const result = setReceptionVisibilitySchema.safeParse(input);
  if (!result.success) {
    return {
      success: false,
      error: "Ogiltig input",
    };
  }

  const session = await getServerAuthSession();

  if (session?.user.role !== Roles.ADMIN) {
    return {
      success: false,
      error: "Obehörig: Du har inte behörighet att göra den här åtgärden",
    };
  }

  const isVisible = result.data.isVisible;

  try {
    await db.album.updateMany({
      where: {
        isReception: true,
      },
      data: {
        visible: isVisible,
      },
    });
    return {
      success: true,
      data: undefined,
    };
  } catch (error) {
    return {
      success: false,
      error: `Okänt fel: Kunde inte ${isVisible ? "visa" : "dölja"} alla mottagningsalbum!`,
    };
  }
};
