import { env } from "@/env/server.mjs";
import { emailTransporter } from "@/server/utils/emailTransporter";
import { emailSchema } from "../helpers/zodScheams";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const emailRouter = createTRPCRouter({
  sendEmailAsUser: publicProcedure
    .input(emailSchema)
    .mutation(({ ctx, input: { email, message, subject } }) => {
      return emailTransporter.verify();
      return emailTransporter.sendMail({
        sender: env.AUTH_USER,
        replyTo: email,
        to: "zfoto@ztek.se", //TODO: Move to env or constant
        subject: subject,
        text: message,
      });
    }),
});
