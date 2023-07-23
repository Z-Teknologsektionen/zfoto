import type { Prisma } from "@prisma/client";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { prisma } from "~/server/db/client";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import EditAlbumForm from "./edit-form";

const getAllAlbumAsAdmin = async (id: string) => {
  const {
    images,
    _count: { images: numberOfImages },
    ...album
  } = await prisma.album.findUniqueOrThrow({
    where: {
      id,
    },
    select: {
      id: true,
      title: true,
      visible: true,
      isReception: true,
      date: true,
      images: {
        orderBy: { date: "asc" },
        select: {
          id: true,
          photographer: true,
          filename: true,
          visible: true,
          coverImage: true,
          date: true,
        },
      },
      _count: {
        select: {
          images: true,
        },
      },
    },
  });
  return { numberOfImages, images, ...album };
};

export type Image = Prisma.PromiseReturnType<
  typeof getAllAlbumAsAdmin
>["images"][0];

const page = async ({ params }: { params: { albumId: string } }) => {
  const album = await getAllAlbumAsAdmin(params.albumId);
  return (
    <>
      <div className="container">
        <Button variant="link" className="-ml-8" asChild>
          <Link href={"/admin/albums"}>
            <ChevronLeft className="h-4 w-4" />
            <span>Tillbaka</span>
          </Link>
        </Button>
      </div>
      <section className="container space-y-4">
        <div>
          <h1 className="text-xl font-semibold">Redigera album</h1>
          <p className="text-sm">{album.id}</p>
        </div>
        <div>
          <EditAlbumForm {...album} />
        </div>
      </section>
      <section className="container">
        <h1 className="text-xl font-semibold">Bilder</h1>
        <DataTable columns={columns} data={album.images} />
      </section>
    </>
  );
};

export default page;
