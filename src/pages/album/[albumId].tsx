import type { Image as ImageType } from "@prisma/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { ImageGridItem } from "../../components/imageGrid/ImageGridItem";
import ImagePopup from "../../components/imageGrid/ImagePopup";
import { trpc } from "../../utils/trpc";

const AlbumPage: NextPage = () => {
  const router = useRouter();
  const { albumId = "", imageId } = router.query;
  const {
    data: album,
    isLoading,
    isError,
  } = trpc.album.getOne.useQuery(
    {
      albumId: albumId?.toString(),
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  let prevImageId: string | undefined,
    nextImageId: string | undefined,
    image: ImageType | undefined;

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
    document.body.classList.add("overflow-hidden");
  }
  return (
    <>
      <section className="mx-auto grid max-w-7xl grid-cols-1 place-items-center gap-1 py-5 px-10 sm:grid-cols-2 md:grid-cols-3 md:py-10 lg:grid-cols-4 xl:grid-cols-5">
        {isLoading || !albumId
          ? "Laddar..."
          : isError
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
