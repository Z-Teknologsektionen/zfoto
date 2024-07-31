import { createAlbumAPISchema } from "@/schemas/album";
import { getLatestAlbums } from "@/server/data-access/albums";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/utils/db";

// eslint-disable-next-line max-lines-per-function
const albumRouter = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  if (req.method === "GET") {
    try {
      const album = await getLatestAlbums();
      res.status(200).json(album);
      return;
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
  } else if (req.method === "POST") {
    try {
      const parse = createAlbumAPISchema.safeParse(req.body);
      if (!parse.success) {
        res.status(400).json({ error: parse.error.flatten().fieldErrors });
        return;
      }
      const body = parse.data;

      const createdAlbum = await db.album.upsert({
        where: {
          title_date: {
            title: body.title,
            date: body.date,
          },
        },
        update: {
          images: {
            createMany: {
              data: body.images,
            },
          },
        },
        create: {
          title: body.title,
          date: body.date,
          images: {
            createMany: {
              data: body.images,
            },
          },
        },
        select: {
          id: true,
          title: true,
          date: true,
          visible: true,
          isReception: true,
          images: {
            select: {
              id: true,
              filename: true,
              photographer: true,
              date: true,
              visible: true,
              coverImage: true,
            },
          },
          _count: {
            select: {
              images: true,
            },
          },
        },
      });
      res.status(200).json(createdAlbum);
      return;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
          res.status(400).json({
            error:
              "Image with filename already exists, please check filenames and try again. No album has been created",
          });
          return;
        }
      }
      res.status(500).json({ error: err });
      return;
    }
  } else {
    res.status(200).json({ message: "Unused method" });
    return;
  }
};

export default albumRouter;
