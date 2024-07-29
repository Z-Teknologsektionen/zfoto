"use server";

import { emailSchema } from "@/schemas/helpers/zodScheams";
import { baseSafeAction } from "~/actions/safe-action";
import { emailTransporter } from "~/utils/emailTransporter";

export const sendContactEmail = baseSafeAction
  .schema(emailSchema)
  .action(async ({ parsedInput: { email, message, subject } }) => {
    await emailTransporter.verify();

    await emailTransporter.sendMail({
      replyTo: email,
      to: "zfoto@ztek.se",
      subject,
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
  });
