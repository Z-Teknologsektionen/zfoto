import { userSignInForm } from "@/server/trpc/helpers/zodScheams";
import type { User } from "@prisma/client";
import { compare } from "bcrypt";
import { db } from "~/utils/db";

export const isValidCredentials = async (
  data: unknown,
): Promise<User | null> => {
  const reqBodyTest = userSignInForm.safeParse(data);

  if (!reqBodyTest.success) return null;

  const reqBody = reqBodyTest.data;

  const user = await db.user.findUnique({
    where: {
      email: reqBody.email,
      password: {
        not: {
          equals: null,
        },
      },
    },
  });

  if (user === null) return null;
  if (user.password === null) return null;

  const isCorrectPassword = await compare(reqBody.password, user.password);

  if (!isCorrectPassword) return null;

  return user;
};
