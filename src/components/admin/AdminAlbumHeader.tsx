import type { FC } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineReload } from "react-icons/ai";
import BackButton from "../BackButton";
import Button from "../Button";

export const AdminAlbumHeader: FC<{
  albumId: string;
  fetching: boolean;
  refetchAlbum: () => void;
}> = ({ albumId, refetchAlbum, fetching }) => {
  return (
    <div className="my-4">
      <BackButton />
      <div className="flex flex-row justify-between">
        <div>
          <h1 className="text-xl font-semibold">Redigera album</h1>
          <p>{albumId}</p>
        </div>
        <Button
          disabled={fetching}
          icon={AiOutlineReload}
          label="Hämta igen"
          onClick={() => {
            toast.loading("Hämtar igen");
            refetchAlbum();
          }}
          type="button"
          warning
        />
      </div>
    </div>
  );
};
