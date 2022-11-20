import type { Album, Image as ImageType } from "@prisma/client";
import Link from "next/link";
import type { FC } from "react";

export const ImageInformation: FC<{
  image: ImageType;
  album: (Album & { images: ImageType[] }) | null | undefined;
}> = ({ image, album }) => {
  let origin = "";
  try {
    origin = window.location.origin;
  } catch {}

  return (
    <div className="mt-8 flex flex-col justify-center gap-4 rounded-md bg-[#333333] py-4 px-8 text-[#a7a7a7] md:flex-row">
      <p>Fotograf: {image?.photographer}</p>
      <Link
        target="_blank"
        href={`${origin}/album/${album?.id}?imageId=${image.id}`}
      >
        Permanent länk till bilden
      </Link>
    </div>
  );
};
