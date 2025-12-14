"use client";

import { contactEmailSchema } from "@/schemas/email";
import type { FC } from "react";
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
import { useFormWithZod } from "~/hooks/use-form-with-zod";
import { useSendContactEmail } from "../_hooks/use-send-contact-email";

// eslint-disable-next-line max-lines-per-function
export const ContactForm: FC = () => {
  const form = useFormWithZod({
    schema: contactEmailSchema,
    defaultValues: {
      email: "",
      message: "",
      subject: "",
    },
  });

  const { execute: sendEmail, status } = useSendContactEmail({
    onSuccess: () => {
      form.reset();
    },
  });

  return (
    <BasicFormWrapper
      className="grid grid-cols-2 gap-4"
      form={form}
      onValid={(values) => {
        sendEmail(values);
      }}
      schema={contactEmailSchema}
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
          onClick={() => {
            form.reset();
          }}
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
