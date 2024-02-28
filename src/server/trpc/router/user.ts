import { TRPCError } from "@trpc/server";
import bcrypt from "bcrypt";
import { z } from "zod";
import { objectId } from "../helpers/zodTypes";
import { adminProcedure, createTRPCRouter } from "../trpc";

export const userRouter = createTRPCRouter({
  updatePassword: adminProcedure
    .input(z.object({ id: objectId, password: z.string().trim().min(8) }))
    .mutation(async ({ ctx, input: { id, password } }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: id,
        },
      });

      if (!user)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Hittade ingen användare med det id:t",
        });

      if (!user.password)
        throw new TRPCError({
          code: "FORBIDDEN",
          message:
            "Du får inte uppdatera ett lösenord på en användare som inte redan har ett lösenord",
        });

      const hashedPassword = await bcrypt.hash(password, 10);

      return ctx.prisma.user.update({
        where: {
          id: id,
        },
        data: {
          password: hashedPassword,
        },
      });
    }),
});
