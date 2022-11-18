import type { Album, Image } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import type { GetServerSidePropsContext, NextPage } from "next";
import { useRouter } from "next/router";
import { ImageGridItem } from "../../components/imageGrid/ImageGridItem";
import ImagePopup from "../../components/imageGrid/ImagePopup";

type AlbumType = Album & { images: Image[] };

const AlbumPage: NextPage<{ album: AlbumType }> = ({ album }) => {
  const router = useRouter();
  const { albumId = "", imageId = "" } = router.query;

  if (typeof albumId === "undefined") {
    return <div>loading...</div>;
  }

  if (typeof imageId === "undefined") {
    return <div>loading...</div>;
  }

  let prevImageId: string | undefined,
    nextImageId: string | undefined,
    image: Image | undefined;

  if (imageId) {
    nextImageId = album?.images.filter((_, index) => {
      return album.images[index - 1]?.id === imageId;
    })[0]?.id;
    prevImageId = album?.images.filter((_, index) => {
      return album.images[index + 1]?.id === imageId;
    })[0]?.id;
    image = album?.images.find((image) => {
      return image.id === imageId;
    });
    if (typeof document !== "undefined") {
      document.body.classList.add("overflow-hidden");
    }
  }
  return (
    <>
      <section className="mx-auto grid max-w-7xl grid-cols-1 place-items-center gap-1 py-5 px-10 sm:grid-cols-2 md:grid-cols-3 md:py-10 lg:grid-cols-4 xl:grid-cols-5">
        {!albumId || !album || !album.images
          ? "Error..."
          : album?.images.map(({ id, filename }) => {
              return (
                <ImageGridItem key={id} {...{ id, albumId, filename, album }} />
              );
            })}
      </section>
      <ImagePopup {...{ prevImageId, nextImageId, album, image }} />
    </>
  );
};

export default AlbumPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const {
    query: { albumId },
  } = context;
  const prisma = new PrismaClient();
  const album = await prisma.album.findUnique({
    where: {
      id: albumId?.toString(),
    },
    select: {
      id: true,
      title: true,
      description: true,
      images: {
        where: {
          id: {
            not: undefined,
          },
        },
      },
      date: true,
    },
  });
  return {
    props: {
      album: JSON.parse(JSON.stringify(album)),
    },
  };
}
