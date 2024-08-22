import { getAllImagesAsAdmin } from "@/server/data-access/images";
import type { FC } from "react";
import { Fragment } from "react";
import { DataTable } from "~/components/data-table/data-table";
import { BackButton } from "~/components/layout/back-button";
import { imageColumns } from "./_components/image-columns";
import { ImagesFilteringToolbar } from "./_components/images-filtering-toolbar";

const ImagesAdminPage: FC = async () => {
  const data = await getAllImagesAsAdmin();
  return (
    <Fragment>
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
    </Fragment>
  );
};

export default ImagesAdminPage;
