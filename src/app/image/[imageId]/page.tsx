import Link from "next/link";
import { notFound } from "next/navigation";
import BackButton from "~/components/BackButton";
import SectionWrapper from "~/components/layout/SectionWrapper";
import { getImagebyId } from "~/utils/fetchImageData";

const ImagePage = async ({ params }: { params: { imageId: string } }) => {
  const image = await getImagebyId(params.imageId).catch(() => notFound());

  return (
    <>
      <SectionWrapper className="container">
        <BackButton />
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
      </SectionWrapper>
    </>
  );
};

export default ImagePage;