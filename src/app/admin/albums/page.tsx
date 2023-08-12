import type { Prisma } from "@prisma/client";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { prisma } from "~/utils/db";
import { columns } from "./columns";
import { DataTable } from "./data-table";

const getAllAlbumsAsAdmin = async () => {
  const albums = await prisma.album.findMany({
    include: {
      _count: true,
      images: {
        orderBy: { date: "asc" },
        take: 1,
        where: {
          coverImage: true,
          visible: true,
        },
      },
    },
    orderBy: {
      date: "desc",
    },
  });
  return albums.map(({ images, _count, ...album }) => {
    return {
      ...album,
      coverImageFilename: images.at(0)?.filename,
      count: _count.images,
    };
  });
};

export type Album = Prisma.PromiseReturnType<typeof getAllAlbumsAsAdmin>[0];

const AlbumsAdminPage = async () => {
  const data = await getAllAlbumsAsAdmin();
  return (
    <>
      <div className="container">
        <Button variant="link" className="-ml-8" asChild>
          <Link href={"/admin"}>
            <ChevronLeft className="h-4 w-4" />
            <span>Tillbaka</span>
          </Link>
        </Button>
      </div>
      <section className="container space-y-4">
        <h1 className="text-xl font-semibold">Album</h1>
        <DataTable columns={columns} data={data} />
      </section>
    </>
  );
};

export default AlbumsAdminPage;
