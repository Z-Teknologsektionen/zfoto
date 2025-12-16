"use client";

import type { FC, PropsWithChildren } from "react";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment } from "react";
import { Button, buttonVariants } from "~/components/ui/button";

const DEFAULT_CHILDREN = (
  <Fragment>
    <ChevronLeft />
    <span>Tillbaka</span>
  </Fragment>
);

type BackButtonProps = {
  href?: string;
};

export const BackButton: FC<PropsWithChildren<BackButtonProps>> = ({
  href,
  children = DEFAULT_CHILDREN,
}) => {
  const router = useRouter();

  if (href !== undefined) {
    return (
      <Link
        href={href}
        className={buttonVariants({
          variant: "link",
          className: "-ml-8 w-fit",
        })}
      >
        {children}
      </Link>
    );
  }

  return (
    <Button
      variant="link"
      onClick={() => {
        if (window.history.length <= 2) router.push("/");
        else router.back();
      }}
      className="-ml-8 w-fit"
    >
      {children}
    </Button>
  );
};
