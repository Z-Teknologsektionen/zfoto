import type { Album, Image } from "@prisma/client";
import type { GetStaticPropsContext, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { ImageGridItem } from "../../components/imageGrid/ImageGridItem";
import ImagePopup from "../../components/imageGrid/ImagePopup";
import { getAlbum } from "../../utils/fetchDataFromPrisma";

type AlbumType = Album & { images: Image[] };

const AlbumPage: NextPage<{ album: AlbumType }> = ({ album }) => {
  const router = useRouter();
  const [imageId, setImageId] = useState<string>();
  const [showImagePopup, setShowImagePopup] = useState<boolean>(false);

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

  useEffect(() => {
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return (
    <>
      <button
        onClick={() => {
          router.back();
        }}
        className="ml-10"
      >
        {"<"}Gå tillbaka
      </button>
      <section className="mx-auto grid max-w-7xl grid-cols-1 place-items-center gap-2 py-5 px-10 md:grid-cols-2 md:py-10 lg:grid-cols-3 xl:grid-cols-4">
        {!album.id || !album || !album.images
          ? "Error..."
          : album?.images.map(({ id, filename }) => {
              return (
                <ImageGridItem
                  key={id}
                  {...{ id, albumId: album.id, filename, album }}
                  onClick={() => {
                    setImageId(id);
                    setShowImagePopup(true);

                    document.body.classList.add("overflow-hidden");
                  }}
                />
              );
            })}
      </section>
      <ImagePopup
        key={imageId}
        {...{
          prevImageId,
          nextImageId,
          album,
          image,
          showPopup: showImagePopup,
        }}
        prevImage={() => {
          if (!prevImageId) {
            return;
          }
          setImageId(prevImageId);
        }}
        nextImage={() => {
          if (!nextImageId) {
            return;
          }
          setImageId(nextImageId);
        }}
        closePopup={() => {
          setShowImagePopup(false);
          document.body.classList.remove("overflow-hidden");
        }}
      />
    </>
  );
};

export default AlbumPage;

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const albumId = context.params?.albumId || "";
  const album = await getAlbum(albumId.toString());
  return {
    props: {
      album: JSON.parse(JSON.stringify(album)),
      revalidate: 120,
    },
  };
}
