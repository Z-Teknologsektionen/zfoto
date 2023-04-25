import nodemailer from "nodemailer";
import { z } from "zod";
import { env } from "../../../env/server.mjs";
import { createTRPCRouter, publicProcedure } from "../trpc";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
const transporter = nodemailer.createTransport({
  host: "smtp.googlemail.com",
  port: 465,
  auth: {
    user: env.AUTH_USER,
    pass: env.AUTH_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const emailRouter = createTRPCRouter({
  submitContactForm: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().email().min(1),
        subject: z.string().min(1),
        message: z.string().min(1),
      })
    )
    .mutation(({ input }) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      transporter.sendMail({
        from: "regizzor.zfoto@ztek.se",
        to: "regizzor.zfoto@ztek.se",
        subject: input.subject,
        html: `${input.message} <br><br>Namn: ${input.name} <br> Epost: ${input.email}`,
      });

      return {
        success: true,
      };
    }),
});
