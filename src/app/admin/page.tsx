import { DataTable } from "~/components/data-table/data-table";
import {
  getAlbumCountFromYear,
  getCountsPerPhotographer,
  getImageCountFromYear,
  getTotalAlbumCount,
  getTotalImageCount,
} from "~/utils/fetchAdminData";
import { adminPhotographerColumns } from "./admin-photograhper-columns";
import AdminSidebar from "./admin-sidebar";
import InfoCard from "./info-card";
import PhotographerFilteringToolbar from "./photographer-filtering-toolbar";

const AdminDashbord = async () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const activeYear =
    currentDate.getMonth() < 10 ? currentYear - 1 : currentYear;

  const [
    photographerCounts,
    imagesThisYear,
    imagesPrevYear,
    albumsThisYear,
    totalImages,
    totalAlbums,
  ] = await Promise.all([
    getCountsPerPhotographer(),
    getImageCountFromYear(activeYear),
    getImageCountFromYear(activeYear - 1),
    getAlbumCountFromYear(activeYear),
    getTotalImageCount(),
    getTotalAlbumCount(),
  ]);

  const numberOfPhotographers = photographerCounts.length;
  const imagesPrevVSThisYear = imagesThisYear - imagesPrevYear;

  return (
    <>
      <div className="flex flex-col gap-4 lg:flex-row">
        <h1 className="text-center text-3xl font-bold lg:hidden">Adminpanel</h1>
        <AdminSidebar isAdmin={true} />
        <div className="space-y-8">
          <h1 className="container hidden text-3xl font-bold lg:block">
            Adminpanel
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
              info={`${imagesPrevVSThisYear.toLocaleString()} mot förra sittande`}
            />
          </section>
          <section className="container space-y-4">
            <h2 className="text-xl font-semibold">Fotografer</h2>
            <DataTable
              toolbar={PhotographerFilteringToolbar}
              columns={adminPhotographerColumns}
              data={photographerCounts.filter(({ images }) => images >= 20)}
              usePagination
            />
          </section>
        </div>
      </div>
    </>
  );
};

export default AdminDashbord;
