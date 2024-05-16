import { BackButton } from "~/components/back-button";
import { DataTable } from "~/components/data-table/data-table";
import { getAllImagesAsAdmin } from "~/utils/fetchAdminData";
import { columns } from "./_components/columns";
import { ImagesFilteringToolbar } from "./_components/images-filtering-toolbar";

const ImagesAdminPage = async () => {
  const data = await getAllImagesAsAdmin();
  return (
    <>
      <div className="container">
        <BackButton />
      </div>
      <section className="container space-y-4">
        <h1 className="text-xl font-semibold">Bilder</h1>
        <DataTable
          toolbar={ImagesFilteringToolbar}
          columns={columns}
          data={data}
          usePagination
        />
      </section>
    </>
  );
};

export default ImagesAdminPage;
