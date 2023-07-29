"use client";

import { HeaderNavLink } from "@/app/header-nav-link";
import { Menu, X } from "lucide-react";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, useState } from "react";
import { Button } from "~/components/ui/button";
import { useLinks } from "~/utils/links";
import AvatarWithDropdown from "./avatar-with-dropdown";

const Header: FC<{ session: Session | null }> = ({ session }) => {
  const pathname = usePathname();
  const [viewNav, setViewNav] = useState(false);
  const { orderdHeaderLinks } = useLinks();

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
          <nav
            className={`absolute inset-0 z-10 mt-16 bg-[#333333]/75 py-8 text-inherit
          ${viewNav ? "pointer-cursor block" : "pointer-events-none hidden"} 
          transition duration-1000
          lg:pointer-events-auto lg:relative lg:inset-auto lg:mt-0 lg:block lg:translate-y-0 lg:cursor-pointer lg:bg-inherit lg:opacity-100
        `}
          >
            <ul className="flex flex-col items-center gap-4 text-lg lg:flex-row lg:text-base">
              {orderdHeaderLinks.map(({ href, label, newPage }) => (
                <HeaderNavLink
                  key={href}
                  closeNav={() => {
                    if (viewNav) {
                      setViewNav(false);
                    }
                  }}
                  href={href}
                  label={label}
                  newPage={newPage}
                  pathname={pathname}
                />
              ))}
            </ul>
          </nav>
          {session?.user && (
            <AvatarWithDropdown
              role={session.user.role}
              filename={session?.user.image || ""}
            />
          )}
          <Button
            variant="ghost"
            size="icon"
            aria-label="Visa/dölj navigation"
            className="lg:hidden"
            onClick={() => setViewNav((prev) => !prev)}
            type="button"
          >
            {!viewNav ? (
              <Menu className="h-6 w-6" />
            ) : (
              <X className="h-6 w-6 font-bold" />
            )}
          </Button>
        </div>
      </header>
    </div>
  );
};

export default Header;
