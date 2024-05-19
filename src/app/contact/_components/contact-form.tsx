"use client";

import { emailSchema } from "@/server/trpc/helpers/zodScheams";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { BasicFormWrapper } from "~/components/form/basic-form-wrapper";
import {
  FormFieldInput,
  FormFieldInputEmail,
} from "~/components/form/form-field-input";
import { Button } from "~/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Textarea } from "~/components/ui/textarea";
import { useSendContactEmail } from "../_hooks/use-send-contact-email";

export const ContactForm: FC = () => {
  const { execute: sendEmail, status } = useSendContactEmail({
    onSuccess: () => form.reset(),
  });

  const form = useForm({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
      message: "",
      subject: "",
    },
  });

  return (
    <BasicFormWrapper
      className="grid grid-cols-2 gap-4"
      form={form}
      onValid={(values) => {
        sendEmail(values);
      }}
      schema={emailSchema}
    >
      <FormFieldInputEmail
        form={form}
        name="email"
        label="Epost"
        description="Används för att kunna svara på din fråga"
        placeholder="Fyll i din epost..."
      />
      <FormFieldInput
        form={form}
        label="Ämne"
        name="subject"
        description="Används som rubik i ditt mail"
        placeholder="Fyll i ditt ämne"
      />
      <FormField
        control={form.control}
        name="message"
        render={({ field }) => (
          <FormItem className="col-span-2">
            <FormLabel>Meddelande</FormLabel>
            <FormControl>
              <Textarea placeholder="Skriv ditt meddelande" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="col-span-2 flex w-full flex-row items-center justify-end gap-2">
        <Button
          type="button"
          onClick={() => form.reset()}
          variant="outline"
          size="default"
          disabled={status === "executing"}
        >
          Återställ
        </Button>
        <Button
          type="submit"
          disabled={status === "executing"}
          variant="default"
          size="default"
        >
          Skicka
        </Button>
      </div>
    </BasicFormWrapper>
  );
};
