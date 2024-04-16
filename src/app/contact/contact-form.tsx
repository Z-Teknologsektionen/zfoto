"use client";

import { emailSchema } from "@/server/trpc/helpers/zodScheams";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import FormFieldInputEmail from "~/components/form/form-field-input-email";
import BasicFormWrapper from "~/components/layout/BasicFormWrapper";
import { Button } from "~/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { trpc } from "~/trpc/client";

const ContactForm: FC = () => {
  const { mutate: sendEmail, isLoading } =
    trpc.email.sendEmailAsUser.useMutation({
      onSuccess: () => toast.success("Sjukt, de funka"),
      onError: (err) => toast.error(err.message),
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
      <FormField
        control={form.control}
        name="subject"
        render={({ field }) => (
          <FormItem className="col-span-2 md:col-span-1">
            <FormLabel>Ämne</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Fyll i ditt ämne" {...field} />
            </FormControl>
            <FormDescription className="text-xs font-light">
              Används som rubrik i ditt mail
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
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
          disabled={isLoading}
        >
          Återställ
        </Button>
        <Button
          type="submit"
          disabled={isLoading}
          variant="default"
          size="default"
        >
          Skicka
        </Button>
      </div>
    </BasicFormWrapper>
  );
};

export default ContactForm;
