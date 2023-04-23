import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import {
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlineMail,
} from "react-icons/ai";
import { useLinks } from "~/utils/links";
import SectionWrapper from "./layout/SectionWrapper";

export const Footer: FC = () => {
  const { status } = useSession();
  const { orderdFooterLinks } = useLinks();

  return (
    <div className="bg-[#333333] text-[#a7a7a7]">
      <SectionWrapper className="max-w-5xl py-16">
        <footer className="mx-auto flex flex-col items-center gap-8">
          <div className="flex w-full flex-col items-start justify-center  gap-8 md:flex-row md:items-center md:gap-4">
            <Image
              alt="Bild på zFotos logga"
              className="object-contain object-center"
              height={110}
              src="/zFoto.svg"
              width={110}
            />
            <div className="flex-grow">
              <ul className="flex w-full flex-col items-center justify-center gap-4 md:flex-row">
                {orderdFooterLinks.map(({ href, label, newPage }) => (
                  <li key={href}>
                    <Link
                      className="px-2 py-1 text-lg font-semibold hover:text-[#a7a7a7]/80 focus:text-[#a7a7a7]/80"
                      href={href}
                      rel={newPage ? "noopener noreferrer" : undefined}
                      target={newPage ? "_blank" : "_self"}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
                <li>
                  {status === "authenticated" ? (
                    <Link
                      className="px-2 py-1 text-lg font-semibold hover:text-[#a7a7a7]/80 focus:text-[#a7a7a7]/80"
                      href="/admin"
                    >
                      Admin sida
                    </Link>
                  ) : (
                    <button
                      className="px-2 py-1 text-lg font-semibold hover:text-[#a7a7a7]/80 focus:text-[#a7a7a7]/80"
                      onClick={() => {
                        signIn("google", {
                          redirect: true,
                          callbackUrl: `${window.location.origin}/admin`,
                        });
                      }}
                      type="button"
                    >
                      Logga in
                    </button>
                  )}
                </li>
              </ul>
            </div>

            <div className="flex flex-col justify-between gap-2">
              <span className="text-center text-base">En del av:</span>
              <Image
                alt="Bild på Z-teknologsektionens logga"
                className="object-contain object-left"
                height={90}
                quality={100}
                src="/ztek.png"
                width={90}
              />
            </div>
          </div>
          <hr className="w-full" />
          <ul className="flex h-10 flex-row gap-4">
            <li>
              <Link
                href="https://www.instagram.com/zfotochalmers/"
                rel="noopener noreferrer"
                target="_blank"
              >
                <AiOutlineInstagram className="h-10 w-10 rounded-full border-2 border-gray-500 bg-white/90 p-1.5 text-black shadow hover:scale-105 hover:text-black focus:scale-105 active:scale-95" />
              </Link>
            </li>
            <li>
              <Link
                href="https://www.facebook.com/ztekfoto"
                rel="noopener noreferrer"
                target="_blank"
              >
                <AiOutlineFacebook className="h-10 w-10 rounded-full border-2 border-gray-500 bg-white/90 p-1.5 text-black shadow hover:scale-105 hover:text-black focus:scale-105 active:scale-95" />
              </Link>
            </li>
            <li>
              <Link href="/contact" target="_self">
                <AiOutlineMail className="h-10 w-10 rounded-full border-2 border-gray-500 bg-white/90 p-1.5 text-black shadow hover:scale-105 hover:text-black focus:scale-105 active:scale-95" />
              </Link>
            </li>
          </ul>
        </footer>
      </SectionWrapper>
    </div>
  );
};
