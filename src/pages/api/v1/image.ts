import { createImageAPISchema } from "@/schemas/image";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/utils/db";

const imageRouter = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  if (req.method === "POST") {
    try {
      const parse = createImageAPISchema.safeParse(req.body);
      if (!parse.success) {
        res.status(404).send("Invalid input");
        return;
      }

      const body = parse.data;

      const createdImage = await db.image.create({
        data: {
          filename: body.filename,
          photographer: body.photographer,
          album: {
            connect: {
              id: body.albumId,
            },
          },
          date: body.date,
          isCoverImage: body.isCoverImage,
          isVisible: body.isVisible,
        },
      });
      res.status(200).json(createdImage);
      return;
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
  } else {
    res.status(200).json({ message: "Unused method" });
    return;
  }
};

export default imageRouter;
