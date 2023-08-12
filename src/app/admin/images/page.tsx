import type { Prisma } from "@prisma/client";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { prisma } from "~/utils/db";
import { columns } from "./columns";
import { DataTable } from "./data-table";

const getAllImagesAsAdmin = async () => {
  const images = await prisma.image.findMany({
    select: {
      id: true,
      filename: true,
      photographer: true,
      visible: true,
      coverImage: true,
      date: true,
      album: {
        select: {
          title: true,
          id: true,
        },
      },
    },
    orderBy: {
      date: "desc",
    },
  });
  return images.map(({ album: { title, id }, ...image }) => {
    return {
      albumTitle: title,
      albumId: id,
      ...image,
    };
  });
};

export type ImageType = Prisma.PromiseReturnType<typeof getAllImagesAsAdmin>[0];

const ImagesAdminPage = async () => {
  const data = await getAllImagesAsAdmin();
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

export default ImagesAdminPage;
