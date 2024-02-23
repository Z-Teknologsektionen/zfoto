import { compare } from "bcrypt";
import { z } from "zod";
import { prisma } from "~/utils/db";

export const isValidCredentials = async (data: unknown) => {
  const reqBodyTest = z
    .object({
      email: z.string().trim().toLowerCase().email(),
      password: z.string().trim().min(8),
    })
    .safeParse(data);

  if (!reqBodyTest.success) return null;

  const reqBody = reqBodyTest.data;

  const user = await prisma.user.findUnique({
    where: {
      email: reqBody.email,
      password: {
        not: {
          equals: null,
        },
      },
    },
  });

  if (!user || !user.password) return null;

  const isCorrectPassword = await compare(reqBody.password, user.password);

  if (!isCorrectPassword) return null;

  return user;
};
