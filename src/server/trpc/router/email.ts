import { emailTransporter } from "@/server/utils/emailTransporter";
import { env } from "process";
import { emailSchema } from "../helpers/zodScheams";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const emailRouter = createTRPCRouter({
  sendEmailAsUser: publicProcedure
    .input(emailSchema)
    .mutation(async ({ input: { email, message, subject } }) => {
      await emailTransporter.verify();

      return emailTransporter.sendMail({
        sender: env.AUTH_USER,
        replyTo: email,
        to: "zfoto@ztek.se",
        subject: subject,
        text: `
        Nytt meddelande från hemsidan!

        Meddelande: 
        ${message}
        
        Ämne: 
        ${subject}
        
        Epost: 
        ${email}
        `,
      });
    }),
});
