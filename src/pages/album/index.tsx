import type { NextPage } from "next";
import { useRouter } from "next/router";
import type { FC } from "react";
import { toast } from "react-hot-toast";
import { AlbumGridItem } from "~/components/albumGrid/AlbumGridItem";
import MainLayout from "~/components/layout/MainLayout";
import SectionWrapper from "~/components/layout/SectionWrapper";
import { trpc } from "~/utils/trpc";

function generateYearsBetweenNowAnd2022(): number[] {
  const endDate = new Date().getFullYear();
  const years = [];

  for (let i = 2022; i <= endDate; i += 1) {
    years.push(i);
  }
  return years;
}

const FilterAlbumsWizard: FC<{ year: number | undefined }> = ({ year }) => {
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
        value={year || ""}
      >
        <option value="">Alla år</option>
        {generateYearsBetweenNowAnd2022()
          .reverse()
          .map((y) => (
            <option key={y} value={y}>
              {y}
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
      retryDelay: 1,
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
        <FilterAlbumsWizard year={year} />
        <div className="grid grid-cols-1 place-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {albums &&
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
            ))}
        </div>
      </SectionWrapper>
    </MainLayout>
  );
};

export default FilterByYearPage;
