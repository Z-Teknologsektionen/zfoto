import type { Album, Image } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import type { GetStaticPropsContext, NextPage } from "next";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { ImageGridItem } from "../../components/imageGrid/ImageGridItem";
import ImagePopup from "../../components/imageGrid/ImagePopup";

type AlbumType = Album & { images: Image[] };

const AlbumPage: NextPage<{ album: AlbumType }> = ({ album }) => {
  const router = useRouter();
  const { albumId = "", imageId = "" } = router.query;

  const [nextImageId, prevImageId, image] = useMemo(() => {
    return [
      album?.images.filter((_, index) => {
        return album.images[index - 1]?.id === imageId;
      })[0]?.id,
      album?.images.filter((_, index) => {
        return album.images[index + 1]?.id === imageId;
      })[0]?.id,
      album?.images.find((image) => {
        return image.id === imageId;
      }),
    ];
  }, [imageId, album.images]);

  return (
    <>
      <section className="mx-auto grid max-w-7xl grid-cols-1 place-items-center gap-2 py-5 px-10 md:grid-cols-2 md:py-10 lg:grid-cols-3 xl:grid-cols-4">
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

const prisma = new PrismaClient();

export async function getStaticPaths() {
  const albums = await prisma.album.findMany({
    select: {
      id: true,
    },
  });

  const paths = albums.map((album) => {
    return {
      params: {
        albumId: album.id,
      },
    };
  });

  return {
    paths: paths,
    fallback: "blocking",
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const albumId = context.params?.albumId;
  const album = await prisma.album.findUniqueOrThrow({
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
      album: JSON.parse(JSON.stringify(album)) as typeof album,
      revalidate: 120,
    },
  };
}
