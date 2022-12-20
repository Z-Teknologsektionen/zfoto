import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import { NavigationLinks } from "./NavigationLinks";

export const Header: FC = () => {
  return (
    <header className="flex h-16 justify-center bg-[#333333] py-3 px-4 text-[#a7a7a7] shadow-xl sm:px-14">
      <div className="flex w-full max-w-7xl flex-row items-center justify-between">
        <Link className="flex flex-row items-center justify-center" href="/">
          <Image
            alt="zFotos logotyp"
            className="object-contain object-center"
            height="40"
            src="/zFoto.png"
            width="40"
          />
          <h1 className="ml-4 mr-6 text-lg font-semibold">zFoto</h1>
        </Link>
        <nav>
          <ul className="flex flex-row gap-3 sm:gap-6">
            <NavigationLinks />
          </ul>
        </nav>
      </div>
    </header>
  );
};
