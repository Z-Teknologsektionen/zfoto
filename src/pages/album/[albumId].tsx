import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useEffect, useState } from "react";
import BackButton from "../../components/BackButton";
import AlbumInfo from "../../components/imageGrid/AlbumInfo";
import { ImageGridItem } from "../../components/imageGrid/ImageGridItem";
import ImagePopup from "../../components/ImagePopup";
import MainWrapper from "../../components/Wrapper";
import { getAlbum } from "../../utils/fetchDataFromPrisma";
import type { AlbumType } from "../../utils/types";

const AlbumPage: NextPage<{ album: AlbumType }> = ({ album }) => {
  const [imageId, setImageId] = useState<string>();
  const [showPopup, setShowPopup] = useState<boolean>(false);

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
        <div className="mx-auto flex max-w-7xl flex-col gap-2">
          <BackButton />

          <AlbumInfo
            date={album.date}
            photographers={photographers}
            title={album.title}
          />

          <div className="grid grid-cols-2 place-items-center gap-y-4 gap-x-2 md:grid-cols-3 lg:grid-cols-5">
            {album?.images.map(({ id, filename }) => {
              return (
                <ImageGridItem
                  key={id}
                  {...{ id, albumId: album.id, filename, album }}
                  onClick={() => {
                    setImageId(id);
                    setShowPopup(true);

                    document.body.classList.add("overflow-hidden");
                  }}
                />
              );
            })}
          </div>
        </div>
      </MainWrapper>

      <ImagePopup
        key={imageId}
        {...{ album, imageId, setImageId, showPopup }}
        closePopup={() => {
          setShowPopup(false);
          document.body.classList.remove("overflow-hidden");
        }}
      />
    </>
  );
};

export default AlbumPage;

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<{ album: AlbumType }> = async (
  context
) => {
  try {
    const albumId = context.params?.albumId || "";
    const album = await getAlbum(albumId.toString());

    return {
      props: {
        album: JSON.parse(JSON.stringify(album)) as typeof album,
      },
      revalidate: 300,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
