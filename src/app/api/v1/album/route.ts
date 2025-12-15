import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { createAlbumAPISchema } from "@/schemas/album";
import { upsertAlbum } from "@/server/data-access/albums";

export const POST = async (request: Request): Promise<Response> => {
  try {
    const parse = createAlbumAPISchema.safeParse(await request.json());

    if (!parse.success) {
      return Response.json(
        { error: parse.error.flatten().fieldErrors },
        {
          status: 400,
        },
      );
    }

    const createdAlbum = await upsertAlbum(parse.data);

    return Response.json(createdAlbum, { status: 200 });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return Response.json(
          {
            error:
              "Image with filename already exists, please check filenames and try again. No album has been created",
          },
          {
            status: 400,
          },
        );
      }
    }
    return Response.json(
      { error: "Unknown error, try again later" },
      { status: 500 },
    );
  }
};
