import Link from "next/link";
import type { FC } from "react";

export const ImageInformation: FC<{
  id: string;
  photographer: string;
}> = ({ id, photographer }) => {
  let origin = "";
  try {
    origin = window.location.origin;
  } catch {
    origin = "";
  }

  return (
    <div className="mt-8 flex flex-col justify-center gap-4 rounded-md bg-[#333333] py-4 px-8 text-[#a7a7a7] md:m-0 md:h-full md:p-4 ">
      <p>
        Fotograf:
        {photographer}
      </p>
      <Link href={`${origin}/image/${id}`}>Permanent länk till bilden</Link>
    </div>
  );
};
