import type { GetServerSidePropsContext, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import AlbumInfo from "../../components/imageGrid/AlbumInfo";
import { ImageGridItem } from "../../components/imageGrid/ImageGridItem";
import ImagePopup from "../../components/imageGrid/ImagePopup";
import MainWrapper from "../../components/Wrapper";
import { getAlbum } from "../../utils/fetchDataFromPrisma";
import type { AlbumType } from "../../utils/types";

const AlbumPage: NextPage<{ album: AlbumType }> = ({ album }) => {
  /*   fetch(
    "http://holmstrom.ddns.net:8080/df/lowres/20221107-zenitAzp-IMG_0147.jpg"
  ).then((res) => {
    console.log(res.status);
  }); */

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

  const photographers = [
    ...new Set(album.images.map((item) => item.photographer)),
  ];
  return (
    <>
      <MainWrapper>
        <div className="mx-auto flex max-w-7xl flex-col gap-4">
          <button
            className="-ml-4 w-fit md:-ml-2.5"
            onClick={() => {
              router.push("/");
            }}
            type="button"
          >
            {"<"}
            Tillbaka till album
          </button>
          <AlbumInfo album={album} photographers={photographers} />
          <div className="grid grid-cols-1 place-items-center gap-y-4 gap-x-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
          </div>
        </div>
      </MainWrapper>

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
