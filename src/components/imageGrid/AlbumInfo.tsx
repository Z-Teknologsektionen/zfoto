import type { NextPage } from "next";
import { formatDateString } from "../../utils/formatDateAndTimeStrings";

const AlbumInfo: NextPage<{
  date: Date;
  photographers: string[];
  title: string;
}> = ({ date, title, photographers }) => {
  const formatedDateString = formatDateString(date);
  return (
    <div className="my-4 flex flex-col gap-1">
      <h1 className="hidden text-3xl font-bold md:block">
        {`${title} | ${formatedDateString}`}
      </h1>
      <div className="text-xl font-bold md:hidden">
        <h1 className="text-3xl">{title}</h1>

        <h1>{formatedDateString}</h1>
      </div>
      <p>{`Fotografer: ${photographers.join(", ")}`}</p>
    </div>
  );
};

export default AlbumInfo;
