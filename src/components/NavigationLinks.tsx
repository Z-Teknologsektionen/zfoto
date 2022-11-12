import Link from "next/link";
import type { FC } from "react";

export const NavigationLinks: FC = () => {
  return (
    <>
      <li>
        <Link href={"/"}>Hem</Link>
      </li>
      <li>
        <Link href={"/about"}>Om</Link>
      </li>
      <li>
        <Link href={"/contact"}>Kontakt</Link>
      </li>
    </>
  );
};
