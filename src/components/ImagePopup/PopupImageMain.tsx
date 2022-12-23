import Image from "next/image";
import type { FC } from "react";

export const PopupImageMain: FC<{ filename: string }> = ({ filename }) => {
  return (
    <div className="absolute inset-0 m-8 flex items-center justify-center md:my-12 md:mx-20">
      <Image
        alt=""
        className="object-contain object-center"
        onClick={(e) => {
          e.stopPropagation();
        }}
        src={filename ? `/images/lowres/${filename}` : ""}
        fill
        priority
        unoptimized
      />
    </div>
  );
};
