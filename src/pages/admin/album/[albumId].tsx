import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import type { FC } from "react";
import { useState } from "react";
import BackButton from "../../../components/BackButton";
import { formatDateTimeString } from "../../../utils/formatDateAndTimeStrings";
import { trpc } from "../../../utils/trpc";

const AdminAlbumHeader: FC<{ albumId: string; refetchAlbum: () => void }> = ({
  albumId,
  refetchAlbum,
}) => {
  return (
    <div className="my-4">
      <BackButton />
      <div className="flex flex-row justify-between">
        <div>
          <h1 className="text-xl font-semibold">Redigera album</h1>
          <p>{albumId}</p>
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
    </div>
  );
};

const AdminSingleAlbumPage: NextPage = () => {
  useSession({ required: true });

  const [mutatuionError, setMutatuionError] = useState(false);

  const router = useRouter();
  const { albumId } = router.query;

  const {
    data: album,
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
      retry() {
        return false;
      },
      onSuccess(successData) {
        if (!successData) {
          return;
        }

        // Turn UTC time into local time
        const { date } = successData;
        const getHours = date.getHours();
        const getUTCOffset = date.getTimezoneOffset() / -60;
        date.setHours(getHours + getUTCOffset);
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
      <AdminAlbumHeader albumId={album?.id ?? ""} refetchAlbum={refetchAlbum} />

      {loadingData && <p>Loading...</p>}
      {errorInData && <p>{`Error: ${error?.message ?? "Okänt fel"}`}</p>}
      {/* Next line is to avoid jumpling when loading or has error */}
      {!loadingData && !errorInData && <p className="invisible">a</p>}

      {album && (
        <>
          <div className="mt-4 flex flex-row items-center justify-between">
            <div className="mx-auto flex max-w-lg flex-col gap-1 lg:mx-0">
              <input
                className="text-xl font-semibold"
                defaultValue={album.title}
                onBlur={(e) => {
                  singleAlbumMutation.mutate({
                    albumId: album.id,
                    title: e.target.value.trim(),
                  });
                }}
                type="text"
              />
              <input
                defaultValue={album.date.toISOString().slice(0, -8)}
                lang="sv-SE"
                onChange={(e) => {
                  singleAlbumMutation.mutate({
                    albumId: album.id,
                    date: new Date(e.target.value),
                  });
                }}
                type="datetime-local"
              />
              <div className="flex flex-row gap-2">
                <label htmlFor="visible">Visa album</label>
                <input
                  defaultChecked={album.visible}
                  id="visible"
                  onClick={() => {
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

          <div className="mt-8 flex flex-col">
            {album.images.map((image) => {
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
        </>
      )}
    </div>
  );
};

export default AdminSingleAlbumPage;
