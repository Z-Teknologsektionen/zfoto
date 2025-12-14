import type { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { adminLikeRoles } from "@/constants/admin";
import { getAuth } from "~/utils/auth";
import { FooterLinks } from "./footer-links";
import { FooterSocialIconsRow } from "./footer-social-icons-row";

export const Footer: FC = async () => {
  const session = await getAuth();
  const isAuthenticated = session !== null;
  const isAdminLike =
    isAuthenticated && adminLikeRoles.includes(session.user.role);

  return (
    <div className="bg-[#333333] text-[#a7a7a7]">
      <footer className="container mx-auto flex flex-col items-center gap-8 py-16">
        <div className="flex w-full flex-row items-start justify-between gap-4 md:items-center">
          <Link className="hidden min-[425px]:block" href="/">
            <Image
              alt="Bild på zFotos logga"
              className="w-28 object-contain object-center"
              height={112}
              src="/zFoto.svg"
              width={112}
            />
          </Link>
          <FooterLinks
            isAdmin={isAdminLike}
            isAuthenticated={isAuthenticated}
          />
          <Link
            className="flex w-28 flex-col justify-between gap-2"
            href="https://ztek.se"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="text-center text-base">En del av:</span>
            <Image
              alt="Bild på Z-Teknologsektionens logga"
              className="object-contain object-left"
              height={90}
              quality={95}
              src="/ztek.png"
              width={90}
            />
          </Link>
        </div>
        <hr className="w-full" />
        <FooterSocialIconsRow />
      </footer>
    </div>
  );
};
