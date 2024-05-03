"use client";

import { userSignInForm } from "@/server/trpc/helpers/zodScheams";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  FormFieldInputEmail,
  FormFieldInputPassword,
} from "~/components/form/form-field-input";
import { Button, buttonVariants } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { Separator } from "~/components/ui/separator";
import { cn } from "~/utils/utils";

type UserSignInFormType = z.infer<typeof userSignInForm>;

const SignInContent = () => {
  const form = useForm<UserSignInFormType>({
    resolver: zodResolver(userSignInForm),
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl") || "";
  const error = searchParams?.get("error");

  return (
    <>
      {error === "SessionRequired" && (
        <div
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "grid place-items-center text-red-500",
          )}
        >
          <p>Du måste logga in för att se denna sida</p>
        </div>
      )}
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
      {error === "CredentialsSignin" && (
        <div
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "grid place-items-center text-red-500",
          )}
        >
          <p>Felaktiga uppgifter. Försök igen</p>
        </div>
      )}

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
