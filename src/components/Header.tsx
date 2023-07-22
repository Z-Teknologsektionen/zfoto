"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import type { FC } from "react";
import { useCallback, useState } from "react";
import { FaBars } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";
import { useLinks } from "~/utils/links";
import { HeaderNavLink } from "./HeaderNavLink";

export const Header: FC = () => {
  const [viewNav, setViewNav] = useState(false);
  const { pathname } = useRouter();

  const toggleNav = useCallback(() => {
    setViewNav((prev) => !prev);
  }, [setViewNav]);

  const closeNav = useCallback(() => {
    setViewNav(false);
  }, [setViewNav]);

  const { orderdHeaderLinks } = useLinks();

  return (
    <header className="relative z-20 flex h-16 justify-center bg-[#333333] px-4 py-3 text-[#a7a7a7] shadow">
      <div className="z-20 flex w-full max-w-7xl flex-row items-center justify-between">
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
        <nav
          className={`absolute left-0 right-0 top-full z-10 bg-[#333333] py-8 text-inherit
          ${
            viewNav
              ? "pointer-cursor pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-[125%] opacity-100"
          } 
          transition duration-1000
          lg:pointer-events-auto lg:relative lg:top-0 lg:translate-y-0 lg:cursor-pointer lg:bg-inherit lg:opacity-100
        `}
        >
          <ul className="flex flex-col items-center gap-4 text-lg lg:flex-row lg:text-base">
            {orderdHeaderLinks.map(({ href, label, newPage }) => (
              <HeaderNavLink
                key={href}
                closeNav={closeNav}
                href={href}
                label={label}
                newPage={newPage}
                pathname={pathname}
              />
            ))}
          </ul>
        </nav>
        <div className="z-20 lg:hidden">
          <button
            aria-label="Visa/dölj navigation"
            className="p-2 text-xl"
            onClick={toggleNav}
            type="button"
          >
            {!viewNav ? (
              <FaBars className="h-6 w-6" />
            ) : (
              <MdOutlineClose className="h-6 w-6 font-bold" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
