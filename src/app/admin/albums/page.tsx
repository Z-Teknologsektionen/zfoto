import BackButton from "~/components/back-button";
import { getAllAlbumsAsAdmin } from "~/utils/fetchAdminData";
import { columns } from "./columns";
import { DataTable } from "./data-table";

const AlbumsAdminPage = async () => {
  const data = await getAllAlbumsAsAdmin();
  return (
    <>
      <div className="container">
        <BackButton />
      </div>
      <section className="container space-y-4">
        <h1 className="text-xl font-semibold">Album</h1>
        <DataTable columns={columns} data={data} />
      </section>
    </>
  );
};

export default AlbumsAdminPage;
