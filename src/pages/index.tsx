import type { GetStaticProps, NextPage } from "next";
import { useMemo } from "react";
import { toast } from "react-hot-toast";
import Button from "~/components/Button";
import { AlbumGridItem } from "~/components/albumGrid/AlbumGridItem";
import AlbumGrid from "~/components/layout/AlbumGrid";
import MainLayout from "~/components/layout/MainLayout";
import SectionWrapper from "~/components/layout/SectionWrapper";
import { ssg } from "~/server/helpers/SSGHelper";
import { trpc } from "~/utils/trpc";

const Home: NextPage = () => {
  const { data, isLoading, hasNextPage, fetchNextPage } =
    trpc.album.infiniteAlbums.useInfiniteQuery(
      { limit: 12 },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        refetchOnWindowFocus: false,
        retry: () => false,
        onError: () => {
          toast.error("Okänt fel, försök igen senare");
        },
      }
    );

  const allAlbums = useMemo(
    () => data?.pages.flatMap((page) => page.albums),
    [data]
  );

  return (
    <MainLayout isLoading={isLoading}>
      <SectionWrapper className="space-y-8">
        <h1 className="py-8 text-center text-2xl font-medium">
          Välkommen till zFoto
        </h1>
        <AlbumGrid>
          {allAlbums?.map(({ id, title, date, coverImageFilename }, idx) => (
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
        </AlbumGrid>
        {hasNextPage && (
          <div className="grid place-items-center">
            <Button
              className="mx-auto"
              label="Hämta fler"
              onClick={() => fetchNextPage()}
              type="button"
              outline
            />
          </div>
        )}
      </SectionWrapper>
    </MainLayout>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  await ssg.album.infiniteAlbums.prefetchInfinite({
    limit: 12,
  });
  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    revalidate: 1,
  };
};
