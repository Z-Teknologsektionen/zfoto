import { useMemo } from "react";
import {
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlineMail,
} from "react-icons/ai";
import type { IconType } from "react-icons/lib";
import type { NrRange } from "ts-number-range";

export type LinkType = {
  href: string;
  label: string;
  newPage?: boolean;
  order: NrRange<1, 100>;
  useInFooter?: boolean;
  useInHeader?: boolean;
};

export type SafeLinkType = Omit<
  LinkType,
  "order" | "useInFooter" | "useInHeader"
>;

type SocialIconLinkType = {
  Icon: IconType;
  ariaLabel: string;
  href: string;
  newPage?: boolean;
};

export const useLinks = (
  isAuth: boolean
): {
  orderdFooterLinks: SafeLinkType[];
  orderdHeaderLinks: SafeLinkType[];
  socialIconLinks: SocialIconLinkType[];
} => {
  const socialIconLinks: SocialIconLinkType[] = [
    {
      newPage: true,
      Icon: AiOutlineInstagram,
      href: "https://www.instagram.com/zfotochalmers/",
      ariaLabel: "Se mer av oss på Instagram",
    },
    {
      newPage: true,
      Icon: AiOutlineFacebook,
      href: "https://www.facebook.com/ztekfoto",
      ariaLabel: "Se mer av oss på Facebook",
    },
    {
      Icon: AiOutlineMail,
      href: "/contact",
      ariaLabel: "Kontakta oss här",
    },
  ];

  const links: LinkType[] = useMemo(() => {
    let tempLinks: LinkType[] = [
      {
        label: "Hem",
        href: "/",
        order: 1,
        useInHeader: true,
        useInFooter: true,
      },
      {
        label: "Om",
        href: "/about",
        order: 2,
        useInHeader: true,
        useInFooter: true,
      },
      {
        label: "Kontakt",
        href: "/contact",
        order: 3,
        useInHeader: true,
      },
      {
        label: "Policy",
        href: "/terms",
        order: 4,
        useInHeader: true,
        useInFooter: true,
      },
      {
        label: "Arkiv",
        href: "/album",
        order: 4,
        useInHeader: true,
        useInFooter: true,
      },
      {
        label: "ztek.se",
        href: "http://www.ztek.se/",
        newPage: true,
        order: 99,
        useInHeader: true,
      },
    ];

    if (isAuth) {
      tempLinks = [
        ...tempLinks,
        {
          label: "Admin",
          href: "/admin",
          order: 90,
          useInHeader: true,
        },
      ];
    }

    return tempLinks;
  }, [isAuth]);

  const orderdLinks = links.sort((a, b) => (a.order >= b.order ? 1 : -1));
  const orderdHeaderLinks = orderdLinks.filter((a) => a.useInHeader);
  const orderdFooterLinks = orderdLinks.filter((a) => a.useInFooter);
  return { orderdHeaderLinks, orderdFooterLinks, socialIconLinks };
};
