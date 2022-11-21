import type { Album } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import type { GetStaticPropsContext, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

type ImageType = {
  id: string;
  album: Album;
  filename: string;
  photographer: string;
  date: Date;
};

const ImagePage: NextPage<{ image: ImageType }> = ({ image }) => {
  return (
    <section className="mx-auto flex h-full max-w-7xl flex-row">
      <div className="flex-grod relative h-[500px] flex-grow">
        <Image
          src={image.filename ? `/images/${image.filename}` : "/"}
          alt={`${image.album.title}, ${image.album.description}`}
          fill
          className="object-contain object-center"
          sizes="600px"
        />
      </div>
      <div className="flex flex-col items-start justify-center gap-4 lg:min-w-[400px]">
        <Link href={`/album/${image.album.id}`} className="font-medium">
          Till albummet
        </Link>
        <p>Fotograf: {image.photographer}</p>
        <p>Filename: {image.filename}</p>
        <div className="flex flex-col gap-2">
          <h2>Album information:</h2>
          <p>Titel: {image.album.title}</p>
          <p>Beskrivning: {image.album.description}</p>
        </div>
        <p className="mt-2">
          Kontakta oss{" "}
          <Link className="underline underline-offset-2" href="/contact">
            här
          </Link>{" "}
          med filnamnet eller bild id:t för att få bilden i högre upplösning
        </p>
      </div>
    </section>
  );
};

export default ImagePage;

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const imageId = context.params?.imageId || "";
  const prisma = new PrismaClient();
  const image = await prisma.image.findUniqueOrThrow({
    where: {
      id: typeof imageId === "string" ? imageId : imageId[0],
    },
    select: {
      id: true,
      album: true,
      filename: true,
      photographer: true,
      date: true,
    },
  });
  return {
    props: {
      image: JSON.parse(JSON.stringify(image)) as typeof image,
      revalidate: 120,
    },
  };
}
