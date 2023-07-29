"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { Button } from "~/_components/ui/button";

const BackButton: FC = () => {
  const router = useRouter();
  return (
    <Button
      variant={"link"}
      onClick={() => router.back()}
      className="-ml-8 w-fit"
    >
      <ChevronLeft />
      <span>Tillbaka</span>
    </Button>
  );
};

export default BackButton;
