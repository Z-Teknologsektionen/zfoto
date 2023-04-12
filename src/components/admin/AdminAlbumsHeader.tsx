import type { FC } from "react";
import BackButton from "../BackButton";

export const AdminAlbumsHeader: FC<{
  refetchAllAlbums: () => void;
}> = ({ refetchAllAlbums }) => {
  return (
    <div className="my-4">
      <BackButton />
      <div className="flex flex-row justify-between">
        <h1 className="text-xl font-semibold">Admin sida</h1>
        <button
          className="rounded border-2 bg-yellow-500 py-3 px-4"
          onClick={() => {
            refetchAllAlbums();
          }}
          type="button"
        >
          Hämta igen
        </button>
      </div>
    </div>
  );
};
