import Link from "next/link";
import type { FC } from "react";

export const NavigationLinks: FC = () => {
  return (
    <>
      <li className="hover:text-[#a7a7a7]/80">
        <Link href={"/"}>Hem</Link>
      </li>
      <li className="hover:text-[#a7a7a7]/80">
        <Link href={"/about"}>Om</Link>
      </li>
      <li className="hover:text-[#a7a7a7]/80">
        <Link href={"/contact"}>Kontakt</Link>
      </li>
      <li className="hover:text-[#a7a7a7]/80">
        <Link href={"https://ztek.se"}>ztek.se</Link>
      </li>
    </>
  );
};
