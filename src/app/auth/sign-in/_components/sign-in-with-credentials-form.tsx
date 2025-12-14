"use client";

import type { SignInOptions } from "next-auth/react";
import type { FC } from "react";
import { signIn } from "next-auth/react";
import { userSignInSchema } from "@/schemas/user";
import { BasicFormWrapper } from "~/components/form/basic-form-wrapper";
import {
  FormFieldInputEmail,
  FormFieldInputPassword,
} from "~/components/form/form-field-input";
import { Button } from "~/components/ui/button";
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
    <BasicFormWrapper
      form={form}
      schema={userSignInSchema}
      onValid={async ({ email, password }) =>
        signIn("credentials", {
          email,
          password,
          callbackUrl,
          redirect,
        })
      }
      className="grid gap-2"
    >
      <FormFieldInputEmail form={form} name="email" />
      <FormFieldInputPassword form={form} name="password" />
      <Button className="mt-2" type="submit">
        Logga in
      </Button>
    </BasicFormWrapper>
  );
};
