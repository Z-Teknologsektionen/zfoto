import { Roles } from "@prisma/client";
import { isObjectIdOrHexString } from "mongoose";
import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "~/utils/db";

const patchUserSchema = z.object({
  role: z.nativeEnum(Roles),
});

export async function GET(
  _req: Request,
  { params }: { params: { userId: string } },
): Promise<NextResponse<unknown>> {
  const user = await db.user.findUniqueOrThrow({
    where: {
      id: params.userId,
    },
  });
  return NextResponse.json(user, { status: 200 });
}

export async function PATCH(
  req: Request,
  { params }: { params: { userId: string } },
): Promise<NextResponse<unknown>> {
  const result = patchUserSchema.safeParse(await req.json());

  const { userId } = params;

  if (!result.success)
    return NextResponse.json({ error: result.error }, { status: 400 });

  if (!isObjectIdOrHexString(userId))
    return NextResponse.json({ error: "Invalid ObjectId" }, { status: 400 });

  try {
    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        role: result.data.role,
      },
    });
    return NextResponse.json({ message: "No Content" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}
