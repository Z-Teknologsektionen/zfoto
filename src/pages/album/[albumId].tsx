import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import BackButton from "~/components/BackButton";
import ImagePopup from "~/components/ImagePopup";
import AlbumInfo from "~/components/imageGrid/AlbumInfo";
import { ImageGridItem } from "~/components/imageGrid/ImageGridItem";
import { LoadingScreen } from "~/components/layout/Loader";
import MainLayout from "~/components/layout/MainLayout";
import SectionWrapper from "~/components/layout/SectionWrapper";
import { ssg } from "~/server/helpers/SSGHelper";
import { trpc } from "~/utils/trpc";

const AlbumPage: NextPage = () => {
  const [imageIndex, setImageIndex] = useState<number>(0);
  const [showPopup, setShowPopup] = useState<boolean>(false);

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
      onError(err) {
        toast.error(err.data?.code ?? "Okänt fel, försök igen senare");
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
                {album?.images.map(({ id, filename }, idx) => {
                  return (
                    <ImageGridItem
                      key={id}
                      {...{
                        id,
                        albumId: album.id,
                        filename,
                        album,
                        priority: idx <= 5,
                      }}
                      onClick={() => {
                        setShowPopup(true);
                        setImageIndex(idx);

                        document.body.classList.add("overflow-hidden");
                      }}
                    />
                  );
                })}
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
            setImageIndex,
          }}
          closePopup={() => {
            setShowPopup(false);
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
    const albumId = params?.albumId as string;
    await ssg.album.getOne.fetch({ albumId });
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
  return { fallback: "blocking", paths: [] };
};
