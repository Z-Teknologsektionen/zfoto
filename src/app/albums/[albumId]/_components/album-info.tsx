import type { FC } from "react";
import { BackButton } from "~/components/layout/back-button";
import { formatDateString } from "~/utils/date-utils";
import { CopyBylineButton } from "./copy-byline-button";

type AlbumInfoProps = {
  date: Date;
  photographers: string[];
  title: string;
};

export const AlbumInfo: FC<AlbumInfoProps> = ({
  date,
  title,
  photographers,
}) => {
  const hasMoreThanOnePhotographer = photographers.length > 1;
  const formattedDateString = formatDateString(date);

  return (
    <div className="col-span-full">
      <BackButton />
      <div className="my-4 flex flex-col gap-2">
        <h1 className="hidden text-3xl font-bold md:block">
          {`${title} | ${formattedDateString}`}
        </h1>
        <div className="text-xl font-bold md:hidden">
          <h1 className="text-3xl">{title}</h1>
          <h1>{formattedDateString}</h1>
        </div>
        <div className="flex w-fit flex-row items-center justify-center gap-1">
          <p>{`${
            hasMoreThanOnePhotographer ? "Fotografer" : "Fotograf"
          }: ${photographers.join(", ")}`}</p>
          <CopyBylineButton photographers={photographers} />
        </div>
      </div>
    </div>
  );
};
