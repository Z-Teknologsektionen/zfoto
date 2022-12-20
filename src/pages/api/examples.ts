import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../server/db/client";

const examplesRputer = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<any> => {
  const examples = await prisma.example.findMany();
  res.status(200).json(examples);
};

export default examplesRputer;
