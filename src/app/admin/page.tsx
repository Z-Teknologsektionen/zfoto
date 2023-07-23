import { Prisma } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { prisma } from "~/server/db/client";
import { columns } from "./columns";
import { DataTable } from "./data-table";

const getCountsPerPhotographer = async () => {
  const images = await prisma.image.groupBy({
    by: ["photographer"],
    _count: {
      _all: true,
      visible: true,
      coverImage: true,
    },
    orderBy: [{ photographer: "asc" }],
  });

  const imagesDates = await prisma.image.findMany({
    select: {
      date: true,
      photographer: true,
    },
    orderBy: [{ date: "asc" }],
  });

  const album = await prisma.album.findMany({
    select: {
      images: {
        select: {
          photographer: true,
          date: true,
        },
        orderBy: [{ date: "desc" }],
      },
    },
    orderBy: [{ date: "desc" }],
  });

  const result = images.map((image) => {
    const samePhotographer = (i: { photographer: string }) =>
      i.photographer === image.photographer;
    return {
      name: image.photographer,
      images: image._count._all,
      visible: image._count.visible,
      coverImage: image._count.coverImage,
      album: album.filter((a) => a.images.some(samePhotographer)).length,
      firstImage: imagesDates.find(samePhotographer)?.date,
      latestImage: imagesDates.reverse().find(samePhotographer)?.date,
    };
  });

  return result;
};

const getImageCountFromActive = async () => {
  const currentDate = new Date();
  let activeYear = currentDate.getFullYear();
  if (currentDate.getMonth() < 10) {
    activeYear -= 1;
  }

  return prisma.image.count({
    where: {
      date: {
        gt: new Date(activeYear, 10, 1),
        lt: new Date(activeYear + 1, 9, 31),
      },
    },
  });
};

const getAlbumCountFromActive = async () => {
  const currentDate = new Date();
  let activeYear = currentDate.getFullYear();
  if (currentDate.getMonth() < 10) {
    activeYear -= 1;
  }

  return prisma.album.count({
    where: {
      date: {
        gt: new Date(activeYear, 10, 1),
        lt: new Date(activeYear + 1, 9, 31),
      },
    },
  });
};

const getTotalImageCount = async () => {
  return prisma.image.count();
};
const getTotalAlbumCount = async () => {
  return prisma.album.count();
};

export type CountsPerPhotographerType = Prisma.PromiseReturnType<
  typeof getCountsPerPhotographer
>[0];

const page = async () => {
  const result = await getCountsPerPhotographer();
  const imagesThisYear = await getImageCountFromActive();
  const albumsThisYear = await getAlbumCountFromActive();
  const totaltImages = await getTotalImageCount();
  const totaltAlbums = await getTotalAlbumCount();
  const numberOfPhotographers = result.length;

  return (
    <>
      {/* TODO: Add sidebar with links */}
      <section className="container grid gap-x-2 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
        <h1 className="col-span-full text-xl font-semibold">Statistik</h1>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Antal bilder</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totaltImages}</div>
            <p className="text-muted-foreground text-xs">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Antal album</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totaltAlbums}</div>
            <p className="text-muted-foreground text-xs">
              {((albumsThisYear / totaltAlbums) * 100).toFixed(2)}% av sittande
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Antal fotografer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{numberOfPhotographers}</div>
            <p className="text-muted-foreground text-xs">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Bilder av sittande
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{imagesThisYear}</div>
            <p className="text-muted-foreground text-xs">
              {((imagesThisYear / totaltImages) * 100).toFixed(2)}% av totalt
              antal bilder
            </p>
          </CardContent>
        </Card>
      </section>
      <section className="container">
        <h1 className="text-xl font-semibold">Fotografer</h1>
        <DataTable columns={columns} data={result} />
      </section>
    </>
  );
};

export default page;
