"use server";

import { emailSchema } from "@/server/trpc/helpers/zodScheams";
import { baseSafeAction } from "~/actions/safe-action";
import { emailTransporter } from "~/utils/emailTransporter";

export const sendContactEmail = baseSafeAction(
  emailSchema,
  async ({ email, message, subject }) => {
    await emailTransporter.verify();

    await emailTransporter.sendMail({
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

    return true;
  },
);
