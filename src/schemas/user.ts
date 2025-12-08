import { Roles } from "prisma/generated/enums";
import { z } from "zod";

export const patchUserSchema = z.object({
  role: z.nativeEnum(Roles),
});

export const userSignInSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().trim().min(8),
});
