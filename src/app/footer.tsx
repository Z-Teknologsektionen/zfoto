"use client";

import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import { Button } from "~/components/ui/button";
import { useLinks } from "~/utils/links";

export const Footer: FC<{ session: Session | null }> = ({ session }) => {
  const { orderdFooterLinks, socialIconLinks } = useLinks(!!session?.user);

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
                  <Button asChild variant="link" className="text-[#a7a7a7]">
                    <Link
                      href={href}
                      rel={newPage ? "noopener noreferrer" : undefined}
                      target={newPage ? "_blank" : "_self"}
                    >
                      {label}
                    </Link>
                  </Button>
                </li>
              ))}
              <li>
                {session?.user ? (
                  <Button asChild variant="link" className="text-[#a7a7a7]">
                    <Link href="/admin">Admin</Link>
                  </Button>
                ) : (
                  <Button
                    variant="link"
                    className="text-[#a7a7a7]"
                    onClick={() => {
                      signIn("google", {
                        redirect: true,
                        callbackUrl: `${window.location.origin}/admin`,
                      });
                    }}
                  >
                    Admin
                  </Button>
                )}
              </li>
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
