import type { FC } from "react";
import AlbumGrid from "~/components/albums/album-grid";
import { AlbumGridItem } from "~/components/albums/album-grid-item";
import SectionWrapper from "~/components/layout/SectionWrapper";
import { getLatestAlbums } from "~/utils/fetchAlbumData";
import FilterAlbumsWizard from "./filter-albums-wizard";

interface IAlbumId {
  searchParams: { year: string | undefined };
}

const FilterByYearPage: FC<IAlbumId> = async ({ searchParams }) => {
  const year = searchParams.year?.toString()
    ? parseInt(searchParams.year?.toString(), 10)
    : undefined;

  const albums = await getLatestAlbums({ year });

  return (
    <>
      <SectionWrapper className="space-y-8">
        <div className="flex flex-col items-center gap-4">
          <h1 className="mt-8 text-center text-2xl font-medium">
            {year ? `Album från ${year}` : "Alla album"}
          </h1>
          <FilterAlbumsWizard selectedYear={year?.toString()} />
        </div>
        <AlbumGrid>
          {albums?.length !== 0 ? (
            albums.map(({ id, title, date, coverImageFilename }, idx) => (
              <AlbumGridItem
                key={id}
                {...{
                  id,
                  title,
                  coverImageFilename,
                  priorityLoadning: idx < 10,
                  date,
                }}
              />
            ))
          ) : (
            <div className="col-span-full text-center">
              <h2 className="text-3xl font-medium">Finns inga album...</h2>
              <p>Vänligen välj ett annat år</p>
            </div>
          )}
        </AlbumGrid>
      </SectionWrapper>
    </>
  );
};

export default FilterByYearPage;
