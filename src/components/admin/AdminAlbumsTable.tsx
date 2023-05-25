import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import type { FC } from "react";
import { toast } from "react-hot-toast";
import { formatDateTimeString } from "~/utils/formatDateAndTimeStrings";
import type { RouterOutputs } from "~/utils/trpc";
import { trpc } from "~/utils/trpc";
import Button from "../Button";

export const AdminAlbumsTable: FC<{
  albums: RouterOutputs["album"]["getAllAsAdmin"];
  refetchAllAlbums: () => void;
}> = ({ refetchAllAlbums, albums }) => {
  const { push } = useRouter();
  const { mutate: mutateAlbum } = trpc.album.updateOne.useMutation({
    onSettled: () => {
      refetchAllAlbums();
    },
    onError: () => {
      toast.error("Okänt fel, försök igen senare");
    },
    onSuccess: () => {
      toast.success("Successfully updated album");
    },
  });

  return (
    <div className="mt-4 flex flex-col border-b">
      {albums.map((album) => {
        return (
          <div
            key={album.id}
            className="flex flex-col items-center gap-2 border-t py-2 lg:grid lg:grid-cols-8 lg:gap-4"
          >
            <Image
              alt={`Cover image for album: "${album.title}"`}
              className="col-span-1 mx-auto max-w-xs object-contain object-center lg:max-h-[128px] lg:max-w-[128px]"
              height={1}
              src={`/images/thumb/${album.coverImageFilename}`}
              style={{
                width: "auto",
                height: "auto",
              }}
              width={1}
              unoptimized
            />
            <Link className="col-span-2 w-full" href={`/album/${album.id}`}>
              <div className="text-center lg:text-left">
                <h2 className="text-xl font-semibold">{album.title}</h2>
                <p className="underline-offset-2 hover:underline">{`${album.id}`}</p>
              </div>
            </Link>
            <div className="col-span-2">
              <p>{formatDateTimeString(album.date)}</p>
            </div>
            <div className="col-span-1">
              <p>{`Images: ${album._count.images}`}</p>
            </div>
            <div className="col-span-2 ml-auto flex w-fit flex-row items-center justify-center gap-2 lg:flex-col">
              <Button
                danger={album.visible}
                label={album.visible ? "Dölj album" : "Visa album"}
                onClick={() => {
                  toast.loading("Updating album");
                  mutateAlbum({
                    albumId: album.id,
                    visible: !album.visible,
                  });
                }}
                submit={!album.visible}
                type="button"
                fullWidth
              />
              <Button
                label="Redigera album"
                onClick={() => push(`/admin/album/${album.id}`)}
                type="button"
                fullWidth
                warning
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
