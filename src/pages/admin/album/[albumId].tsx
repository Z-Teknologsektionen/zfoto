import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router.js";
import { useState } from "react";
import { ImageRowItem } from "../../../components/admin/ImageRowItem";
import { env } from "../../../env/server.mjs";
import { getAlbumAsAdmin } from "../../../utils/fetchDataFromPrisma";
import { trpc } from "../../../utils/trpc";
import type { AdminAlbumType } from "../../../utils/types";

const EditAlbum: NextPage<{
  album: AdminAlbumType;
}> = ({ album }) => {
  const albumInfoDefaultValue = {
    title: album.title,
    date: album.date.toLocaleString(),
  };

  const [albumInfo, setAlbumInfo] = useState(albumInfoDefaultValue);
  const router = useRouter();

  const albumInfoMutation = trpc.album.updateInfo.useMutation({
    onSuccess: (data) => {
      const { title, date } = data;
      setAlbumInfo({ title, date: date.toLocaleString() });
      router.reload();
    },
  });

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-row justify-between">
        <div className="flex-grow">
          <p>{album.id}</p>
          <input
            className="w-full"
            onChange={(e) => {
              setAlbumInfo((prev) => {
                return { ...prev, title: e.target.value };
              });
            }}
            type="text"
            value={albumInfo.title}
          />
          <input
            defaultValue={new Date(album.date).toLocaleString()}
            onChange={(e) => {
              setAlbumInfo((prev) => {
                return {
                  ...prev,
                  date: new Date(e.target.value).toLocaleString(),
                };
              });
            }}
            type="datetime-local"
          />
          <p>{`${album._count.images} bilder`}</p>
        </div>
        <div className="flex h-fit flex-row gap-2">
          <button
            className="rounded border-2 border-black/40 bg-yellow-400 px-6 py-2"
            onClick={() => router.back()}
            type="button"
          >
            Back
          </button>
          <button
            className="rounded border-2 border-black/60 bg-green-600 px-6 py-2"
            onClick={() => {
              albumInfoMutation.mutate({
                albumId: album.id,
                date: new Date(albumInfo.date),
                title: albumInfo.title,
                visible: album.visible,
              });
            }}
            type="submit"
          >
            Save
          </button>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-2">
        {album.images.map((image) => (
          <ImageRowItem
            key={image.id}
            {...{
              date: new Date(image.date),
              filename: image.filename,
              imageId: image.id,
              coverImage: image.coverImage,
              visible: image.visible,
              photographer: image.photographer,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default EditAlbum;

export const getServerSideProps: GetServerSideProps<{
  album: AdminAlbumType;
}> = async (context) => {
  const password = context.query?.password?.toString();

  if (
    !(password && password === env.ADMIN_PASS) &&
    env.NODE_ENV !== "development"
  ) {
    return {
      notFound: true,
    };
  }

  try {
    const albumId = context.params?.albumId || "";
    const album = await getAlbumAsAdmin(albumId.toString());

    return {
      props: {
        album: JSON.parse(JSON.stringify(album)) as AdminAlbumType,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
