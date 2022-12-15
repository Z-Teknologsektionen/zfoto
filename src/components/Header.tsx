import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import zFotoLogo from "../../public/zfoto.png";
import { NavigationLinks } from "./NavigationLinks";

export const Header: FC = () => {
  return (
    <header className="flex h-16 place-items-center bg-[#333333] py-3 px-4 text-[#a7a7a7] shadow-xl sm:px-14">
      <div className="flex w-full max-w-7xl flex-row items-center justify-between">
        <Link href={"/"} className="flex flex-row items-center justify-center">
          <Image
            src={zFotoLogo}
            alt={"zFotos logotyp"}
            height="40"
            width="40"
            className="object-contain object-center"
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
