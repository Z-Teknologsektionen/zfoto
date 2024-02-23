"use client";

import { emailSchema } from "@/server/trpc/helpers/zodScheams";
import { FC } from "react";
import toast from "react-hot-toast";
import { z } from "zod";
import FormWrapper from "~/components/layout/FormWrapper";
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
import { useFormWithZodShema } from "~/hooks/useFormWithZodShema";
import { trpc } from "~/trpc/client";

type FormValuesType = z.infer<typeof emailSchema>;

const ContactForm: FC = () => {
  const form = useFormWithZodShema({
    schema: emailSchema,
    defaultValues: {
      email: "dennis@holmstrom.nu",
      message: "FÖRLÅT jag utvecklar hemsidan. Ber om ursäkt för spam",
      subject: "Dennis Leker",
    },
  });

  const { mutate: sendEmail, isLoading } =
    trpc.email.sendEmailAsUser.useMutation({
      onSuccess: () => toast.success("Sjukt, de funka"),
      onError: (err) => toast.error(err.message),
    });

  const onSubmit = (values: FormValuesType) => {
    sendEmail(values);
  };

  return (
    <FormWrapper form={form} onSubmit={onSubmit}>
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Epost</FormLabel>
            <FormControl>
              <Input type="email" placeholder="Fyll i din epost" {...field} />
            </FormControl>
            <FormDescription className="text-xs font-light">
              Används för att kunna svara på din fråga
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="subject"
        render={({ field }) => (
          <FormItem>
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
    </FormWrapper>
  );
};

export default ContactForm;
