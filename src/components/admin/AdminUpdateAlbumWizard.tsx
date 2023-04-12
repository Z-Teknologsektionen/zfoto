import type { FC } from "react";
import { toast } from "react-hot-toast";
import type { RouterOutputs } from "~/utils/trpc";
import { trpc } from "~/utils/trpc";

export const AdminUpdateAlbumWizard: FC<{
  album: RouterOutputs["album"]["getOneAsAdmin"];
  refetchAlbum: () => void;
}> = ({ refetchAlbum, album }) => {
  const singleAlbumMutation = trpc.album.updateOne.useMutation({
    onSettled: () => {
      refetchAlbum();
    },
    onError: (e) => {
      toast.error(e.data?.code ?? "Unknown error, try again later!");
    },
    onSuccess: () => {
      toast.success("Successfully updated album");
    },
  });
  return (
    <div className="mt-4 flex flex-row items-center justify-between">
      <div className="mx-auto flex max-w-lg flex-col gap-1 lg:mx-0">
        <input
          className="text-xl font-semibold"
          defaultValue={album.title}
          onBlur={(e) => {
            toast.loading("Updating album", {
              duration: 1500,
            });
            singleAlbumMutation.mutate({
              albumId: album.id,
              title: e.target.value.trim(),
            });
          }}
          type="text"
        />
        <input
          lang="sv-SE"
          onChange={(e) => {
            toast.loading("Updating album", {
              duration: 1500,
            });
            singleAlbumMutation.mutate({
              albumId: album.id,
              date: new Date(e.target.value),
            });
          }}
          type="datetime-local"
          value={album.date.toISOString().slice(0, -8)}
        />
        <div className="flex flex-row gap-2">
          <label htmlFor="visible">Visa album</label>
          <input
            defaultChecked={album.visible}
            id="visible"
            onClick={() => {
              toast.loading("Updating album", {
                duration: 1500,
              });
              singleAlbumMutation.mutate({
                albumId: album.id,
                visible: !album.visible,
              });
            }}
            type="checkbox"
          />
        </div>
        <p>{album._count.images} bilder</p>
      </div>
    </div>
  );
};
