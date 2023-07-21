import type { NextPage } from "next";
import { useRouter } from "next/router";
import type { FC } from "react";
import { toast } from "react-hot-toast";
import { AlbumGridItem } from "~/components/albumGrid/AlbumGridItem";
import AlbumGrid from "~/components/layout/AlbumGrid";
import MainLayout from "~/components/layout/MainLayout";
import SectionWrapper from "~/components/layout/SectionWrapper";
import { trpc } from "~/utils/trpc";

function generateYearsBetweenNowAnd2016(): number[] {
  const endDate = new Date().getFullYear();
  const years = [];

  for (let i = 2016; i <= endDate; i += 1) {
    years.push(i);
  }
  return years;
}

const FilterAlbumsWizard: FC<{ selectedYear: number | undefined }> = ({
  selectedYear,
}) => {
  const { push } = useRouter();

  return (
    <div className="mx-auto flex items-center justify-center gap-1">
      <label htmlFor="yearSelect">Filtrera på: </label>
      <select
        className="rounded border-2 px-3 py-1 shadow"
        id="yearSelect"
        name="yearSelect"
        onChange={(e) => {
          if (e.target.value === "") {
            return push({});
          }

          return push(
            {
              query: {
                year: e.target.value,
              },
            },
            undefined
          );
        }}
        value={selectedYear || ""}
      >
        <option value="">Alla år</option>
        {generateYearsBetweenNowAnd2016()
          .reverse()
          .map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
      </select>
    </div>
  );
};

const FilterByYearPage: NextPage = () => {
  const { query } = useRouter();
  const { year: yearString } = query;
  const year = yearString?.toString()
    ? parseInt(yearString?.toString(), 10)
    : undefined;

  const { data: albums, isLoading } = trpc.album.getAll.useQuery(
    { year },
    {
      refetchOnWindowFocus: false,
      retry: () => false,
      onError: () => {
        toast.error("Okänt fel, försök igen senare");
      },
    }
  );

  return (
    <MainLayout isLoading={isLoading}>
      <SectionWrapper className="space-y-8">
        <h1 className="mt-8 text-center text-2xl font-medium">
          {year ? `Album från ${year}` : "Alla album"}
        </h1>
        <FilterAlbumsWizard selectedYear={year} />
        <AlbumGrid>
          {albums && albums?.length !== 0 ? (
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
              <h2
                className="text-3xl font-medium
              "
              >
                Finns inga album från {year}
              </h2>
              <p>Vänligen välj ett annat år</p>
            </div>
          )}
        </AlbumGrid>
      </SectionWrapper>
    </MainLayout>
  );
};

export default FilterByYearPage;
