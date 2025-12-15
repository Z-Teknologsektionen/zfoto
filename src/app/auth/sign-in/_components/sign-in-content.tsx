"use client";

import type { FC } from "react";
import { useSearchParams } from "next/navigation";
import { Fragment } from "react";
import { Separator } from "~/components/ui/separator";
import { SignInErrorCard } from "./sign-in-error-card";
import { SignInWithCredentialsForm } from "./sign-in-with-credentials-form";
import { SignInWithExternalProvider } from "./sign-in-with-external-provider";

export const SignInContent: FC = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? undefined;
  const error = searchParams.get("error");

  return (
    <Fragment>
      {error === "Default" && (
        <SignInErrorCard text="Okänt fel har inträffat. Försök igen senare!" />
      )}
      {error === "SessionRequired" && (
        <SignInErrorCard text="Du måste logga in för att se denna sida!" />
      )}
      <Separator />
      <SignInWithExternalProvider provider="google" callbackUrl={callbackUrl} />
      <Separator />
      {error === "CredentialsSignin" && (
        <SignInErrorCard text="Felaktiga uppgifter. Försök igen!" />
      )}
      <SignInWithCredentialsForm callbackUrl={callbackUrl} />
    </Fragment>
  );
};
