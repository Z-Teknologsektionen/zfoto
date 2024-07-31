"use client";

import { userSignInSchema } from "@/schemas/user";
import type { SignInOptions } from "next-auth/react";
import { signIn } from "next-auth/react";
import type { FC } from "react";
import {
  FormFieldInputEmail,
  FormFieldInputPassword,
} from "~/components/form/form-field-input";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { useFormWithZod } from "~/hooks/use-form-with-zod";

type SignInWithCredentialsFormProps = SignInOptions;

export const SignInWithCredentialsForm: FC<SignInWithCredentialsFormProps> = ({
  callbackUrl,
  redirect,
}) => {
  const form = useFormWithZod({
    schema: userSignInSchema,
  });

  return (
    <Form {...form}>
      <form
        onSubmit={
          void form.handleSubmit(async ({ email, password }) =>
            signIn("credentials", {
              email,
              password,
              callbackUrl,
              redirect,
            }),
          )
        }
        className="grid gap-2"
      >
        <FormFieldInputEmail form={form} name="email" />
        <FormFieldInputPassword form={form} name="password" />
        <Button className="mt-2" type="submit">
          Logga in
        </Button>
      </form>
    </Form>
  );
};
