import type { GetServerSidePropsContext, NextPage } from "next";
import { AlbumRowItem } from "../../components/admin/AlbumRowItem";
import { env } from "../../env/server.mjs";
import { getAlbumsAsAdmin } from "../../utils/fetchDataFromPrisma";

type AlbumsType = Awaited<ReturnType<typeof getAlbumsAsAdmin>>;

const AdminPanelPage: NextPage<{
  albums: AlbumsType;
}> = ({ albums }) => {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-2">
      {albums.map(
        ({ id, title, date, description, images, _count, visible }) => {
          const { filename } = images[0] || { filename: "" };
          return (
            <AlbumRowItem
              key={id}
              date={new Date(date)}
              description={description}
              filename={filename}
              id={id}
              imageCount={_count.images}
              title={title}
              visible={visible}
            />
          );
        }
      )}
    </div>
  );
};

export default AdminPanelPage;

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<{ notFound: boolean } | { props: { albums: AlbumsType } }> {
  const password = context.query?.password?.toString();

  if (
    !(password && password === "brabilder") &&
    env.NODE_ENV !== "development"
  ) {
    return {
      notFound: true,
    };
  }

  const allAlbums = await getAlbumsAsAdmin();
  return {
    props: {
      albums: JSON.parse(JSON.stringify(allAlbums)) as typeof allAlbums,
    },
  };
}
