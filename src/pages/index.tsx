import { PrismaClient } from "@prisma/client";
import type { GetServerSidePropsContext } from "next";
import { type NextPage } from "next";

import { AlbumGridItem } from "../components/albumGrid/AlbumGridItem";

type AlbumType = {
  id: string;
  images: {
    id: string;
    date: Date;
    albumId: string;
    filename: string;
    photographer: string;
  }[];
  date: Date;
  title: string;
  description: string;
  _count: {
    images: number;
  };
};

const Home: NextPage<{ albums: AlbumType[] }> = ({ albums }) => {
  return (
    <>
      <h1>Välkommen till zFoto</h1>
      <section className="mx-auto grid max-w-7xl grid-cols-1 place-items-center gap-2 py-5 px-10 sm:grid-cols-2 md:grid-cols-3 md:py-10 lg:grid-cols-4 xl:grid-cols-5">
        {albums.length == 0
          ? "Hittade inga album"
          : albums.map(({ id, title, images }) => {
              const { filename } = images[0] || { filename: "" };
              return <AlbumGridItem key={id} {...{ id, title, filename }} />;
            })}
      </section>
    </>
  );
};

export default Home;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const prisma = new PrismaClient();
  const albums = await prisma.album.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      images: {
        select: {
          albumId: true,
          date: true,
          filename: true,
          photographer: true,
          id: true,
        },
      },
      date: true,
      _count: {
        select: {
          images: true,
        },
      },
    },
  });
  return {
    props: { albums: JSON.parse(JSON.stringify(albums)) },
  };
}
