import Link from "next/link";
import { FC } from "react";
import { buttonVariants } from "~/components/ui/button";
import { SafeLinkType } from "~/utils/links";
import { cn } from "~/utils/utils";

export const FooterLinkItem: FC<SafeLinkType> = ({ href, label, newPage }) => {
  return (
    <li>
      <Link
        href={href}
        rel={newPage ? "noopener noreferrer" : undefined}
        target={newPage ? "_blank" : "_self"}
        className={cn(
          buttonVariants({
            variant: "link",
            className: "text-[#a7a7a7]",
          }),
        )}
      >
        {label}
      </Link>
    </li>
  );
};
