"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, type FC, type PropsWithChildren } from "react";
import { Button, buttonVariants } from "~/components/ui/button";

type BackButtonProps = {
  href?: string;
};

export const BackButton: FC<PropsWithChildren<BackButtonProps>> = ({
  href,
  children = (
    <Fragment>
      <ChevronLeft />
      <span>Tillbaka</span>
    </Fragment>
  ),
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
