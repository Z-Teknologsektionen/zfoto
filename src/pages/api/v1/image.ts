import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { prisma } from "../../../server/db/client";

const image = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const vaild = createImageSchema.safeParse(req.body).success;
      if (!vaild) {
        return res.status(404).send("Invalid input");
      }

      const createdImage = await prisma.image.create({
        data: {
          filename: req.body.filename,
          photographer: req.body.photographer,
          album: {
            connect: {
              id: req.body.albumId,
            },
          },
        },
      });
      return res.status(200).json(createdImage);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    return res.status(200).json({ message: "Unused method" });
  }
};

export default image;

const createImageSchema = z.object({
  filename: z.string().min(1),
  photographer: z.string().min(1),
  date: z.date().optional(),
  albumId: z.string().min(1),
});
