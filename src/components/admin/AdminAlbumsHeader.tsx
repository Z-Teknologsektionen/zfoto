import type { FC } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineReload } from "react-icons/ai";
import BackButton from "../BackButton";
import Button from "../Button";

export const AdminAlbumsHeader: FC<{
  fetching: boolean;
  refetchAllAlbums: () => void;
}> = ({ refetchAllAlbums, fetching }) => {
  return (
    <div className="my-4">
      <BackButton />
      <div className="flex flex-row justify-between">
        <h1 className="text-xl font-semibold">Admin sida</h1>
        <Button
          disabled={fetching}
          icon={AiOutlineReload}
          label="Hämta igen"
          onClick={() => {
            toast.loading("Hämtar igen");
            refetchAllAlbums();
          }}
          type="button"
          warning
        />
      </div>
    </div>
  );
};
