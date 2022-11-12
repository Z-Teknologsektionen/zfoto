import { type NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

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
          : albums.map(({ id, tilte, images }) => {
              const { filename } = images[0] || { filename: "" };
              return (
                <Link
                  href={`/album/${id}`}
                  className="relative grid aspect-[5/4] h-full w-full max-w-xs place-items-center overflow-hidden rounded-3xl"
                  key={id}
                >
                  <Image
                    className={`object-contain object-center
                      before:absolute before:inset-0 before:z-0 before:rounded-3xl before:bg-black/10 before:content-[''] 
                      after:absolute after:top-1/2 after:left-1/2 after:z-10 after:block after:-translate-y-1/2 after:-translate-x-1/2 after:truncate after:object-contain after:text-xl after:text-white after:content-[attr(alt)]`}
                    src={filename ? `/images/${filename}` : ""}
                    alt={tilte}
                    fill
                  />
                  <div className="z-10 grid h-full w-full place-items-center text-white hover:bg-black/50 [&:hover>p]:block">
                    <p className="hidden truncate text-xl">{tilte}</p>
                  </div>
                </Link>
              );
            })}
      </section>
    </>
  );
};

export default Home;
