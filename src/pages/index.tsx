import type { GetStaticPropsContext } from "next";
import { type NextPage } from "next";
import { AlbumGridItem } from "../components/albumGrid/AlbumGridItem";
import { getAlbums } from "../utils/fetchDataFromPrisma";

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
      <h1 className="ml-4">Välkommen till zFoto</h1>
      <section className="mx-auto grid max-w-7xl grid-cols-1 place-items-center gap-2 py-5 px-10 md:grid-cols-2 md:py-10 lg:grid-cols-3">
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

export async function getStaticProps(context: GetStaticPropsContext) {
  const albums = await getAlbums();
  return {
    props: { albums: JSON.parse(JSON.stringify(albums)) },
    revalidate: 120,
  };
}
