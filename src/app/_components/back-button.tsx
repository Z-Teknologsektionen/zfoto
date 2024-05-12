"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, PropsWithChildren } from "react";
import { Button, buttonVariants } from "~/components/ui/button";

const BackButton: FC<PropsWithChildren<{ href?: string }>> = ({
  href,
  children = (
    <>
      <ChevronLeft />
      <span>Tillbaka</span>
    </>
  ),
}) => {
  const router = useRouter();

  if (href) {
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
        if (window.history.length === 1) {
          router.push("/");
        }
        router.back();
      }}
      className="-ml-8 w-fit"
    >
      {children}
    </Button>
  );
};

export default BackButton;
