import type { NextPage } from "next";
import type { AlbumType } from "../../utils/types";

const AlbumInfo: NextPage<{ album: AlbumType; photographers: string[] }> = ({
  album,
  photographers,
}) => {
  const { title, description, date } = album;
  return (
    <div className="flex flex-col gap-1">
      <h1>{`${title} ${new Date(date).toLocaleDateString()}`}</h1>
      <p>{description}</p>
      <p>
        Fotografer:
        <span>{` ${photographers.join(", ")}`}</span>
      </p>
    </div>
  );
};

export default AlbumInfo;
