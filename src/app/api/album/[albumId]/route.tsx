import { isObjectIdOrHexString } from "mongoose";
import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "~/server/db/client";

const updateAlbumSchema = z.object({
  title: z.string().min(1).optional(),
  visible: z.boolean().optional(),
  isReception: z.boolean().optional(),
  date: z.string().datetime().optional(),
});

export async function GET(
  req: Request,
  { params }: { params: { albumId: string } }
): Promise<NextResponse<unknown>> {
  const album = await prisma.album.findUniqueOrThrow({
    where: {
      id: params.albumId,
    },
  });
  return NextResponse.json(album, { status: 200 });
}

export async function POST(
  req: Request,
  { params }: { params: { albumId: string } }
): Promise<NextResponse<unknown>> {
  const result = updateAlbumSchema.safeParse(await req.json());

  const { albumId } = params;

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  if (!isObjectIdOrHexString(albumId)) {
    return NextResponse.json({ error: "Invalid ObjectId" }, { status: 400 });
  }

  try {
    await prisma.album.update({
      where: {
        id: albumId,
      },
      data: {
        title: result.data.title,
        visible: result.data.visible,
        isReception: result.data.isReception,
        date: result.data.date,
      },
    });
    return NextResponse.json({ message: "No Content" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}
