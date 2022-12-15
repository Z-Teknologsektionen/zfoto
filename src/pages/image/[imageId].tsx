import type { GetServerSidePropsContext, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import MainWrapper from "../../components/Wrapper";
import { getImage } from "../../utils/fetchDataFromPrisma";

const ImagePage: NextPage<{
  image: Awaited<ReturnType<typeof getImage>>;
}> = ({ image }) => {
  return (
    <MainWrapper>
      <div className="mx-auto flex max-w-7xl flex-col gap-2 sm:flex-row">
        <div className="relative h-[500px] min-w-[250px] flex-grow sm:min-w-[300px]">
          <Image
            src={
              image.filename
                ? `http://holmstrom.ddns.net:8080/df/lowres/${image.filename}`
                : ""
            }
            alt={`${image.album.title}, ${image.album.description}`}
            fill
            className="object-contain object-center"
            sizes="750px"
            quality={90}
            unoptimized
          />
        </div>
        <div className="flex flex-grow-0 flex-col items-start justify-center gap-2 sm:min-w-[250px]">
          <Link
            href={`/album/${image.album.id}`}
            className="text-lg font-medium"
          >
            Till albummet
          </Link>
          <p>Fotograf: {image.photographer}</p>
          <p>Filename: {image.filename}</p>
          <h2>Album information:</h2>
          <div className="flex flex-col gap-1 pl-4">
            <p>Titel: {image.album.title}</p>
            <p>Beskrivning: {image.album.description}</p>
          </div>
          <p className="pt-4">
            Kontakta oss{" "}
            <Link className="underline underline-offset-2" href="/contact">
              här
            </Link>{" "}
            med filnamnet eller bild id:t för att få bilden i högre upplösning
          </p>
        </div>
      </div>
    </MainWrapper>
  );
};

export default ImagePage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const imageId = context.params?.imageId?.toString() || "";
    const image = await getImage({ imageId });
    return {
      props: {
        image: JSON.parse(JSON.stringify(image)) as typeof image,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
