import type { Album, Image as ImageType } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/router";
import type { FC } from "react";

export const ImageGridItem: FC<{
  id: string;
  filename: string;
  album: Album & { images: ImageType[] };
}> = ({ id, filename, album }) => {
  const router = useRouter();
  return (
    <div
      className="relative h-[250px] w-full max-w-xs p-2"
      key={id}
      onClick={() => {
        router.push(`/album/${album.id}?imageId=${id}`);
        document.body.classList.add("overflow-hidden");
      }}
    >
      <Image
        className={`
          object-contain object-center
          before:absolute before:inset-0 before:z-0 before:rounded-3xl before:bg-black/10 before:p-4 before:content-[''] 
        `}
        src={filename ? `/images/${filename}` : ""}
        alt={`${album.title}, ${album.description}`}
        fill
        sizes="(min-width: 768px) 40vw,
              (min-width: 1024px) 20vw,
              75vw"
      />
    </div>
  );
};
