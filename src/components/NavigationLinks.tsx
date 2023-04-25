import { useSession } from "next-auth/react";
import Link from "next/link";
import type { FC } from "react";

export const NavigationLinks: FC = () => {
  const { status } = useSession();
  return (
    <>
      <li className="hover:text-[#a7a7a7]/80">
        <Link href="/">Hem</Link>
      </li>
      <li className="hover:text-[#a7a7a7]/80">
        <Link href="/about">Om</Link>
      </li>
      <li className="hover:text-[#a7a7a7]/80">
        <Link href="/contact">Kontakt</Link>
      </li>
      <li className="hover:text-[#a7a7a7]/80">
        <Link href="https://ztek.se">ztek.se</Link>
      </li>
      {status === "authenticated" && (
        <li className="hover:text-[#a7a7a7]/80">
          <Link href="/admin">Admin</Link>
        </li>
      )}
    </>
  );
};
