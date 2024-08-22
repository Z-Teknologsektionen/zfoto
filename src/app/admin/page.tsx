import { MONTH_INDEX_NOVEMBER } from "@/constants/admin";
import {
  getAlbumCountFromActiveYear,
  getTotalAlbumCount,
} from "@/server/data-access/albums";
import {
  getImageCountFromActiveYear,
  getTotalImageCount,
} from "@/server/data-access/images";
import { getCountsPerPhotographer } from "@/server/data-access/photographers";
import { Roles } from "@prisma/client";
import type { FC } from "react";
import { DataTable } from "~/components/data-table/data-table";
import { getAuth } from "~/utils/auth";
import { AdminInfoCard } from "./_components/admin-info-card";
import { adminPhotographerColumns } from "./_components/admin-photograhper-columns";
import { AdminSidebar } from "./_components/admin-sidebar";
import { PhotographerFilteringToolbar } from "./_components/photographer-filtering-toolbar";

const MINIMUM_NUMBER_OF_PHOTOS_PER_PHOTOGRAPHER = 20;
const NUMBER_OF_DECIMALS = 2;
const DECIMAL_TO_PROCENT = 100;

// eslint-disable-next-line max-lines-per-function
const AdminDashbord: FC = async () => {
  const session = await getAuth();
  const isAdmin = session?.user.role === Roles.ADMIN;

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const activeYear =
    currentDate.getMonth() < MONTH_INDEX_NOVEMBER
      ? currentYear - 1
      : currentYear;

  const [
    photographerCounts,
    imagesThisYear,
    imagesPrevYear,
    albumsThisYear,
    totalImages,
    totalAlbums,
  ] = await Promise.all([
    getCountsPerPhotographer(),
    getImageCountFromActiveYear(activeYear),
    getImageCountFromActiveYear(activeYear - 1),
    getAlbumCountFromActiveYear(activeYear),
    getTotalImageCount(),
    getTotalAlbumCount(),
  ]);

  const numberOfPhotographers = photographerCounts.length;
  const imagesPrevVSThisYear = imagesThisYear - imagesPrevYear;

  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      <h1 className="text-center text-3xl font-bold lg:hidden">Adminpanel</h1>
      <AdminSidebar isAdmin={isAdmin} />
      <div className="space-y-8">
        <h1 className="container hidden text-3xl font-bold lg:block">
          Adminpanel
        </h1>
        <section className="container grid gap-x-2 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
          <h2 className="col-span-full text-xl font-semibold">Statistik</h2>
          <AdminInfoCard
            title="Antal bilder"
            number={totalImages}
            info={`${((imagesThisYear / totalImages) * DECIMAL_TO_PROCENT).toFixed(NUMBER_OF_DECIMALS)}% av
              sittande`}
          />
          <AdminInfoCard
            title="Antal album"
            number={totalAlbums}
            info={`${((albumsThisYear / totalAlbums) * DECIMAL_TO_PROCENT).toFixed(NUMBER_OF_DECIMALS)}% av
                  sittande`}
          />
          <AdminInfoCard
            title="Antal fotografer"
            number={numberOfPhotographers}
            info={`~${(totalImages / totalAlbums).toFixed(NUMBER_OF_DECIMALS)} bilder per album`}
          />
          <AdminInfoCard
            title="Bilder av sittande"
            number={imagesThisYear}
            info={`${imagesPrevVSThisYear.toLocaleString()} mot förra sittande`}
          />
        </section>
        <section className="container space-y-4">
          <h2 className="text-xl font-semibold">Fotografer</h2>
          <DataTable
            noResultText="Inga fotografer"
            toolbar={PhotographerFilteringToolbar}
            columns={adminPhotographerColumns}
            data={photographerCounts.filter(
              ({ images }) =>
                images >= MINIMUM_NUMBER_OF_PHOTOS_PER_PHOTOGRAPHER,
            )}
          />
        </section>
      </div>
    </div>
  );
};

export default AdminDashbord;
