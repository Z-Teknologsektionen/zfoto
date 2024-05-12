import type { NextPage } from "next";
import { formatDateString } from "~/utils/date-utils";
import CopyBylineButton from "./copy-byline-button";

const AlbumInfo: NextPage<{
  date: Date;
  photographers: string[];
  title: string;
}> = ({ date, title, photographers }) => {
  const formatedDateString = formatDateString(date);

  return (
    <div className="my-4 flex flex-col gap-2">
      <h1 className="hidden text-3xl font-bold md:block">
        {`${title} | ${formatedDateString}`}
      </h1>
      <div className="text-xl font-bold md:hidden">
        <h1 className="text-3xl">{title}</h1>
        <h1>{formatedDateString}</h1>
      </div>
      <div className="flex w-fit flex-row items-center justify-center gap-1">
        <p>{`${
          photographers.length > 1 ? "Fotografer" : "Fotograf"
        }: ${photographers.join(", ")}`}</p>
        <CopyBylineButton photographers={photographers} />
      </div>
    </div>
  );
};

export default AlbumInfo;
