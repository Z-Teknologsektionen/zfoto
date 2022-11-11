import { type NextPage } from "next";

import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const {
    data: albums,
    isLoading,
    isError,
  } = trpc.album.getAll.useQuery(undefined, { refetchOnWindowFocus: false });

  return (
    <>
      <h1>Välkommen till zFoto</h1>
      <section className="mx-auto grid max-w-7xl grid-cols-1 place-items-center gap-2 py-5 px-10 sm:grid-cols-2 md:grid-cols-3 md:py-10 lg:grid-cols-4 xl:grid-cols-5">
        {isLoading
          ? "Laddar..."
          : isError
          ? "Error..."
          : albums.map((album) => {
              return (
                <div
                  className="aspect-square max-w-xs p-2 shadow"
                  key={album.id}
                >
                  {album.id}
                </div>
              );
            })}
      </section>
    </>
  );
};

export default Home;
