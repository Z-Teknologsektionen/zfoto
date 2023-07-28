"use client";

import { signIn } from "next-auth/react";
import { FC } from "react";
import { Button } from "~/components/ui/button";

const SignInButton: FC = () => {
  return <Button onClick={() => signIn("google")}>Logga in</Button>;
};

export default SignInButton;
