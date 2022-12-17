import type { GetServerSidePropsContext } from "next";
import { type NextPage } from "next";
import { AlbumGridItem } from "../components/albumGrid/AlbumGridItem";
import MainWrapper from "../components/Wrapper";
import { getAlbums } from "../utils/fetchDataFromPrisma";

type AlbumsType = Awaited<ReturnType<typeof getAlbums>>;

const Home: NextPage<{
  albums: AlbumsType;
}> = ({ albums }) => {
  return (
    <MainWrapper>
      <h1 className="py-8 text-center text-2xl">Välkommen till zFoto</h1>
      <div className="mx-auto grid max-w-7xl grid-cols-1 place-items-center gap-2 md:grid-cols-2 lg:grid-cols-3">
        {albums.length === 0
          ? "Hittade inga album"
          : albums.map(({ id, title, images, date }, idx) => {
              const { filename } = images[0] || { filename: "" };
              const priorityLoadning = idx < 5;
              return (
                <AlbumGridItem
                  key={id}
                  {...{ id, title, filename, priorityLoadning, date }}
                />
              );
            })}
      </div>
    </MainWrapper>
  );
};

export default Home;

export async function getServerSideProps(
  _context: GetServerSidePropsContext
): Promise<{
  props: { albums: AlbumsType };
}> {
  const albums = await getAlbums();
  return {
    props: { albums: JSON.parse(JSON.stringify(albums)) as typeof albums },
  };
}
