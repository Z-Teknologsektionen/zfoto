import Link from "next/link";
import type { FC } from "react";

type ImagePopupFooterProps = {
  photographer: string;
  filename: string;
  id: string;
};

export const ImagePopupFooter: FC<ImagePopupFooterProps> = ({
  photographer,
  filename,
  id,
}) => (
  <footer className="flex w-full flex-col justify-center gap-x-4 gap-y-1 bg-white p-4 text-center text-xs font-medium md:flex-row lg:text-lg">
    <p>Fotograf: {photographer}</p>
    <p>Filnamn: {filename}</p>
    <Link className="cursor-pointer underline" href={`/image/${id}`}>
      Permanent länk
    </Link>
  </footer>
);
