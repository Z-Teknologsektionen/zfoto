import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { db } from "~/utils/db";

const createImageSchema = z.object({
  filename: z.string().min(1),
  photographer: z.string().min(1),
  date: z.string().datetime({
    precision: 3,
    offset: false,
    message: "Invalid datetime format",
  }), //Format: "YYYY-MM-DDTHH:MM:SS.000Z"
  albumId: z.string().min(1),
});

type PostBodyType = z.infer<typeof createImageSchema>;

const imageRouter = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  if (req.method === "POST") {
    try {
      const vaild = createImageSchema.safeParse(req.body).success;
      if (!vaild) {
        return res.status(404).send("Invalid input");
      }
      const body = req.body as PostBodyType;

      const createdImage = await db.image.create({
        data: {
          filename: body.filename,
          photographer: body.photographer,
          album: {
            connect: {
              id: body.albumId,
            },
          },
        },
      });
      return res.status(200).json(createdImage);
    } catch (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    return res.status(200).json({ message: "Unused method" });
  }
};

export default imageRouter;
