import type { GetStaticPropsContext, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAlbums } from "../../utils/fetchDataFromPrisma";

const AdminPanelPage: NextPage<{
  albums: Awaited<ReturnType<typeof getAlbums>>;
}> = ({ albums }) => {
  return (
    <div className="mx-auto max-w-7xl">
      {albums.map(({ id, title, description, images, _count }) => {
        const { filename } = images[0] || { filename: "" };
        return (
          <div
            key={id}
            className="flex flex-row items-center justify-start gap-12"
          >
            <div>
              <Image
                src={
                  filename
                    ? `http://holmstrom.ddns.net:8080/df/thumb/${filename}`
                    : ""
                }
                alt={""}
                height={128}
                width={128}
                quality={100}
              />
            </div>
            <div>
              <p>{title}</p>
              <p>{description}</p>
            </div>
            <div>
              <p>
                Images: <span>{_count.images}</span>
              </p>
            </div>
            <div>
              <Link
                href={`admin/album/${id}`}
                className="rounded-md border-2 border-black px-4 py-2"
              >
                Redigera
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AdminPanelPage;

export async function getStaticProps(context: GetStaticPropsContext) {
  const allAlbums = await getAlbums();
  return {
    props: {
      albums: JSON.parse(JSON.stringify(allAlbums)),
    },
    revalidate: 300,
  };
}
