import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { toast } from "react-hot-toast";
import BackButton from "~/components/BackButton";
import ImagePopup from "~/components/ImagePopup";
import { AlbumGridItem } from "~/components/albumGrid/AlbumGridItem";
import AlbumInfo from "~/components/imageGrid/AlbumInfo";
import { ImageGridItem } from "~/components/imageGrid/ImageGridItem";
import AlbumGrid from "~/components/layout/AlbumGrid";
import { LoadingScreen } from "~/components/layout/Loader";
import MainLayout from "~/components/layout/MainLayout";
import SectionWrapper from "~/components/layout/SectionWrapper";
import { ssg } from "~/server/helpers/SSGHelper";
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
  const router = useRouter();

  useEffect(() => {
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  const albumId = router.query.albumId as string;

  const { data: album, isLoading } = trpc.album.getOne.useQuery(
    { albumId },
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

  const { data: recommendedAlbums } = trpc.album.getRecommendedAlbums.useQuery({
    count: 3,
    excludedId: albumId,
  });

  const photographers = useMemo(
    () => [...new Set(album?.images.map((item) => item.photographer))],
    [album?.images]
  );

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
              <div className="grid grid-cols-2 place-items-center gap-x-2 gap-y-4 md:grid-cols-3 lg:grid-cols-5">
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
        <SectionWrapper className="space-y-8">
          <h1 className="text-2xl font-medium">Kika även in dessa albumen</h1>
          {recommendedAlbums ? (
            <AlbumGrid>
              {recommendedAlbums.map((recommendedAlbum) => (
                <AlbumGridItem
                  key={recommendedAlbum.id}
                  {...recommendedAlbum}
                />
              ))}
              <Link
                className="relative grid h-full w-full max-w-xs flex-grow items-center justify-center overflow-hidden rounded-lg border-2 bg-[#333333]/95 px-4 py-3 text-[#a7a7a7] shadow"
                href="/"
              >
                <h2 className="text-xl font-normal">Visa fler...</h2>
              </Link>
            </AlbumGrid>
          ) : (
            <div />
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

export const getStaticProps: GetStaticProps<
  { albumId: string },
  { albumId: string }
> = async ({ params }) => {
  try {
    const { albumId } = params || { albumId: "" };
    await ssg.album.getOne.fetch({
      albumId,
    });
    return {
      props: {
        trpcState: ssg.dehydrate(),
        albumId,
      },
      revalidate: 1,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    fallback: "blocking",
    paths: [],
  };
};
