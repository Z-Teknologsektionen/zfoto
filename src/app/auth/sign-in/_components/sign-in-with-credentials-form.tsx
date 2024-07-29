"use client";

import { userSignInForm } from "@/schemas/helpers/zodScheams";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SignInOptions } from "next-auth/react";
import { signIn } from "next-auth/react";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import {
  FormFieldInputEmail,
  FormFieldInputPassword,
} from "~/components/form/form-field-input";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";

type UserSignInFormType = z.infer<typeof userSignInForm>;

type SignInWithCredentialsFormProps = SignInOptions;

export const SignInWithCredentialsForm: FC<SignInWithCredentialsFormProps> = ({
  callbackUrl,
  redirect,
}) => {
  const form = useForm<UserSignInFormType>({
    resolver: zodResolver(userSignInForm),
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
