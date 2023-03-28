import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { trpc } from "../../../utils/trpc";

const AdminSingleAlbumPage: NextPage = () => {
  useSession({ required: true });

  const [mutatuionError, setMutatuionError] = useState(false);
  const [albumTitle, setAlbumTitle] = useState<string>("");
  const [albumDate, setAlbumDate] = useState<string>("");
  const [albumVisibility, setAlbumVisibility] = useState<boolean>(false);

  const router = useRouter();
  const { albumId } = router.query;

  const {
    data,
    isFetching,
    error,
    status,
    refetch: refetchAlbum,
  } = trpc.album.getOneAsAdmin.useQuery(
    {
      albumId: albumId?.toString(),
    },
    {
      refetchOnWindowFocus: false,
      onSuccess(successData) {
        if (!successData) {
          return;
        }
        setAlbumTitle(successData.title);
        setAlbumDate(successData?.date.toISOString().slice(0, -8));
        setAlbumVisibility(successData.visible);
      },
    }
  );

  const singleAlbumMutation = trpc.album.updateOne.useMutation({
    onSettled: () => {
      refetchAlbum();
    },
    onError: () => {
      setMutatuionError(true);
    },
    onSuccess: () => {
      setMutatuionError(false);
    },
  });

  const singleImageMutation = trpc.image.updateOne.useMutation({
    onSettled: () => {
      refetchAlbum();
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
    <div className="mx-auto max-w-7xl px-4 xl:px-0">
      <div className="mb-4 flex flex-row justify-between">
        <div>
          <h1 className="text-xl font-semibold">Redigera album</h1>
          <p>{data?.id}</p>
        </div>
        <button
          className="rounded border-2 bg-yellow-500 py-3 px-4"
          onClick={() => {
            refetchAlbum();
          }}
          type="button"
        >
          Hämta igen
        </button>
      </div>
      {loadingData && <p>Loading...</p>}

      {errorInData && <p>{`Error: ${error?.message ?? "Okänt fel"}`}</p>}

      {!loadingData && !errorInData && <p className="invisible">a</p>}

      {data && (
        <>
          <div className="mt-4 flex flex-row items-center justify-between">
            <div className="flex max-w-lg flex-col gap-1">
              <input
                className="text-xl font-semibold"
                onChange={(e) => setAlbumTitle(e.target.value)}
                type="text"
                value={albumTitle}
              />
              <input
                lang="sv-SE"
                onChange={(e) => setAlbumDate(e.target.value)}
                type="datetime-local"
                value={albumDate}
              />
              <div className="flex flex-row gap-2">
                <label htmlFor="visible">Visa album</label>
                <input
                  checked={albumVisibility}
                  id="visible"
                  onClick={() => {
                    setAlbumVisibility((prev) => !prev);
                  }}
                  type="checkbox"
                />
              </div>
            </div>
            <div>
              <button
                className="rounded border-2 bg-green-500 py-3 px-4"
                onClick={() => {
                  singleAlbumMutation.mutate({
                    albumId: albumId?.toString() ?? "",
                    title: albumTitle ?? "",
                    date: new Date(albumDate ?? ""),
                    visible: albumVisibility ?? true,
                  });
                }}
                type="button"
              >
                Spara
              </button>
            </div>
          </div>

          <div className="mt-8 flex flex-col">
            {data.images.map((image) => {
              return (
                <div
                  key={image.id}
                  className="grid grid-cols-8 items-center gap-2 border-t py-1"
                >
                  <img
                    alt=""
                    className="h-32 w-32 object-contain object-center"
                    src={`/images/thumb/${image.filename}`}
                  />
                  <div className="col-span-3">
                    <p>{image.filename}</p>
                    <p>{image.date.toUTCString()}</p>
                  </div>
                  <div className="col-span-2">
                    <p>Foto: {image.photographer}</p>
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
                        image.visible ? "bg-red-500" : "bg-green-500"
                      }`}
                      onClick={() => {
                        singleImageMutation.mutate({
                          imageId: image.id,
                          visible: !image.visible,
                          coverImage: image.coverImage,
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
                        singleImageMutation.mutate({
                          imageId: image.id,
                          visible: image.visible,
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
        </>
      )}
    </div>
  );
};

export default AdminSingleAlbumPage;
