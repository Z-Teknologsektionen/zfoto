"use client";

import { userSignInForm } from "@/server/trpc/helpers/zodScheams";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInOptions, signIn } from "next-auth/react";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  FormFieldInputEmail,
  FormFieldInputPassword,
} from "~/components/form/form-field-input";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";

type UserSignInFormType = z.infer<typeof userSignInForm>;

type SignInWithCredentialsFormProps = {} & SignInOptions;

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
        onSubmit={form.handleSubmit(({ email, password }) =>
          signIn("credentials", {
            email: email,
            password: password,
            callbackUrl,
            redirect,
          }),
        )}
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
