import type { FC } from "react";
import { toast } from "react-hot-toast";
import BackButton from "../BackButton";

export const AdminAlbumHeader: FC<{
  albumId: string;
  refetchAlbum: () => void;
}> = ({ albumId, refetchAlbum }) => {
  return (
    <div className="my-4">
      <BackButton />
      <div className="flex flex-row justify-between">
        <div>
          <h1 className="text-xl font-semibold">Redigera album</h1>
          <p>{albumId}</p>
        </div>
        <button
          className="rounded border-2 bg-yellow-500 px-4 py-3"
          onClick={() => {
            toast.loading("Hämtar igen");
            refetchAlbum();
          }}
          type="button"
        >
          Hämta igen
        </button>
      </div>
    </div>
  );
};
