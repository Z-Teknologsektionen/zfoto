import { Roles } from "@prisma/client";
import { z } from "zod";

export const patchUserSchema = z.object({
  role: z.enum(Roles),
});

export const userSignInSchema = z.object({
  email: z.email().trim().toLowerCase(),
  password: z.string().trim().min(8),
});
