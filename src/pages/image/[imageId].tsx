import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import BackButton from "~/components/BackButton";
import { LoadingScreen } from "~/components/layout/Loader";
import MainLayout from "~/components/layout/MainLayout";
import SectionWrapper from "~/components/layout/SectionWrapper";
import { trpc } from "~/utils/trpc";

const ImagePage: NextPage = () => {
  const router = useRouter();
  const { data: image, isLoading } = trpc.image.getOne.useQuery(
    { imageId: router.query.imageId as string },
    {
      refetchOnWindowFocus: false,
      retry: () => false,
      onError(err) {
        if (err.data?.code === "BAD_REQUEST") {
          toast.error("Finns inget album med det id:t!", { duration: 5000 });
          router.push("/");
        } else {
          toast.error("Okänt fel, försök igen senare");
        }
      },
    }
  );

  return (
    <MainLayout>
      <SectionWrapper className="mx-auto max-w-7xl">
        <BackButton />
        {isLoading && <LoadingScreen />}
        {image && (
          <div className="mt-4 flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-grow sm:min-w-[300px]">
              <img
                alt={`Bild från "${image.album.title}"`}
                className="mx-auto max-h-[75vmin] w-fit max-w-full object-contain object-center"
                sizes="750px"
                src={image.filename ? `/images/lowres/${image.filename}` : ""}
              />
            </div>
            <div className="flex flex-grow-0 flex-col items-start justify-center gap-2 sm:min-w-[250px]">
              <h1 className="text-xl font-bold">{image.album.title}</h1>
              <p className="font-medium">Fotograf: {image.photographer}</p>
              <p className="">Filenamn: {image.filename}</p>
              <p className="">
                <Link className="underline underline-offset-2" href="/contact">
                  Kontakta oss
                </Link>{" "}
                med filnamnet för att få bilden i högre upplösning
              </p>
            </div>
          </div>
        )}
      </SectionWrapper>
    </MainLayout>
  );
};

export default ImagePage;
