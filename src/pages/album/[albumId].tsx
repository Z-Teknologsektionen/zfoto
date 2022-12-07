import type { Album, Image } from "@prisma/client";
import type { GetServerSidePropsContext, NextPage } from "next";
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

  const [nextImage, prevImage, image] = useMemo(() => {
    return [
      album?.images.find((_, index) => {
        return album.images[index - 1]?.id === imageId;
      }),
      album?.images.find((_, index) => {
        return album.images[index + 1]?.id === imageId;
      }),
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
          router.push("/");
        }}
        className="ml-10"
      >
        {"<"}Tillbaka till album
      </button>
      <section className="mx-auto grid max-w-7xl grid-cols-1 place-items-center gap-y-4 gap-x-2 py-5 px-10 md:grid-cols-2 md:py-10 lg:grid-cols-3 xl:grid-cols-4">
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
          prevImage: prevImage,
          nextImage: nextImage,
          album,
          image,
          showPopup: showImagePopup,
        }}
        prevImageFunc={() => {
          if (!prevImage?.id) {
            return;
          }
          setImageId(prevImage.id);
        }}
        nextImageFunc={() => {
          if (!nextImage?.id) {
            return;
          }
          setImageId(nextImage.id);
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const albumId = context.params?.albumId || "";
    const album = await getAlbum(albumId.toString());
    return {
      props: {
        album: JSON.parse(JSON.stringify(album)),
        revalidate: 120,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
