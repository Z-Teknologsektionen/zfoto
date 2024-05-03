"use server";

import { Roles } from "@prisma/client";
import { z } from "zod";
import { getServerAuthSession } from "~/utils/authOptions";
import { prisma } from "~/utils/db";

const setReceptionVisibilitySchema = z.object({ isVisible: z.boolean() });

export const setReceptionVisibilityAction = async (
  input: z.input<typeof setReceptionVisibilitySchema>,
) => {
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
    await prisma.album.updateMany({
      where: {
        isReception: true,
      },
      data: {
        visible: isVisible,
      },
    });
    return {
      success: false,
    };
  } catch (error) {
    return {
      success: false,
      error: `Okänt fel: Kunde inte ${isVisible ? "visa" : "dölja"} alla mottagningsalbum!`,
    };
  }
};