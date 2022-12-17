import type { GetServerSidePropsContext, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { ImageGridItem } from "../../components/imageGrid/ImageGridItem";
import ImagePopup from "../../components/imageGrid/ImagePopup";
import { getAlbum } from "../../utils/fetchDataFromPrisma";
import type { AlbumType } from "../../utils/types";

const AlbumPage: NextPage<{ album: AlbumType }> = ({ album }) => {
  const router = useRouter();
  const [imageId, setImageId] = useState<string>();
  const [showImagePopup, setShowImagePopup] = useState<boolean>(false);

  const [nextImage, prevImage, activeImage] = useMemo(() => {
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
        className="ml-10"
        onClick={() => {
          router.push("/");
        }}
        type="button"
      >
        {"<"}
        Tillbaka till album
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
      {imageId && activeImage && (
        <ImagePopup
          key={imageId}
          {...{
            prevImage,
            nextImage,
            album,
            image: activeImage,
            showPopup: showImagePopup,
          }}
          closePopup={() => {
            setShowImagePopup(false);
            document.body.classList.remove("overflow-hidden");
          }}
          nextImageFunc={() => {
            if (!nextImage?.id) {
              return;
            }
            setImageId(nextImage.id);
          }}
          prevImageFunc={() => {
            if (!prevImage?.id) {
              return;
            }
            setImageId(prevImage.id);
          }}
        />
      )}
    </>
  );
};

export default AlbumPage;

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<{ notFound: boolean } | { props: { album: AlbumType } }> {
  try {
    const albumId = context.params?.albumId || "";
    const album = await getAlbum(albumId.toString());
    return {
      props: {
        album: JSON.parse(JSON.stringify(album)) as typeof album,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
