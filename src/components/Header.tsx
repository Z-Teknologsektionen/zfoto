import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import { NavigationLinks } from "./NavigationLinks";

export const Header: FC = () => {
  return (
    <header className="flex h-16 flex-row items-center justify-between bg-[#333333] py-3 px-4 text-[#a7a7a7] shadow-xl sm:px-14">
      <Link href={"/"} className="flex flex-row items-center justify-center">
        <Image
          src="/zFoto.png"
          alt={""}
          height="40"
          width="40"
          className="object-contain object-center"
        />
        <h1 className="ml-3 mr-6 text-lg font-semibold">zFoto</h1>
      </Link>
      <div>
        <nav>
          <ul className="flex flex-row gap-3 sm:gap-6">
            <NavigationLinks />
          </ul>
        </nav>
      </div>
    </header>
  );
};
