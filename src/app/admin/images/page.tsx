import { DataTable } from "~/components/data-table/data-table";
import { BackButton } from "~/components/layout/back-button";
import { getAllImagesAsAdmin } from "~/utils/fetchAdminData";
import { imageColumns } from "./_components/image-columns";
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
          columns={imageColumns}
          data={data}
          usePagination
        />
      </section>
    </>
  );
};

export default ImagesAdminPage;
