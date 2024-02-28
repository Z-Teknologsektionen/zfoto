import BackButton from "~/components/back-button";
import { DataTable } from "~/components/data-table/data-table";
import { getAllAlbumsAsAdmin } from "~/utils/fetchAdminData";
import AlbumsFilteringToolbar from "./albums-filtering-toolbar";
import { columns } from "./columns";

const AlbumsAdminPage = async () => {
  const data = await getAllAlbumsAsAdmin();
  return (
    <>
      <div className="container">
        <BackButton />
      </div>
      <section className="container space-y-4">
        <h1 className="text-xl font-semibold">Album</h1>
        <DataTable
          toolbar={AlbumsFilteringToolbar}
          columns={columns}
          data={data}
          usePagination
        />
      </section>
    </>
  );
};

export default AlbumsAdminPage;
