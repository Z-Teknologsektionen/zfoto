import {
  getAlbumCountFromYear,
  getCountsPerPhotographer,
  getImageCountFromYear,
  getTotalAlbumCount,
  getTotalImageCount,
} from "~/utils/fetchAdminData";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import InfoCard from "./info-card";
import Sidebar from "./sidebar";

const AdminDashbord = async () => {
  const currentDate = new Date();
  let activeYear = currentDate.getFullYear();
  if (currentDate.getMonth() < 10) {
    activeYear -= 1;
  }

  const photographerCounts = await getCountsPerPhotographer();
  const imagesThisYear = await getImageCountFromYear(activeYear);
  const imagesPrevYear = await getImageCountFromYear(activeYear - 1);
  const albumsThisYear = await getAlbumCountFromYear(activeYear);
  const totalImages = await getTotalImageCount();
  const totalAlbums = await getTotalAlbumCount();
  const numberOfPhotographers = photographerCounts.length;

  const imagesPrevVSThisYear = `${
    imagesThisYear - imagesPrevYear > 0 ? "+" : "-"
  }${Math.abs(imagesThisYear - imagesPrevYear)}`;

  return (
    <>
      <div className="flex flex-col gap-4 lg:flex-row">
        <h1 className="text-center text-3xl font-bold lg:hidden">Adminpanel</h1>
        <Sidebar />
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
              info={`${imagesPrevVSThisYear} mot förra sittande`}
            />
          </section>
          <section className="container">
            <h2 className="text-xl font-semibold">Fotografer</h2>
            <DataTable columns={columns} data={photographerCounts} />
          </section>
        </div>
      </div>
    </>
  );
};

export default AdminDashbord;
