import type { Image } from "@prisma/client";
import Link from "next/link";
import type { FC } from "react";

export const ImageInformation: FC<{
  image: Image;
}> = ({ image }) => {
  let origin = "";
  try {
    origin = window.location.origin;
  } catch {}

  return (
    <div className="mt-8 flex flex-col justify-center gap-4 rounded-md bg-[#333333] py-4 px-8 text-[#a7a7a7] md:flex-row">
      <p>Fotograf: {image?.photographer}</p>
      <Link href={`${origin}/image/${image.id}`}>
        Permanent länk till bilden
      </Link>
    </div>
  );
};
