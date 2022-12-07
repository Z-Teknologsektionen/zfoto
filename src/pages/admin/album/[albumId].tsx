import type { GetServerSidePropsContext, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { getAlbumAsAdmin } from "../../../utils/fetchDataFromPrisma";
import { trpc } from "../../../utils/trpc";

const EditAlbum: NextPage<{
  album: Awaited<ReturnType<typeof getAlbumAsAdmin>>;
}> = ({ album }) => {
  const albumInfoDefaultValue = {
    title: album.title,
    description: album.description,
    date: album.date.toLocaleString(),
  };
  const [albumInfo, setAlbumInfo] = useState(albumInfoDefaultValue);

  const router = useRouter();

  const albumInfoMutation = trpc.album.updateInfo.useMutation({
    onSuccess: (data) => {
      const { title, description, date } = data;
      setAlbumInfo({ title, description, date: date.toLocaleString() });
      router.reload();
    },
  });

  const imageVisibility = trpc.image.setVisibility.useMutation({
    onSuccess: () => {
      router.reload();
    },
  });

  const handleAlbumInfoUpdate = ({
    albumId,
    albumInfo,
  }: {
    albumId: string;
    albumInfo: typeof albumInfoDefaultValue;
  }) => {
    albumInfoMutation.mutate({
      albumId: albumId,
      date: new Date(albumInfo.date),
      description: albumInfo.description,
      title: albumInfo.title,
    });
  };

  const handleChangeVisibility = ({
    imageId,
    value,
  }: {
    imageId: string;
    value: boolean;
  }) => {
    imageVisibility.mutate({ imageId, visibility: value });
  };
  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-row justify-between">
        <div className="flex-grow">
          <p>{album.id}</p>
          <input
            className="w-full"
            type="text"
            value={albumInfo.title}
            onChange={(e) => {
              setAlbumInfo((prev) => {
                return { ...prev, title: e.target.value };
              });
            }}
          />
          <input
            className="w-full"
            type="text"
            value={albumInfo.description}
            onChange={(e) => {
              setAlbumInfo((prev) => {
                return { ...prev, description: e.target.value };
              });
            }}
          />
          <input
            type="datetime-local"
            defaultValue={new Date(album.date).toLocaleString()}
            onChange={(e) => {
              setAlbumInfo((prev) => {
                return {
                  ...prev,
                  date: new Date(e.target.value).toLocaleString(),
                };
              });
            }}
          />
          <p>Number of images: {album._count.images}</p>
        </div>
        <div className="flex h-fit flex-row gap-2">
          <button
            className="rounded border-2 border-black/40 bg-yellow-400 px-6 py-2"
            onClick={() => router.back()}
          >
            Back
          </button>
          <button
            className="rounded border-2 border-black/60 bg-green-600 px-6 py-2"
            onClick={() => {
              handleAlbumInfoUpdate({
                albumId: album.id,
                albumInfo: albumInfo,
              });
            }}
          >
            Save
          </button>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-2">
        {album.images.map(
          ({ id: imageId, filename, date, photographer, visible }) => {
            return (
              <div
                key={imageId}
                className="flex flex-row items-center justify-start gap-8"
              >
                <Image
                  src={
                    filename
                      ? `http://holmstrom.ddns.net:8080/df/thumb/${filename}`
                      : ""
                  }
                  alt=""
                  width={128}
                  height={128}
                  quality={100}
                />
                <div className="flex flex-grow flex-row gap-2">
                  <p>{filename}</p>
                  <p>{new Date(date).toISOString()}</p>
                  <p>{photographer}</p>
                  <p>{visible ? "Synlig" : "Dold"}</p>
                </div>
                <div className="flex flex-row gap-2">
                  <button className="rounded border-2 border-black/60 bg-green-600 px-4 py-2">
                    <Link target="_blank" href={`/image/${imageId}`}>
                      Länk till bild
                    </Link>
                  </button>
                  <button className="rounded border-2 border-gray-700/60 bg-yellow-400 px-4 py-2">
                    Edit
                  </button>
                  <button
                    className="rounded border-2 border-black/60 bg-red-500 px-4 py-2"
                    onClick={() => {
                      handleChangeVisibility({
                        imageId: imageId,
                        value: !visible,
                      });
                    }}
                  >
                    Gör {!visible ? "synlig" : "dold"}
                  </button>
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default EditAlbum;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const password = context.query?.password?.toString();

  if (!(password && password === "brabilder")) {
    return {
      notFound: true,
    };
  }

  try {
    const albumId = context.params?.albumId || "";
    const album = await getAlbumAsAdmin(albumId.toString());

    return {
      props: {
        album: JSON.parse(JSON.stringify(album)),
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
