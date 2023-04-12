import type { GetStaticProps, NextPage } from "next";
import { toast } from "react-hot-toast";
import MainWrapper from "~/components/Wrapper";
import { AlbumGridItem } from "~/components/albumGrid/AlbumGridItem";
import { LoadingScreen } from "~/components/layout/Loader";
import { ssg } from "~/server/helpers/SSGHelper";
import { trpc } from "~/utils/trpc";

const Home: NextPage = () => {
  const { data: albums, isLoading } = trpc.album.getAll.useQuery(undefined, {
    refetchOnWindowFocus: false,
    onError(err) {
      toast.error(err.data?.code ?? "Okänt fel, försök igen senare");
    },
  });

  return (
    <MainWrapper>
      <h1 className="py-8 text-center text-2xl font-medium">
        Välkommen till zFoto
      </h1>
      {isLoading && <LoadingScreen />}

      {albums && (
        <div className="mx-auto grid max-w-7xl grid-cols-1 place-items-center gap-2 md:grid-cols-2 lg:grid-cols-3">
          {albums.length === 0
            ? "Hittade inga album"
            : albums.map(
                ({ id, title, date, coverImage: { filename } }, idx) => {
                  const priorityLoadning = idx < 5;
                  return (
                    <AlbumGridItem
                      key={id}
                      {...{ id, title, filename, priorityLoadning, date }}
                    />
                  );
                }
              )}
        </div>
      )}
    </MainWrapper>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  await ssg.album.getAll.prefetch();
  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    revalidate: 1,
  };
};
