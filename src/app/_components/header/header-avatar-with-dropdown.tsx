import { adminLikeRoles } from "@/constants/admin";
import { Roles } from "@prisma/client";
import { Lock } from "lucide-react";
import Link from "next/link";
import { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { SignOutDropdownMenuItem } from "./sign-out-dropdown-menu-item";

type HeaderAvatarWithDropdownProps = {
  filename: string;
  role: Roles;
  name: string;
};

export const HeaderAvatarWithDropdown: FC<HeaderAvatarWithDropdownProps> = ({
  filename,
  role,
  name,
}) => {
  const hasAdminLikeRole = adminLikeRoles.includes(role);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="z-20 h-10 w-10">
          <AvatarImage src={filename} />
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-2">
        {hasAdminLikeRole && (
          <DropdownMenuItem asChild>
            <Link href={"/admin"}>
              <Lock className="mr-2 h-4 w-4" />
              <span>Adminpanel</span>
            </Link>
          </DropdownMenuItem>
        )}
        <SignOutDropdownMenuItem />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
