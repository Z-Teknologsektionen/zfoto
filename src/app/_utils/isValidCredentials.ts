"use server";

import type { User } from "@prisma/client";
import { compare } from "bcrypt";
import { getUserByEmailWithPassword } from "@/server/data-access/users";

export const isValidCredentials = async (data: {
  password: string;
  email: string;
}): Promise<User | null> => {
  const user = await getUserByEmailWithPassword(data.email);

  if (user === null) return null;
  if (user.password === null) return null;

  const isCorrectPassword = await compare(data.password, user.password);

  if (!isCorrectPassword) return null;

  return { ...user, password: null };
};
