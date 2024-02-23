"use client";

import { userSignInForm } from "@/server/trpc/helpers/zodScheams";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormFieldInputEmail from "../../_components/form/form-field-input-email";
import FormFieldInputPassword from "../../_components/form/form-field-input-password";
import { Button } from "../../_components/ui/button";
import { Form } from "../../_components/ui/form";
import { Separator } from "../../_components/ui/separator";

type UserSignInFormType = z.infer<typeof userSignInForm>;

const SignInContent = () => {
  const form = useForm<UserSignInFormType>({
    resolver: zodResolver(userSignInForm),
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl") || "";

  return (
    <>
      <Button
        className="flex w-full flex-row justify-center gap-4"
        variant="outline"
        size="lg"
        onClick={() =>
          signIn("google", {
            redirect: true,
            callbackUrl: callbackUrl,
          })
        }
      >
        <Image
          alt="Google logo"
          src={"https://authjs.dev/img/providers/google.svg"}
          width={24}
          height={24}
        />
        <p className="font-medium">Logga in med Google</p>
      </Button>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(({ email, password }) =>
            signIn("credentials", {
              email: email,
              password: password,
              redirect: true,
              callbackUrl: callbackUrl,
            }),
          )}
          className="grid gap-4"
        >
          <FormFieldInputEmail form={form} name="email" />
          <FormFieldInputPassword form={form} name="password" />
          <Button type="submit">Logga in</Button>
        </form>
      </Form>
    </>
  );
};

export default SignInContent;
