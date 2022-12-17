import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { prisma } from "../../../server/db/client";

const createAlbumSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  date: z.date().optional(),
  images: z
    .array(
      z.object({
        filename: z.string().min(1),
        photographer: z.string().min(1),
        date: z.date().optional(),
      })
    )
    .min(1),
});

type PostBodyType = z.infer<typeof createAlbumSchema>;

const albumRouter = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<any> => {
  if (req.method === "GET") {
    try {
      const album = await prisma.album.findMany({ include: { images: true } });
      return res.status(200).json(album);
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method === "POST") {
    try {
      const vaild = createAlbumSchema.safeParse(req.body).success;
      if (!vaild) {
        return res.status(404).send("Invalid input");
      }
      const body = req.body as PostBodyType;

      const createdAlbum = await prisma.album.create({
        data: {
          title: body.title,
          description: body.description,
          date: body.date,
          images: {
            createMany: {
              data: body.images,
            },
          },
        },
      });
      return res.status(200).json(createdAlbum);
    } catch (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    return res.status(200).json({ message: "Unused method" });
  }
};

export default albumRouter;
