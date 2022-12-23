import Link from "next/link";
import type { FC } from "react";

export const ImagePopupInformation: FC<{
  id: string;
  photographer: string;
}> = ({ photographer, id }) => {
  return (
    /* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
    <div
      className="absolute bottom-0 left-0 z-10 mb-1 flex w-full flex-col justify-center gap-x-4 gap-y-1 p-1 text-center text-xl font-medium md:flex-row md:p-2"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Link className="" href={`/image/${id}`}>
        Permanent länk
      </Link>
      <p className="hidden sm:block">
        Fotograf:
        {` ${photographer}`}
      </p>
    </div>
  );
};
