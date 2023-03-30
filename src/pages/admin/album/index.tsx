import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import { useState } from "react";
import BackButton from "../../../components/BackButton";
import { formatDateTimeString } from "../../../utils/formatDateAndTimeStrings";
import { trpc } from "../../../utils/trpc";

const AdminAlbumsHeader: FC<{ refetchAllAlbums: () => void }> = ({
  refetchAllAlbums,
}) => {
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

const AdminAlbumsPage: NextPage = () => {
  useSession({ required: true });

  const [mutatuionError, setMutatuionError] = useState(false);
  const {
    data: albums,
    refetch: refetchAllAlbums,
    status,
    error,
    isFetching,
  } = trpc.album.getAllAsAdmin.useQuery(undefined, {
    refetchOnWindowFocus: false,
    retry() {
      return false;
    },
  });

  const singleAlbumMutation = trpc.album.updateOne.useMutation({
    onSettled: () => {
      refetchAllAlbums();
    },
    onError: () => {
      setMutatuionError(true);
    },
    onSuccess: () => {
      setMutatuionError(false);
    },
  });

  const loadingData = status === "loading" || isFetching;
  const errorInData = status === "error" || mutatuionError;

  return (
    <div className="mx-auto my-4 max-w-7xl px-4 xl:px-0">
      <AdminAlbumsHeader refetchAllAlbums={refetchAllAlbums} />

      {loadingData && <p>Loading...</p>}
      {errorInData && <p>{`Error: ${error?.message ?? "Okänt fel"}`}</p>}
      {/* Next line is to avoid jumpling when loading or has error */}
      {!loadingData && !errorInData && <p className="invisible">a</p>}

      {albums && (
        <div className="mt-4 flex flex-col">
          {albums.map((album) => {
            const coverImage = album.images.at(0);

            if (!coverImage) {
              return null;
            }

            return (
              <div
                key={album.id}
                className="flex flex-col items-center gap-2 border-t py-2 lg:grid lg:grid-cols-8 lg:gap-4"
              >
                {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                <Image
                  alt={`Cover image for album: "${album.title}", Filnamn: ${coverImage.filename}, Foto: ${coverImage.photographer}`}
                  className="col-span-1 max-w-xs object-contain object-center lg:max-h-[128px] lg:max-w-[128px]"
                  height={1}
                  src={`/images/thumb/${coverImage.filename}`}
                  style={{ width: "auto", height: "auto" }}
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
                <div className="col-span-2 flex flex-row items-center justify-center gap-2 lg:flex-col">
                  <button
                    className={`rounded border-2 py-3 px-4 ${
                      album.visible ? "bg-red-500" : "bg-green-500"
                    }`}
                    onClick={() => {
                      singleAlbumMutation.mutate({
                        albumId: album.id,
                        visible: !album.visible,
                      });
                    }}
                    type="button"
                  >
                    {album.visible ? "Dölj album" : "Visa album"}
                  </button>
                  <Link
                    className="rounded border-2 bg-yellow-500 py-3 px-4"
                    href={`/admin/album/${album.id}`}
                    type="button"
                  >
                    Redigera album
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminAlbumsPage;
