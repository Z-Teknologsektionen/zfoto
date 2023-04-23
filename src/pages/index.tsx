import type { NextPage } from "next";
import { toast } from "react-hot-toast";
import { AlbumGridItem } from "~/components/albumGrid/AlbumGridItem";
import MainLayout from "~/components/layout/MainLayout";
import SectionWrapper from "~/components/layout/SectionWrapper";
import { trpc } from "~/utils/trpc";

const Home: NextPage = () => {
  const { data: albums, isLoading } = trpc.album.getAll.useQuery(undefined, {
    refetchOnWindowFocus: false,
    retry: () => false,
    onError: () => {
      toast.error("Okänt fel, försök igen senare");
    },
  });

  return (
    <MainLayout isLoading={isLoading}>
      <SectionWrapper>
        <h1 className="py-8 text-center text-2xl font-medium">
          Välkommen till zFoto
        </h1>
        <div className="grid grid-cols-1 place-items-center gap-4 opacity-100 transition sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {albums?.map(({ id, title, date, coverImageFilename }, idx) => (
            <AlbumGridItem
              key={id}
              {...{
                id,
                title,
                filename: coverImageFilename,
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

export default Home;
