import Link from "next/link";
import type { FC } from "react";
import { socialIconLinks } from "~/utils/links";

export const FooterSocialIconsRow: FC = () => (
  <ul className="flex h-10 flex-row gap-2 md:gap-4">
    {socialIconLinks.map(({ Icon, href, newPage = false, ariaLabel }) => (
      <li key={href}>
        <Link
          aria-label={ariaLabel}
          href={href}
          rel={newPage ? "noopener noreferrer" : undefined}
          target={newPage ? "_blank" : "_self"}
          className="grid size-10 place-items-center rounded-full border-2 border-gray-500 bg-white/90 p-1.5"
        >
          <Icon className="size-6 text-black shadow hover:scale-105 focus:scale-105 active:scale-95" />
        </Link>
      </li>
    ))}
  </ul>
);
