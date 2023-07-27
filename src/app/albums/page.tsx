import type { FC } from "react";
import { AlbumGridItem } from "~/components/albumGrid/AlbumGridItem";
import AlbumGrid from "~/components/layout/AlbumGrid";
import SectionWrapper from "~/components/layout/SectionWrapper";
import { prisma } from "~/server/db/client";
import FilterAlbumsWizard from "./filter-albums-wizard";

interface IAlbumId {
  searchParams: { year: string | undefined };
}

const getAlbumsWithOptionalYearFilter = async (year?: number) => {
  const albums = await prisma.album.findMany({
    where: {
      visible: {
        equals: true,
      },
      images: {
        some: {
          coverImage: true,
          visible: true,
        },
      },
      date: {
        lte: new Date(year || new Date().getFullYear(), 12).toISOString(),
        gte: new Date(year || 1970, 1).toISOString(),
      },
    },
    select: {
      id: true,
      title: true,
      images: {
        orderBy: { date: "asc" },
        take: 1,
        select: {
          filename: true,
        },
        where: {
          coverImage: true,
          visible: true,
        },
      },
      date: true,
    },
    orderBy: {
      date: "desc",
    },
  });

  return albums.map(({ images, ...formatedAlbum }) => {
    return {
      ...formatedAlbum,
      coverImageFilename: images.at(0)?.filename ?? "",
    };
  });
};

const FilterByYearPage: FC<IAlbumId> = async ({ searchParams }) => {
  const year = searchParams.year?.toString()
    ? parseInt(searchParams.year?.toString(), 10)
    : undefined;

  const albums = await getAlbumsWithOptionalYearFilter(year);

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
