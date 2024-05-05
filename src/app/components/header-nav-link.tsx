"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { FC } from "react";
import type { SafeLinkType } from "~/utils/links";

type HeaderNavLinkProps = SafeLinkType & {
  closeNav?: () => void;
};

export const HeaderNavLink: FC<HeaderNavLinkProps> = ({
  closeNav,
  href,
  newPage,
  label,
}) => {
  const pathname = usePathname();

  return (
    <li>
      <Link
        className={`border-b-2 px-2 py-1 hover:text-[#a7a7a7]/80 focus:text-[#a7a7a7]/80
          ${
            pathname?.startsWith(href)
              ? "border-transparent font-bold lg:border-[#a7a7a7]/80"
              : "border-transparent font-normal"
          }
        `}
        href={href}
        onClick={closeNav}
        rel={newPage ? "noopener noreferrer" : undefined}
        target={newPage ? "_blank" : "_self"}
      >
        {label}
      </Link>
    </li>
  );
};
