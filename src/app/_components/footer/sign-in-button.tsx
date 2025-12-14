"use client";

import { signIn } from "next-auth/react";
import type { FC } from "react";
import { Button } from "~/components/ui/button";

export const SignInButton: FC = () => (
  <Button
    variant="link"
    className="text-[#a7a7a7]"
    onClick={() => {
      void signIn();
    }}
  >
    Login
  </Button>
);
