import { Prisma } from "@prisma/client";
import { prisma } from "~/server/db/client";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import InfoCard from "./info-card";
import Sidebar from "./sidebar";

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
      latestImage: imagesDates.findLast(samePhotographer)?.date,
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
const getImageCountFromLastActive = async () => {
  const currentDate = new Date();
  let activeYear = currentDate.getFullYear();
  if (currentDate.getMonth() < 10) {
    activeYear -= 1;
  }

  return prisma.image.count({
    where: {
      date: {
        gt: new Date(activeYear - 1, 10, 1),
        lt: new Date(activeYear - 1 + 1, 9, 31),
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
  const imagesPrevYear = await getImageCountFromLastActive();
  const albumsThisYear = await getAlbumCountFromActive();
  const totalImages = await getTotalImageCount();
  const totalAlbums = await getTotalAlbumCount();
  const numberOfPhotographers = result.length;

  const imagesPrevVSThisYear = `${
    imagesThisYear - imagesPrevYear > 0 ? "+" : "-"
  }${Math.abs(imagesThisYear - imagesPrevYear)}`;

  return (
    <>
      <div className="flex flex-col gap-4 lg:flex-row">
        <h1 className="text-center text-3xl font-bold lg:hidden">
          Admin panel
        </h1>
        <Sidebar />
        <div className="space-y-8">
          <h1 className="container hidden text-3xl font-bold lg:block">
            Admin panel
          </h1>
          <section className="container grid gap-x-2 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
            <h2 className="col-span-full text-xl font-semibold">Statistik</h2>
            <InfoCard
              title="Antal bilder"
              number={totalImages}
              info={`${((imagesThisYear / totalImages) * 100).toFixed(2)}% av
              sittande`}
            />
            <InfoCard
              title="Antal album"
              number={totalAlbums}
              info={`${((albumsThisYear / totalAlbums) * 100).toFixed(2)}% av
                  sittande`}
            />
            <InfoCard
              title="Antal fotografer"
              number={numberOfPhotographers}
              info={`~${(totalImages / totalAlbums).toFixed(
                2,
              )} bilder per album`}
            />
            <InfoCard
              title="Bilder av sittande"
              number={imagesThisYear}
              info={`${imagesPrevVSThisYear} mot förra sittande`}
            />
          </section>
          <section className="container">
            <h2 className="text-xl font-semibold">Fotografer</h2>
            <DataTable columns={columns} data={result} />
          </section>
        </div>
      </div>
    </>
  );
};

export default page;

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
      latestImage: imagesDates.findLast(samePhotographer)?.date,
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

const getImageCountFromLastActive = async () => {
  const currentDate = new Date();
  let activeYear = currentDate.getFullYear();
  if (currentDate.getMonth() < 10) {
    activeYear -= 1;
  }

  return prisma.image.count({
    where: {
      date: {
        gt: new Date(activeYear - 1, 10, 1),
        lt: new Date(activeYear - 1 + 1, 9, 31),
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
  const imagesPrevYear = await getImageCountFromLastActive();
  const albumsThisYear = await getAlbumCountFromActive();
  const totalImages = await getTotalImageCount();
  const totalAlbums = await getTotalAlbumCount();
  const numberOfPhotographers = result.length;

  const imagesPrevVSThisYear = `${
    imagesThisYear - imagesPrevYear > 0 ? "+" : "-"
  }${Math.abs(imagesThisYear - imagesPrevYear)}`;

  return (
    <>
      <div className="flex flex-col gap-4 lg:flex-row">
        <h1 className="text-center text-3xl font-bold lg:hidden">
          Admin panel
        </h1>
        <Sidebar />
        <div className="space-y-8">
          <h1 className="container hidden text-3xl font-bold lg:block">
            Admin panel
          </h1>
          <section className="container grid gap-x-2 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
            <h2 className="col-span-full text-xl font-semibold">Statistik</h2>
            <InfoCard
              title="Antal bilder"
              number={totalImages}
              info={`${((imagesThisYear / totalImages) * 100).toFixed(2)}% av
              sittande`}
            />
            <InfoCard
              title="Antal album"
              number={totalAlbums}
              info={`${((albumsThisYear / totalAlbums) * 100).toFixed(2)}% av
                  sittande`}
            />
            <InfoCard
              title="Antal fotografer"
              number={numberOfPhotographers}
              info={`~${(totalImages / totalAlbums).toFixed(
                2,
              )} bilder per album`}
            />
            <InfoCard
              title="Bilder av sittande"
              number={imagesThisYear}
              info={`${imagesPrevVSThisYear} mot förra sittande`}
            />
          </section>
          <section className="container">
            <h2 className="text-xl font-semibold">Fotografer</h2>
            <DataTable columns={columns} data={result} />
          </section>
        </div>
      </div>
    </>
  );
};

export default page;
