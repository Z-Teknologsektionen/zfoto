import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import AvatarWithDropdown from "./avatar-with-dropdown";
import MainNav from "./main-nav";
import MobileNav from "./mobile-nav";

const Header: FC<{ session: Session | null }> = ({ session }) => {
  return (
    <div className="bg-[#333333] text-[#a7a7a7]">
      <header
        className={`container flex h-16 flex-row items-center justify-between gap-8`}
      >
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
          <MainNav />
          {session?.user && (
            <AvatarWithDropdown
              role={session.user.role}
              filename={session.user.image || ""}
              name={session.user.name}
            />
          )}
          <MobileNav />
        </div>
      </header>
    </div>
  );
};

export default Header;
