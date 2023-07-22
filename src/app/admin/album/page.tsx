import type { Prisma } from "@prisma/client";
import { prisma } from "~/server/db/client";
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

const page = async () => {
  const data = await getAllAlbumsAsAdmin();
  return (
    <section className="mx-auto max-w-7xl">
      <DataTable columns={columns} data={data} />;
    </section>
  );
};

export default page;
