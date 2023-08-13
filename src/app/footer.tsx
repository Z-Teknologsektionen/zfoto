"use client";

import { Roles } from "@prisma/client";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import { Button, buttonVariants } from "~/components/ui/button";
import { orderdFooterLinks, socialIconLinks } from "~/utils/links";
import { cn } from "~/utils/utils";

export const Footer: FC<{ session: Session | null }> = ({ session }) => {
  const isAuthenticated = !!session?.user;
  const isAdmin = isAuthenticated && session.user.role === Roles.ADMIN;

  return (
    <div className="bg-[#333333] text-[#a7a7a7]">
      <section className="container py-16">
        <footer className="mx-auto flex flex-col items-center gap-8">
          <div className="flex w-full flex-row items-start justify-between gap-4 md:items-center">
            <Link className="hidden min-[425px]:block" href="/">
              <Image
                alt="Bild på zFotos logga"
                className="w-28 object-contain object-center "
                height={112}
                src="/zFoto.svg"
                width={112}
              />
            </Link>

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
                  <Button
                    variant="link"
                    className="text-[#a7a7a7]"
                    onClick={() => {
                      signIn("google");
                    }}
                  >
                    Login
                  </Button>
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
            <Link
              className="flex w-28 flex-col justify-between gap-2"
              href="https://ztek.se"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="text-center text-base">En del av:</span>
              <Image
                alt="Bild på Z-teknologsektionens logga"
                className="object-contain object-left"
                height={90}
                quality={100}
                src="/ztek.png"
                width={90}
              />
            </Link>
          </div>
          <hr className="w-full" />
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
        </footer>
      </section>
    </div>
  );
};
