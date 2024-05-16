import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";
import { BackButton } from "~/components/back-button";
import { SectionWrapper } from "~/components/layout/SectionWrapper";
import { getImagebyId } from "~/utils/fetchImageData";
import { createByline, getFullFilePath } from "~/utils/utils";

export const revalidate = 300;

const getImage = cache(getImagebyId);

type ImagePageProps = {
  params: { imageId: string };
};

export async function generateMetadata({
  params: { imageId },
}: ImagePageProps): Promise<Metadata> {
  const image = await getImage(imageId);

  return {
    title: image.album.title,
    description: `Bild från ${image.album.title}, ${image.date.toDateString()}`,
    openGraph: {
      images: [
        {
          url: getFullFilePath(image.filename),
        },
      ],
      authors: image.photographer,
    },
  };
}

const ImagePage = async ({ params }: ImagePageProps) => {
  const image = await getImage(params.imageId).catch(() => notFound());

  const byline = createByline(image.photographer);
  return (
    <>
      <SectionWrapper className="container">
        <BackButton />
        <div className="mt-4 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-grow sm:min-w-[300px]">
            <Image
              alt={`Bild från "${image.album.title}"`}
              className="mx-auto max-h-[75vmin] w-fit max-w-full object-contain object-center"
              sizes="750px"
              src={getFullFilePath(image.filename, "lowres")}
              unoptimized
              height={1500}
              width={1500}
            />
            <div className="mt-2">
              <p className="text-center font-semibold">{byline}</p>
            </div>
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
      </SectionWrapper>
    </>
  );
};

export default ImagePage;
