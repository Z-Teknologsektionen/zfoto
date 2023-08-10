import { isObjectIdOrHexString } from "mongoose";
import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "~/utils/db";

const updateAlbumSchema = z.object({
  filename: z.string().min(1).optional(),
  photographer: z.string().min(1).optional(),
  visible: z.boolean().optional(),
  coverImage: z.boolean().optional(),
  date: z.string().datetime().optional(),
});

export async function POST(
  req: Request,
  { params }: { params: { imageId: string } },
): Promise<NextResponse<unknown>> {
  const result = updateAlbumSchema.safeParse(await req.json());

  const { imageId } = params;

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  if (!isObjectIdOrHexString(imageId)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  try {
    await prisma.image.update({
      where: {
        id: imageId,
      },
      data: {
        filename: result.data.filename,
        photographer: result.data.photographer,
        visible: result.data.visible,
        coverImage: result.data.coverImage,
        date: result.data.date,
      },
    });
    return NextResponse.json({ message: "No Content" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}
