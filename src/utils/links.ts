import { useSession } from "next-auth/react";
import { useMemo } from "react";
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

export const useLinks = (): {
  orderdFooterLinks: SafeLinkType[];
  orderdHeaderLinks: SafeLinkType[];
} => {
  const { status } = useSession();
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
        label: "ztek.se",
        href: "http://www.ztek.se/",
        newPage: true,
        order: 99,
        useInHeader: true,
      },
    ];

    if (status === "authenticated") {
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
  }, [status]);

  const orderdLinks = links.sort((a, b) => (a.order >= b.order ? 1 : -1));
  const orderdHeaderLinks = orderdLinks.filter((a) => a.useInHeader);
  const orderdFooterLinks = orderdLinks.filter((a) => a.useInFooter);
  return { orderdHeaderLinks, orderdFooterLinks };
};
