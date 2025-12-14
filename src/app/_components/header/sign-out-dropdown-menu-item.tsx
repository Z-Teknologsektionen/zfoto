"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import type { FC } from "react";
import { DropdownMenuItem } from "../ui/dropdown-menu";

export const SignOutDropdownMenuItem: FC = () => (
  <DropdownMenuItem onClick={() => void signOut({ callbackUrl: "/" })}>
    <LogOut className="mr-2 size-4" />
    <span>Logga ut</span>
  </DropdownMenuItem>
);
