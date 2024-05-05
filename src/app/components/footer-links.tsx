import Link from "next/link";
import { FC } from "react";
import { buttonVariants } from "~/components/ui/button";
import { orderdFooterLinks } from "~/utils/links";
import { cn } from "~/utils/utils";
import SignInButton from "./sign-in-button";

const FooterLinks: FC<{ isAuthenticated: boolean; isAdmin: boolean }> = ({
  isAdmin,
  isAuthenticated,
}) => {
  return (
    <ul className="flex w-24 flex-col items-center justify-center gap-2 py-2 text-center text-sm md:w-full md:flex-row md:gap-4">
      {orderdFooterLinks.map(({ href, label, newPage }) => (
        <li key={href}>
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
      ))}
      {!isAuthenticated && (
        <li>
          <SignInButton />
        </li>
      )}
      {isAdmin && (
        <li>
          <Link
            href={"/admin"}
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
};

export default FooterLinks;
