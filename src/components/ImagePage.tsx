import Image from "next/image";
import type { FC } from "react";
import { copyToClipboard } from "../utils/copyToClipboard";
import { trpc } from "../utils/trpc";

export const ImagePage: FC<{ imageId: string; albumId: string }> = ({
  imageId,
  albumId,
}) => {
  const {
    data: image,
    isLoading,
    isError,
  } = trpc.image.getOne.useQuery(
    { imageId: imageId },
    {
      refetchOnWindowFocus: false,
    }
  );
  const { data: album } = trpc.album.getOne.useQuery({ albumId });
  const { filename, photographer } = image || {};
  const { tilte } = album || {};
  return (
    <section className="mx-auto max-w-5xl items-center justify-center">
      {isLoading ? (
        "Laddar..."
      ) : isError ? (
        "Error..."
      ) : (
        <>
          <div className="relative h-full min-h-[200px] w-full">
            <Image
              src={filename ? `/images/${filename}` : ""}
              alt={`Bild från ${tilte}, ${""}`}
              fill
            />
          </div>
          <div className="mt-4 flex flex-col gap-4 bg-[#333333] p-2 text-[#a7a7a7] md:flex-row">
            <p>Fotograf: {photographer}</p>
            <p
              className="cursor-copy"
              onClick={() => {
                copyToClipboard("image-path");
              }}
            >
              Kopiera länken till bilden
            </p>
            <textarea
              readOnly
              id="image-path"
              className="hidden"
              value={`${window.location.origin}/album/${album?.id}/image/${imageId}`}
            ></textarea>
            <p
              className="cursor-copy"
              onClick={() => {
                copyToClipboard("image-id");
              }}
            >
              Filname: {filename}
            </p>
            <textarea
              id="image-id"
              className="hidden"
              readOnly
              value={imageId}
            ></textarea>
          </div>
        </>
      )}
    </section>
  );
};
