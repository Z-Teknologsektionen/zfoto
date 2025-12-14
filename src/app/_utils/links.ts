import type { IconType } from "react-icons";
import { LuFacebook, LuInstagram, LuMail } from "react-icons/lu";
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

const socialIconLinks = [
  {
    newPage: true,
    Icon: LuInstagram,
    href: "https://www.instagram.com/zfotochalmers/",
    ariaLabel: "Se mer av oss på Instagram",
  },
  {
    newPage: true,
    Icon: LuFacebook,
    href: "https://www.facebook.com/ztekfoto",
    ariaLabel: "Se mer av oss på Facebook",
  },
  {
    Icon: LuMail,
    href: "/contact",
    ariaLabel: "Kontakta oss här",
  },
] satisfies SocialIconLinkType[] as readonly SocialIconLinkType[];

const links: LinkType[] = [
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
    href: "/albums",
    order: 5,
    useInHeader: true,
    useInFooter: true,
  },
];

const orderedLinks = links.sort((a, b) => (a.order >= b.order ? 1 : -1));

const orderedHeaderLinks: SafeLinkType[] = orderedLinks
  .filter((a) => a.useInHeader)
  .map(
    ({
      order: _order,
      useInFooter: _useInFooter,
      useInHeader: _useInHeader,
      ...rest
    }) => rest,
  );

const orderedFooterLinks: SafeLinkType[] = orderedLinks
  .filter((a) => a.useInFooter)
  .map(
    ({
      order: _order,
      useInFooter: _useInFooter,
      useInHeader: _useInHeader,
      ...rest
    }) => rest,
  );

export { orderedFooterLinks, orderedHeaderLinks, socialIconLinks };
