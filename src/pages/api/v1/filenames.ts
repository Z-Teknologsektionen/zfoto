import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/utils/db";

const filenamesRouter = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  if (req.method === "GET") {
    try {
      const images = await db.image.findMany({
        select: {
          filename: true,
        },
      });

      const filenames = images.map((image) => image.filename);

      res.status(200).json(filenames);
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

export default filenamesRouter;
