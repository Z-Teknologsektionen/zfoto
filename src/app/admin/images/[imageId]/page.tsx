import { Prisma } from "@prisma/client";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "~/components/ui/button";
import { prisma } from "~/utils/db";
import EditAlbumForm from "./edit-form";

const getImageAsAdmin = async (id: string) => {
  return prisma.image.findUniqueOrThrow({
    where: {
      id: id,
    },
    select: {
      id: true,
      filename: true,
      coverImage: true,
      visible: true,
      photographer: true,
      albumId: true,
      date: true,
    },
  });
};

export type ImageAsAdmin = Prisma.PromiseReturnType<typeof getImageAsAdmin>;

const page = async ({ params }: { params: { imageId: string } }) => {
  const image = await getImageAsAdmin(params.imageId).catch(() => notFound());
  return (
    <>
      <div className="container">
        <Button variant="link" className="-ml-8" asChild>
          <Link href={"/admin/images"}>
            <ChevronLeft className="h-4 w-4" />
            <span>Tillbaka</span>
          </Link>
        </Button>
      </div>
      <section className="container space-y-4">
        <div>
          <h1 className="text-xl font-semibold">Redigera album</h1>
          <p className="text-sm">{image.id}</p>
          <p className="text-sm">{image.filename}</p>
        </div>
        <div>
          <EditAlbumForm {...image} />
        </div>
        <div className="">
          <Image
            src={`/images/lowres/${image.filename}`}
            alt={`Filnamn: ${image.filename}, Fotograf: ${image.photographer}`}
            height={400}
            width={400}
            className="mx-auto block object-contain object-center"
          />
        </div>
      </section>
    </>
  );
};

export default page;