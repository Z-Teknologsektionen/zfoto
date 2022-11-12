import type { Image as ImageType } from "@prisma/client";
import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import ImagePopup from "../../components/ImagePopup";
import { trpc } from "../../utils/trpc";

const AlbumPage: NextPage = () => {
  const router = useRouter();
  const { albumId, imageId } = router.query;
  const {
    data: album,
    isLoading,
    isError,
  } = trpc.album.getOne.useQuery(
    {
      albumId: albumId?.toString() || "",
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  function closeNav() {
    document.body.classList.remove("overflow-hidden");
    router.push(`/test/${albumId}`);
  }

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
        {isLoading
          ? "Laddar..."
          : isError
          ? "Error..."
          : album?.images.map(({ id, filename }) => {
              return (
                <div
                  className="relative aspect-[5/4] h-full w-full max-w-xs overflow-hidden p-2"
                  key={id}
                  onClick={() => {
                    router.push(`/test/${albumId}?imageId=${id}`);
                    document.body.classList.add("overflow-hidden");
                  }}
                >
                  <Image
                    className={`rounded-xl object-contain object-center
                      before:absolute before:inset-0 before:z-0 before:rounded-3xl before:bg-black/10 before:p-4 before:content-[''] 
                  `}
                    src={filename ? `/images/${filename}` : ""}
                    alt={`${album.tilte}, ${album.description}`}
                    fill
                  />
                </div>
              );
            })}
      </section>
      <ImagePopup {...{ prevImageId, nextImageId, closeNav, album, image }} />
    </>
  );
};

export default AlbumPage;
