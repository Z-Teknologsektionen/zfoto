import { getAllImageFilenames } from "@/server/data-access/images";
import type { NextApiRequest, NextApiResponse } from "next";

const filenamesRouter = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  if (req.method === "GET") {
    try {
      const filenames = await getAllImageFilenames();

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
