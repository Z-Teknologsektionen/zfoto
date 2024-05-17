"use client";

import { BuiltInProviderType } from "next-auth/providers";
import { SignInOptions, signIn } from "next-auth/react";
import Image from "next/image";
import { FC } from "react";
import { Button } from "~/components/ui/button";
import { capitalizeString } from "~/utils/string-utils";

type SignInWithExternalProviderProps = {
  imageUrl?: string;
  imageAlt?: string;
  provider: BuiltInProviderType;
  signInText?: string;
} & SignInOptions;

export const SignInWithExternalProvider: FC<
  SignInWithExternalProviderProps
> = ({
  provider,
  callbackUrl,
  redirect,
  imageUrl = `https://authjs.dev/img/providers/${provider}.svg`,
  imageAlt = `${capitalizeString(provider)}s logga`,
  signInText = `Logga in med ${capitalizeString(provider)}`,
}) => {
  return (
    <Button
      className="flex w-full flex-row justify-center gap-4"
      variant="outline"
      size="lg"
      onClick={() =>
        signIn(provider, {
          callbackUrl,
          redirect,
        })
      }
    >
      <Image alt={imageAlt} src={imageUrl} width={24} height={24} />
      <p className="font-medium">{signInText}</p>
    </Button>
  );
};
