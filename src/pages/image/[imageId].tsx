import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import MainWrapper from "../../components/Wrapper";
import { getImage } from "../../utils/fetchDataFromPrisma";

type ImageType = Awaited<ReturnType<typeof getImage>>;

const ImagePage: NextPage<{
  image: ImageType;
}> = ({ image }) => {
  return (
    <MainWrapper>
      <div className="mx-auto max-w-7xl">
        <Link className="" href={`/album/${image.album.id}`}>
          {"<"}
          Tillbaka till albumet
        </Link>
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
