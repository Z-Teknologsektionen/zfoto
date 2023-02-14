import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { trpc } from "../../utils/trpc";

// TODO: refactor this page
export const ImageRowItem = ({
  date,
  filename,
  imageId,
  photographer,
  visible,
  coverImage,
}: {
  coverImage: boolean;
  date: Date;
  filename: string;
  imageId: string;
  photographer: string;
  visible: boolean;
}): JSX.Element => {
  const [localCoverImage, setLocalCoverImage] = useState(coverImage);
  const [localVisible, setLocalVisible] = useState(visible);

  const imageAttrMutation = trpc.image.setImageProps.useMutation({
    onError(error, variables) {
      // eslint-disable-next-line no-alert
      alert(`Error with: ${variables.imageId}. Please refresh and try again.`);
    },
  });

  return (
    <div className="flex flex-row items-center justify-start gap-8">
      <Image
        alt=""
        height={128}
        quality={100}
        src={filename ? `/images/thumb/${filename}` : ""}
        width={128}
        unoptimized
      />
      <div className="flex flex-grow flex-row gap-2">
        <p>{filename}</p>
        <p>{`${date.toLocaleDateString()} ${date.toLocaleTimeString()}`}</p>
        <p>{photographer}</p>
        <Link
          className="underline underline-offset-2"
          href={`/image/${imageId}`}
          target="_blank"
        >
          Permanent länk
        </Link>
      </div>
      <div className="flex flex-row gap-2">
        <button
          className="rounded border-2 border-gray-700/60 bg-yellow-400 px-4 py-2"
          type="button"
        >
          Edit
        </button>
        <button
          className="rounded border-2 border-black/60 bg-red-500 px-4 py-2"
          onClick={() => {
            imageAttrMutation.mutate({
              imageId,
              coverImage: localCoverImage,
              visibility: !localVisible,
            });
            setLocalVisible((prev) => {
              return !prev;
            });
          }}
          type="button"
        >
          Gör
          {!localVisible ? " synlig" : " dold"}
        </button>
        <button
          className="rounded border-2 border-black/60 bg-green-600 px-4 py-2"
          onClick={() => {
            imageAttrMutation.mutate({
              imageId,
              coverImage: !localCoverImage,
              visibility: localVisible,
            });
            setLocalCoverImage((prev) => {
              return !prev;
            });
          }}
          type="button"
        >
          {`${localCoverImage ? "Dölj" : "Sätt till"} omslag`}
        </button>
      </div>
    </div>
  );
};
