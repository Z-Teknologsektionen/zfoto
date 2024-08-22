import { z } from "zod";

export const contactEmailSchema = z.object({
  email: z.string().email(),
  subject: z.string().min(3).max(100),
  message: z.string().min(10).max(100_000),
});
