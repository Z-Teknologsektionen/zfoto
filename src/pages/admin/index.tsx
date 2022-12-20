import type { GetServerSidePropsContext, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { env } from "../../env/server.mjs";
import { getAlbumsAsAdmin } from "../../utils/fetchDataFromPrisma";

type AlbumsType = Awaited<ReturnType<typeof getAlbumsAsAdmin>>;

const AdminPanelPage: NextPage<{
  albums: AlbumsType;
}> = ({ albums }) => {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-2">
      {albums.map(({ id, title, description, images, _count }) => {
        const { filename } = images[0] || { filename: "" };
        return (
          <div
            key={id}
            className="flex flex-row items-center justify-start gap-12"
          >
            <div>
              <Image
                alt={`${title} ${description}`}
                height={128}
                quality={100}
                src={filename ? `/images/thumb/${filename}` : ""}
                width={128}
                unoptimized
              />
            </div>
            <div className="flex flex-grow flex-row items-center justify-start gap-8">
              <div>
                <p>{title}</p>
                <p>{description}</p>
              </div>
              <div>
                <p>
                  Images:
                  <span>{_count.images}</span>
                </p>
              </div>
            </div>
            <button
              className="rounded border-2 border-black/60 bg-yellow-400 px-4 py-2"
              type="button"
            >
              <Link href={`admin/album/${id}?password=brabilder`}>
                Redigera
              </Link>
            </button>
          </div>
        );
      })}
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
