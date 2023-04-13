import Link from "next/link";
import type { FC } from "react";
import { toast } from "react-hot-toast";
import { formatDateTimeString } from "~/utils/formatDateAndTimeStrings";
import type { RouterOutputs } from "~/utils/trpc";
import { trpc } from "~/utils/trpc";

export const AdminAlbumTable: FC<{
  images: RouterOutputs["album"]["getOneAsAdmin"]["images"];
  refetchAlbum: () => void;
}> = ({ images, refetchAlbum }) => {
  const singleImageMutation = trpc.image.updateOne.useMutation({
    onSettled: () => {
      refetchAlbum();
    },
    onError: () => {
      toast.error("Okänt fel, försök igen senare");
    },
    onSuccess: () => {
      toast.success("Updaterat bild!");
    },
  });
  return (
    <div className="mt-8 flex flex-col">
      {images.map((image) => {
        return (
          <div
            key={image.id}
            className="flex flex-col items-center justify-center gap-2 border-t py-1 text-center lg:grid lg:grid-cols-8 lg:text-left"
          >
            <img
              alt=""
              className="h-64 w-full max-w-xs object-contain object-center lg:h-32 lg:w-32"
              src={`/images/thumb/${image.filename}`}
            />
            <div className="col-span-3">
              <p>{image.filename}</p>
              <p>{formatDateTimeString(image.date)}</p>
            </div>
            <div className="col-span-2 flex flex-col-reverse lg:flex-col">
              <label className="">
                Foto: <br className="lg:hidden" />
                <input
                  className="inline-block text-center lg:text-left"
                  defaultValue={image.photographer}
                  onBlur={(e) => {
                    toast.loading("Updaterar bild...");
                    singleImageMutation.mutate({
                      imageId: image.id,
                      photographer: e.target.value.trim(),
                    });
                  }}
                  type="text"
                />
              </label>
              <Link
                className="underline-offset-2 hover:underline"
                href={`/image/${image.id}`}
              >
                Permanent länk
              </Link>
            </div>
            <div className="col-span-2 flex gap-2">
              <button
                className={`rounded border-2 py-3 px-4 ${
                  image.visible ? "bg-red-500" : "bg-yellow-500"
                }`}
                onClick={() => {
                  toast.loading("Updaterar bild...");
                  singleImageMutation.mutate({
                    imageId: image.id,
                    visible: !image.visible,
                  });
                }}
                type="button"
              >
                {image.visible ? "Dölj bild" : "Visa bild"}
              </button>
              <button
                className={`rounded border-2 py-3 px-4 ${
                  image.coverImage ? "bg-yellow-500" : "bg-green-500"
                }`}
                onClick={() => {
                  toast.loading("Updaterar bild...");
                  singleImageMutation.mutate({
                    imageId: image.id,
                    coverImage: !image.coverImage,
                  });
                }}
                type="button"
              >
                {image.coverImage ? "Ta bort omslag" : "Sätt till omslag"}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
