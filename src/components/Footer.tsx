import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import type { FC } from "react";
import { NavigationLinks } from "./NavigationLinks";

export const Footer: FC = () => {
  const { status } = useSession();
  return (
    <div className="bg-[#333333] text-[#a7a7a7] shadow-xl">
      <footer className="mx-auto mt-5 mb-16 grid max-w-lg grid-cols-1 items-start justify-center gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <h1 className="text-center text-2xl font-semibold underline underline-offset-8">
            zFoto
          </h1>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-center font-semibold underline underline-offset-8">
            Sociala medier
          </h2>
          <ul className="flex flex-row items-center justify-center gap-3 sm:flex-col">
            <li>
              <Link
                className="hover:text-[#a7a7a7]/80"
                href="https://www.instagram.com/zfotochalmers/"
                target="_blank"
              >
                Instagram
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-[#a7a7a7]/80"
                href="https://www.facebook.com/ztekfoto"
                target="_blank"
              >
                Facebook
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-center font-semibold underline underline-offset-8">
            Navigation
          </h2>
          <ul className="flex flex-row items-center justify-center gap-3 text-sm sm:flex-col">
            <NavigationLinks />
          </ul>
        </div>
        <Link
          className="text-center underline-offset-2 hover:underline sm:col-span-2"
          href="/terms"
        >
          Läs vår bildpolicy
        </Link>
        {status === "authenticated" ? (
          <Link
            className="mt-4 text-center text-sm sm:col-span-2"
            href="/admin"
          >
            Admin sida
          </Link>
        ) : (
          <button
            className="mt-4 text-center text-sm sm:col-span-2"
            onClick={() => {
              signIn("google", {
                redirect: true,
                callbackUrl: `${window.location.origin}/admin`,
              });
            }}
            type="button"
          >
            Admin login
          </button>
        )}
      </footer>
    </div>
  );
};
