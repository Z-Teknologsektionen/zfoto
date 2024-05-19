"use server";

import { emailSchema } from "@/server/trpc/helpers/zodScheams";
import { baseSafeAction } from "~/actions/safe-action";
import { ActionError } from "~/actions/safe-action-helpers";
import { emailTransporter } from "~/utils/emailTransporter";

export const sendContactEmail = baseSafeAction(
  emailSchema,
  async ({ email, message, subject }) => {
    await emailTransporter.verify();

    const emailResults = await emailTransporter.sendMail({
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

    if (!emailResults.accepted)
      throw new ActionError(
        "Kunde inte skicka.\nFörsök igen senare eller kontakta oss via mail: zfoto@ztek.se!",
      );

    return true;
  },
);
