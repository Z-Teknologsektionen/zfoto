import { NextApiRequest, NextApiResponse } from "next";
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

      return res.status(200).json(filenames);
    } catch (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    return res.status(200).json({ message: "Unused method" });
  }
};

export default filenamesRouter;
