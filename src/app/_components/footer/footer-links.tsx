import Link from "next/link";
import type { FC } from "react";
import { buttonVariants } from "~/components/ui/button";
import { orderdFooterLinks } from "~/utils/links";
import { cn } from "~/utils/utils";
import { FooterLinkItem } from "./footer-link-item";
import { SignInButton } from "./sign-in-button";

type FooterLinksProps = {
  isAuthenticated: boolean;
  isAdmin: boolean;
};

export const FooterLinks: FC<FooterLinksProps> = ({
  isAdmin,
  isAuthenticated,
}) => (
  <ul className="flex w-24 flex-col items-center justify-center gap-2 py-2 text-center text-sm md:w-full md:flex-row md:gap-4">
    {orderdFooterLinks.map(({ href, label, newPage }) => (
      <FooterLinkItem key={href} href={href} label={label} newPage={newPage} />
    ))}
    {!isAuthenticated && (
      <li>
        <SignInButton />
      </li>
    )}
    {isAdmin && (
      <li>
        <Link
          href="/admin"
          className={cn(
            buttonVariants({
              variant: "link",
              className: "text-[#a7a7a7]",
            }),
          )}
        >
          Adminpanel
        </Link>
      </li>
    )}
  </ul>
);
