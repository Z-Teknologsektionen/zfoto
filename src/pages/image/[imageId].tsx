import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import MainWrapper from "../../components/Wrapper";
import { getImage } from "../../utils/fetchDataFromPrisma";

type ImageType = Awaited<ReturnType<typeof getImage>>;

const ImagePage: NextPage<{
  image: ImageType;
}> = ({ image }) => {
  return (
    <MainWrapper>
      <div className="mx-auto flex max-w-7xl flex-col gap-2 sm:flex-row">
        <div className="relative h-[500px] min-w-[250px] flex-grow sm:min-w-[300px]">
          <Image
            alt={`${image.album.title}, ${image.album.description}`}
            className="object-contain object-center"
            quality={90}
            sizes="750px"
            src={image.filename ? `/images/lowres/${image.filename}` : ""}
            fill
            unoptimized
          />
        </div>
        <div className="flex flex-grow-0 flex-col items-start justify-center gap-2 sm:min-w-[250px]">
          <Link
            className="text-lg font-medium"
            href={`/album/${image.album.id}`}
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
            Kontakta oss
            <Link className="underline underline-offset-2" href="/contact">
              {` här `}
            </Link>
            med filnamnet för att få bilden i högre upplösning
          </p>
        </div>
      </div>
    </MainWrapper>
  );
};

export default ImagePage;

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<{ image: ImageType }> = async (
  context
) => {
  try {
    const imageId = context.params?.imageId?.toString() || "";
    const image = await getImage({ imageId });
    return {
      props: {
        image: JSON.parse(JSON.stringify(image)) as typeof image,
      },
      revalidate: 300,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
