import { createAlbumAPISchema } from "@/schemas/album";
import { upsertAlbum } from "@/server/data-access/albums";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import type { NextApiRequest, NextApiResponse } from "next";

const albumRouter = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  if (req.method === "POST") {
    try {
      const parse = createAlbumAPISchema.safeParse(req.body);
      if (!parse.success) {
        res.status(400).json({ error: parse.error.flatten().fieldErrors });
        return;
      }

      const createdAlbum = await upsertAlbum(parse.data);

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
