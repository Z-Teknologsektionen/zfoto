"use client";

import { Roles } from "@prisma/client";
import { Lock, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

const AvatarWithDropdown: FC<{ filename: string; role: Roles }> = ({
  filename,
  role,
}) => {
  const isAdmin = role === Roles.ADMIN;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-10 w-10">
          <AvatarImage src={filename} />
          <AvatarFallback>zFoto</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-2">
        {isAdmin && (
          <DropdownMenuItem asChild>
            <Link href={"/admin"}>
              <Lock className="mr-2 h-4 w-4" />
              <span>Admin panel</span>
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logga ut</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AvatarWithDropdown;
