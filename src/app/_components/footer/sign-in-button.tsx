"use client";

import { signIn } from "next-auth/react";
import { Button } from "../ui/button";

const SignInButton = () => {
  return (
    <Button
      variant="link"
      className="text-[#a7a7a7]"
      onClick={() => {
        signIn("google");
      }}
    >
      Login
    </Button>
  );
};

export default SignInButton;
