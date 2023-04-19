import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import BackButton from "~/components/BackButton";
import ImagePopup from "~/components/ImagePopup";
import AlbumInfo from "~/components/imageGrid/AlbumInfo";
import { ImageGridItem } from "~/components/imageGrid/ImageGridItem";
import { LoadingScreen } from "~/components/layout/Loader";
import MainLayout from "~/components/layout/MainLayout";
import SectionWrapper from "~/components/layout/SectionWrapper";
import { trpc } from "~/utils/trpc";
import { useCounter } from "~/utils/useCounter";
import { useToggle } from "~/utils/useToggle";

const AlbumPage: NextPage = () => {
  const {
    value: imageIndex,
    decrement: decrementImageIndex,
    increment: incrementImageIndex,
    setNumber: setImageIndex,
  } = useCounter();
  const [showPopup, togglePopup] = useToggle(false);

  useEffect(() => {
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  const router = useRouter();

  const { data: album, isLoading } = trpc.album.getOne.useQuery(
    { albumId: router.query.albumId as string },
    {
      refetchOnWindowFocus: false,
      retry: () => false,
      onError(err) {
        if (err.data?.code === "BAD_REQUEST") {
          toast.error("Finns inget album med det id:t!");
        } else {
          toast.error("Okänt fel, försök igen senare");
        }
        router.push("/");
      },
    }
  );

  const photographers = [
    ...new Set(album?.images.map((item) => item.photographer)),
  ];

  return (
    <>
      <MainLayout>
        <SectionWrapper className="flex flex-col gap-2">
          <BackButton />
          {isLoading && <LoadingScreen />}
          {album && (
            <>
              <AlbumInfo
                date={album.date}
                photographers={photographers}
                title={album.title}
              />
              <div className="grid grid-cols-2 place-items-center gap-y-4 gap-x-2 md:grid-cols-3 lg:grid-cols-5">
                {album?.images.map(({ id, filename }, idx) => (
                  <ImageGridItem
                    key={id}
                    {...{
                      id,
                      albumId: album.id,
                      filename,
                      album,
                      priority: idx < 10,
                    }}
                    onClick={() => {
                      togglePopup();
                      setImageIndex(idx);

                      document.body.classList.add("overflow-hidden");
                    }}
                  />
                ))}
              </div>
            </>
          )}
        </SectionWrapper>
      </MainLayout>

      {album && (
        <ImagePopup
          {...{
            album,
            showPopup,
            imageIndex,
            decrementImageIndex,
            incrementImageIndex,
          }}
          closePopup={() => {
            togglePopup();
            document.body.classList.remove("overflow-hidden");
          }}
        />
      )}
    </>
  );
};

export default AlbumPage;
