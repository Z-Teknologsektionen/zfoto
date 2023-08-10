import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "~/utils/db";

const patchUserSchema = z.object({
  visible: z.boolean().optional(),
});

export async function PATCH(req: Request): Promise<NextResponse<unknown>> {
  const result = patchUserSchema.safeParse(await req.json());

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  try {
    await prisma.album.updateMany({
      where: {
        isReception: true,
      },
      data: {
        visible: result.data.visible,
      },
    });
    return NextResponse.json({ message: "No Content" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}
