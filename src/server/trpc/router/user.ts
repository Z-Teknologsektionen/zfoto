import { TRPCError } from "@trpc/server";
import bcrypt from "bcrypt";
import { z } from "zod";
import { objectId } from "../helpers/zodTypes";
import { adminProcedure, createTRPCRouter } from "../trpc";

const MIN_PASSWORD_LENGHT = 8;
const SALT_ROUNDS = 10;

export const userRouter = createTRPCRouter({
  updatePassword: adminProcedure
    .input(
      z.object({
        id: objectId,
        password: z.string().trim().min(MIN_PASSWORD_LENGHT),
      }),
    )
    .mutation(async ({ ctx, input: { id, password } }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          id,
        },
      });

      if (user === null) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Hittade ingen användare med det id:t",
        });
      }

      if (user.password === null) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message:
            "Du får inte uppdatera ett lösenord på en användare som inte redan har ett lösenord",
        });
      }

      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

      return ctx.prisma.user.update({
        where: {
          id,
        },
        data: {
          password: hashedPassword,
        },
      });
    }),
});
