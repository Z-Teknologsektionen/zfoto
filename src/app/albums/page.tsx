import { NUMBER_OF_IMAGES_TO_PRELOAD } from "@/constants/album";
import { getLatestAlbums } from "@/server/data-access/albums";
import type { Metadata } from "next";
import type { FC } from "react";
import { AlbumGrid } from "~/components/albums/album-grid";
import { AlbumGridItem } from "~/components/albums/album-grid-item";
import { SectionWrapper } from "~/components/layout/section-wrapper";
import { FilterAlbumsWizard } from "./_components/filter-albums-wizard";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Album",
};

type AlbumsPageProps = {
  searchParams: { year: string | undefined };
};

const AlbumsPage: FC<AlbumsPageProps> = async ({ searchParams }) => {
  const year =
    (searchParams.year !== undefined &&
      searchParams.year !== "" &&
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      parseInt(searchParams.year.toString())) ||
    undefined;

  const albums = await getLatestAlbums({
    year,
  });

  return (
    <SectionWrapper>
      <div className="flex flex-col items-center gap-4">
        <h1 className="mt-8 text-center text-2xl font-medium">
          {year === undefined ? "Alla album" : `Album från ${year}`}
        </h1>
        <FilterAlbumsWizard selectedYear={year?.toString()} />
      </div>
      <AlbumGrid>
        {albums.length === 0 ? (
          <div className="col-span-full text-center">
            <h2 className="text-3xl font-medium">Finns inga album...</h2>
            <p>Vänligen välj ett annat år</p>
          </div>
        ) : (
          albums.map(({ id, title, date, coverImageFilename }, idx) => (
            <AlbumGridItem
              key={id}
              id={id}
              title={title}
              coverImageFilename={coverImageFilename}
              date={date}
              usePriorityLoadning={idx < NUMBER_OF_IMAGES_TO_PRELOAD}
            />
          ))
        )}
      </AlbumGrid>
    </SectionWrapper>
  );
};

export default AlbumsPage;
