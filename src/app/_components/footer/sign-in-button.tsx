"use client";

import { signIn } from "next-auth/react";
import { Button } from "~/components/ui/button";

export const SignInButton = () => {
  return (
    <Button
      variant="link"
      className="text-[#a7a7a7]"
      onClick={() => {
        signIn();
      }}
    >
      Login
    </Button>
  );
};
