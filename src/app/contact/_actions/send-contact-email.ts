"use server";

import { contactEmailSchema } from "@/schemas/email";
import { baseSafeAction } from "~/actions/safe-action";
import { emailTransporter } from "~/utils/emailTransporter";

export const sendContactEmail = baseSafeAction
  .schema(contactEmailSchema)
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
