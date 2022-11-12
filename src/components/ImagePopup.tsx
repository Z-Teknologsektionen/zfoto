import type { Album, Image as ImageType } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import type { FC } from "react";
import { copyToClipboard } from "../utils/copyToClipboard";

const ImagePopup: FC<{
  closeNav: () => void;
  prevImageId: string | undefined;
  nextImageId: string | undefined;
  album: (Album & { images: ImageType[] }) | undefined | null;
  image: ImageType | undefined | null;
}> = ({ closeNav, prevImageId, nextImageId, album, image }) => {
  const router = useRouter();
  return (
    <section
      className={`absolute inset-0 place-items-center bg-white/75  ${
        image?.id !== "undefined" && typeof image?.id !== "undefined"
          ? "grid"
          : "hidden"
      }`}
    >
      <div
        className="absolute top-5 right-5"
        onClick={() => {
          closeNav();
        }}
      >
        x
      </div>
      <div className="mx-auto flex max-w-5xl flex-row items-center justify-between gap-5">
        <button
          disabled={typeof prevImageId === "undefined"}
          onClick={() => {
            router.push(`/test/${album?.id}?imageId=${prevImageId}`);
          }}
        >
          h
        </button>
        <div className="">
          <div className="relative h-full min-h-[500px]">
            <Image
              className="h-full object-contain object-center"
              src={image?.filename ? `/images/${image.filename}` : "/"}
              alt={`Bild från ${album?.tilte}, ${album?.description}`}
              fill
            />
          </div>
          <div className="mt-8 flex flex-col gap-4 rounded-md bg-[#333333] py-4 px-8 text-[#a7a7a7] md:flex-row">
            <p>Fotograf: {image?.photographer}</p>
            <Link
              href={`${window.location.origin}/test/${album?.id}?imageId=${nextImageId}`}
            >
              Permanent länk till bilden
            </Link>
            <p
              className="cursor-copy"
              onClick={() => {
                copyToClipboard("image-id");
              }}
            >
              Filename: {image?.filename}
            </p>
            <textarea
              id="image-id"
              className="hidden"
              readOnly
              value={image?.id}
            ></textarea>
          </div>
        </div>
        <button
          disabled={typeof nextImageId === "undefined"}
          onClick={() => {
            router.push(`/test/${album?.id}?imageId=${nextImageId}`);
          }}
        >
          h
        </button>
      </div>
    </section>
  );
};

export default ImagePopup;
