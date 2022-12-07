import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { prisma } from "../../../server/db/client";

const album = async (req: NextApiRequest, res: NextApiResponse) => {
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

      const createdAlbum = await prisma.album.create({
        data: {
          title: req.body.title,
          description: req.body.description,
          date: req.body.date,
          images: {
            createMany: {
              data: req.body.images,
            },
          },
        },
      });
      return res.status(200).json(createdAlbum);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    return res.status(200).json({ message: "Unused method" });
  }
};

export default album;

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
