import type { NextPage } from "next";
import type { AlbumType } from "../../utils/types";

const AlbumInfo: NextPage<{ album: AlbumType; photographers: string[] }> = ({
  album,
  photographers,
}) => {
  const { title, date } = album;
  return (
    <div className="flex flex-col gap-1">
      <h1 className="hidden text-3xl font-bold md:block">
        {`${title} | ${new Date(date).toLocaleDateString("se-sv", {})}`}
      </h1>
      <div className="text-xl font-bold md:hidden">
        <h1 className="text-3xl">{title}</h1>

        <h1>{new Date(date).toLocaleDateString("se-sv", {})}</h1>
      </div>
      <p>{`Fotografer: ${photographers.join(", ")}`}</p>
    </div>
  );
};

export default AlbumInfo;
