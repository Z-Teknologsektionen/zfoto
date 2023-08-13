import BackButton from "~/components/back-button";
import { getAllImagesAsAdmin } from "~/utils/fetchAdminData";
import { columns } from "./columns";
import { DataTable } from "./data-table";

const ImagesAdminPage = async () => {
  const data = await getAllImagesAsAdmin();
  return (
    <>
      <div className="container">
        <BackButton />
      </div>
      <section className="container space-y-4">
        <h1 className="text-xl font-semibold">Bilder</h1>
        <DataTable columns={columns} data={data} />
      </section>
    </>
  );
};

export default ImagesAdminPage;
