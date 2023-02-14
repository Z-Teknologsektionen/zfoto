import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { trpc } from "../../utils/trpc";

export const AlbumRowItem = ({
  description,
  id,
  title,
  filename,
  date,
  visible,
  imageCount,
}: {
  date: Date;
  description: string;
  filename: string;
  id: string;
  imageCount: number;
  title: string;
  visible: boolean;
}): JSX.Element => {
  const [albumVisibility, setAlbumVisibility] = useState(visible);

  const albumInfoMutation = trpc.album.updateInfo.useMutation({
    onError(error, variables) {
      // eslint-disable-next-line no-alert
      alert(`Error with: ${variables.albumId}. Please refresh and try again.`);
    },
  });

  return (
    <div className="flex flex-row items-center justify-start gap-12">
      <div>
        <Image
          alt={`${title} ${description}`}
          height={128}
          quality={100}
          src={filename ? `/images/thumb/${filename}` : ""}
          width={128}
          unoptimized
        />
      </div>
      <div className="flex flex-grow flex-row items-center justify-start gap-8">
        <div>
          <p>{title}</p>
          <p>{description}</p>
        </div>
        <div>
          <p>{imageCount} images</p>
        </div>
      </div>
      <div className="flex gap-4">
        <button
          className="rounded border-2 border-black/60 bg-red-500 px-4 py-2"
          onClick={() => {
            albumInfoMutation.mutate({
              albumId: id,
              date,
              description,
              title,
              visible: !albumVisibility,
            });
            setAlbumVisibility((prev) => {
              return !prev;
            });
          }}
          type="button"
        >
          {albumVisibility ? "Dölj" : "Visa"}
        </button>
        <Link
          className="rounded border-2 border-black/60 bg-yellow-400 px-4 py-2"
          href={`admin/album/${id}?password=brabilder`}
        >
          Redigera
        </Link>
      </div>
    </div>
  );
};
