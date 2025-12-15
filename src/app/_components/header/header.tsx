import type { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { getAuth } from "~/utils/auth";
import { HeaderAvatarWithDropdown } from "./header-avatar-with-dropdown";
import { HeaderMainNav } from "./header-main-nav";
import { HeaderMobileNav } from "./header-mobile-nav";

export const Header: FC = async () => {
  const session = await getAuth();

  return (
    <div className="bg-[#333333] text-[#a7a7a7]">
      <header className="container flex h-16 flex-row items-center justify-between gap-8">
        <Link
          className="z-20 flex flex-row items-center justify-center"
          href="/"
        >
          <Image
            alt="zFotos logotyp"
            className="object-contain object-center"
            height="40"
            src="/zFoto.svg"
            width="40"
          />
          <span className="ml-4 mr-6 text-lg font-semibold">zFoto</span>
        </Link>
        <div className="flex flex-row items-center justify-center gap-4">
          <HeaderMainNav />
          {session !== null && (
            <HeaderAvatarWithDropdown
              role={session.user.role}
              filename={session.user.image ?? ""}
              name={session.user.name}
            />
          )}
          <HeaderMobileNav />
        </div>
      </header>
    </div>
  );
};
