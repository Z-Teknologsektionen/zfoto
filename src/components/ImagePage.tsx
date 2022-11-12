import Image from "next/image";
import { useRouter } from "next/router";
import type { FC } from "react";
import { copyToClipboard } from "../utils/copyToClipboard";
import { trpc } from "../utils/trpc";

export const ImagePage: FC<{ imageId: string; albumId: string }> = ({
  imageId,
  albumId,
}) => {
  const router = useRouter();
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
  const { data: album } = trpc.album.getOne.useQuery(
    { albumId: albumId },
    { refetchOnWindowFocus: false }
  );

  const nextImageId = album?.images.filter((_, index) => {
    return album.images[index - 1]?.id === imageId;
  })[0]?.id;
  const prevImageId = album?.images.filter((_, index) => {
    return album.images[index + 1]?.id === imageId;
  })[0]?.id;
  const { filename, photographer } = image || {};
  const { tilte, description } = album || {};
  return (
    <section className="mx-auto max-w-7xl items-center justify-center">
      {isLoading ? (
        "Laddar..."
      ) : isError ? (
        "Error..."
      ) : (
        <div className="mx-auto flex min-h-[200px] max-w-5xl flex-row items-center justify-between gap-5">
          <button
            disabled={typeof prevImageId === "undefined"}
            onClick={() => {
              router.push(`/album/${albumId}/image/${prevImageId}`);
            }}
          >
            h
          </button>
          <div className="">
            <div className="relative h-full min-h-[500px]">
              <Image
                className="h-full object-contain object-center"
                src={filename ? `/images/${filename}` : "/"}
                alt={`Bild från ${tilte}, ${description}`}
                fill
              />
            </div>
            <div className="mt-8 flex flex-col gap-4 rounded-md bg-[#333333] py-4 px-8 text-[#a7a7a7] md:flex-row">
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
                Filename: {filename}
              </p>
              <textarea
                id="image-id"
                className="hidden"
                readOnly
                value={imageId}
              ></textarea>
            </div>
          </div>
          <button
            disabled={typeof nextImageId === "undefined"}
            onClick={() => {
              router.push(`/album/${albumId}/image/${nextImageId}`);
            }}
          >
            h
          </button>
        </div>
      )}
    </section>
  );
};
