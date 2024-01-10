import Link from "next/link";
import { FC } from "react";
import { socialIconLinks } from "~/utils/links";

const SocialIconsRow: FC = () => {
  return (
    <ul className="flex h-10 flex-row gap-2 md:gap-4">
      {socialIconLinks.map(({ Icon, href, newPage, ariaLabel }) => (
        <li key={href}>
          <Link
            aria-label={ariaLabel}
            href={href}
            rel={newPage ? "noopener noreferrer" : undefined}
            target={newPage ? "_blank" : "_self"}
          >
            <Icon className="h-10 w-10 rounded-full border-2 border-gray-500 bg-white/90 p-1.5 text-black shadow hover:scale-105 hover:text-black focus:scale-105 active:scale-95" />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SocialIconsRow;
